// Core dependencies
const { createHash } = require('node:crypto')
const { resolve } = require('node:path')

const { get: getKeypath } = require('lodash')

const customFilters = require('../app/filters')

const coreFilters = require('./core_filters')
const { findAvailablePort } = require('./utils/find-available-port')

/**
 * Merge the core and custom filters into one object
 * and then add the methods to Nunjucks environment
 *
 * @param {Environment} env
 */
function addNunjucksFilters(env) {
  const filters = {
    ...coreFilters(env),
    ...customFilters(env)
  }

  for (const [name, filter] of Object.entries(filters)) {
    env.addFilter(name, filter)
  }
}

/**
 * Add Nunjucks function called 'checked' to populate radios and checkboxes
 * This function is less useful since NHS Frontend 9.2.0 added an
 * easier way to set checkbox and radio checked items, and may
 * be removed in future.
 *
 * @param {Environment} env
 */
function addCheckedFunction(env) {
  env.addGlobal('checked', function (name, value) {
    // Check data exists
    if (this.ctx.data === undefined) {
      return ''
    }

    // Use string keys or object notation to support:
    // checked("field-name")
    // checked("['field-name']")
    // checked("['parent']['field-name']")
    const matchedName = !name.match(/[.[]/g) ? `['${name}']` : name
    const storedValue = getKeypath(this.ctx.data, matchedName)

    // Check the requested data exists
    if (storedValue === undefined) {
      return ''
    }

    let checked = ''

    // If data is an array, check it exists in the array
    if (Array.isArray(storedValue)) {
      if (storedValue.indexOf(value) !== -1) {
        checked = 'checked'
      }
    } else if (storedValue === value) {
      // The data is just a simple value, check it matches
      checked = 'checked'
    }
    return checked
  })
}

/*
// Synchronously get the URL for the latest release on GitHub and cache it
function getLatestRelease () {
  if (releaseUrl !== null) {
    // Release URL already exists
    console.log('Release url cached:', releaseUrl)
    return releaseUrl
  } else {
    // Release URL doesn't exist
    try {
      console.log('Getting latest release from GitHub')

      var res = request(
        'GET',
        'https://api.github.com/repos/alphagov/govuk-prototype-kit/releases/latest',
        {
          headers: { 'user-agent': 'node.js' }
        }
      )
      var data = JSON.parse(res.getBody('utf8'))

      // Cache releaseUrl before we return it
      releaseUrl = `https://github.com/alphagov/govuk-prototype-kit/archive/${data['name']}.zip`

      console.log('Release URL is', releaseUrl)
      return releaseUrl
    } catch (err) {
      console.log("Couldn't retrieve release URL")
      return 'https://github.com/alphagov/govuk-prototype-kit/releases/latest'
    }
  }
}
*/

/**
 * Try to match a request to a template, for example a request for /test
 * would look for /app/views/test.html
 * and /app/views/test/index.html
 *
 * @param {string} routePath
 * @param {Response} res
 * @param {NextFunction} next
 */
function renderPath(routePath, res, next) {
  // Try to render the path
  res.render(routePath, (error, html) => {
    if (!error) {
      // Success - send the response
      res.set({ 'Content-type': 'text/html; charset=utf-8' })
      res.end(html)
      return
    }
    if (!error.message.startsWith('template not found')) {
      // We got an error other than template not found - call next with the error
      next(error)
      return
    }
    if (!routePath.endsWith('/index')) {
      // Maybe it's a folder - try to render [path]/index.html
      renderPath(`${routePath}/index`, res, next)
      return
    }
    // We got template not found both times - call next to trigger the 404 page
    next()
  })
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function matchRoutes(req, res, next) {
  let routePath = req.path

  // Remove the first slash, render won't work with it
  routePath = routePath.substr(1)

  // If it's blank, render the root index
  if (routePath === '') {
    routePath = 'index'
  }

  renderPath(routePath, res, next)
}

/**
 * Store data from POST body or GET query in session
 *
 * @param {{ [key: string]: unknown }} input
 * @param {unknown} data
 */
function storeData(input, data) {
  for (const i in input) {
    // any input where the name starts with _ is ignored
    if (i.indexOf('_') === 0) {
      continue
    }

    let val = input[i]

    // Delete values when users unselect checkboxes
    if (val === '_unchecked') {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete data[i]
      continue
    }

    // Remove _unchecked from arrays of checkboxes
    if (Array.isArray(val)) {
      val = val.filter((item) => item !== '_unchecked')
    } else if (typeof val === 'object') {
      // Store nested objects that aren't arrays
      if (typeof data[i] !== 'object') {
        data[i] = {}
      }

      // Add nested values
      storeData(val, data[i])
      continue
    }

    data[i] = val
  }
}

// Get session default data from file
let sessionDataDefaults = {}

const sessionDataDefaultsFile = resolve(
  __dirname,
  '../app/data/session-data-defaults.js'
)

try {
  sessionDataDefaults = require(sessionDataDefaultsFile)
} catch (error) {
  console.error(
    'Could not load the session data defaults from app/data/session-data-defaults.js. Might be a syntax error?'
  )
  console.error(error)
}

/**
 * Middleware - store any data sent in session, and pass it to all views
 *
 * @param {Request['body']} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function autoStoreData(req, res, next) {
  if (!req.session.data) {
    req.session.data = {}
  }

  req.session.data = Object.assign({}, sessionDataDefaults, req.session.data)

  storeData(req.body, req.session.data)
  storeData(req.query, req.session.data)

  // Send session data to all views

  res.locals.data = {}

  for (const j in req.session.data) {
    res.locals.data[j] = req.session.data[j]
  }

  next()
}

/**
 * Set any useful local variables
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function setLocals(req, res, next) {
  // Current page used for the Reset data feature
  res.locals.currentPage = req.originalUrl

  next()
}

/*
function handleCookies (app) {
  return function handleCookies (req, res, next) {
    const COOKIE_NAME = 'seen_cookie_message'
    let cookie = req.cookies[COOKIE_NAME]

    if (cookie === 'yes') {
      app.locals.shouldShowCookieMessage = false
      return next()
    }

    let maxAgeInDays = 28
    res.cookie(COOKIE_NAME, 'yes', {
      maxAge: maxAgeInDays * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    app.locals.shouldShowCookieMessage = true

    next()
  }
}
*/

/**
 * @param {string} password
 */
function encryptPassword(password) {
  if (!password) {
    return undefined
  }
  const hash = createHash('sha256')
  hash.update(password)
  return hash.digest('hex')
}

module.exports = {
  addCheckedFunction,
  addNunjucksFilters,
  autoStoreData,
  encryptPassword,
  findAvailablePort,
  matchRoutes,
  setLocals,
  storeData
}

/**
 * @import { NextFunction, Request, Response } from 'express'
 * @import { Environment } from 'nunjucks'
 */
