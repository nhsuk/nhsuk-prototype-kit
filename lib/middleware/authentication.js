const { format: urlFormat } = require('node:url')

const { encryptPassword } = require('../utils')

const allowedPathsWhenUnauthenticated = [
  '/prototype-admin/password',
  '/css/main.css',
  '/css/main.css.map',
  '/nhsuk-frontend/nhsuk-frontend.min.js',
  '/nhsuk-frontend/nhsuk-frontend.min.js.map',
  '/js/auto-store-data.js',
  '/js/auto-store-data.js.map',
  '/js/main.js',
  '/js/main.js.map'
]

const encryptedPassword = encryptPassword(process.env.PROTOTYPE_PASSWORD)

/**
 * Redirect the user to the password page, with
 * the current page path set as the returnURL in a query
 * string so the user can be redirected back after successfully
 * entering a password
 *
 * @param {Request} req
 * @param {Response} res
 */
function sendUserToPasswordPage(req, res) {
  const returnURL = urlFormat({
    pathname: req.path,
    query: req.query
  })
  const passwordPageURL = urlFormat({
    pathname: '/prototype-admin/password',
    query: { returnURL }
  })
  res.redirect(passwordPageURL)
}

/**
 * Give the user some instructions on how to set a password
 *
 * @param {Response} res
 */
function showNoPasswordError(res) {
  return res.send(
    '<h1>Error:</h1><p>Password not set. <a href="https://prototype-kit.service-manual.nhs.uk/how-tos/publish-your-prototype-online">See guidance for setting a password</a>.</p>'
  )
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function authentication(req, res, next) {
  if (!process.env.PROTOTYPE_PASSWORD) {
    showNoPasswordError(res)
  } else if (
    req.path.startsWith('/nhsuk-frontend/assets/') ||
    allowedPathsWhenUnauthenticated.includes(req.path)
  ) {
    next()
  } else if (req.cookies.authentication === encryptedPassword) {
    next()
  } else {
    sendUserToPasswordPage(req, res)
  }
}

module.exports = authentication

/**
 * @import { NextFunction, Request, Response } from 'express'
 */
