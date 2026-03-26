import { ImageMap } from '../image-map/image-map.js'
import { ImageMarker } from '../image-marker/image-marker.js'
import {
  ConfigurableComponent,
  ElementError,
  createAll,
  isObject
} from '/nhsuk-frontend/nhsuk-frontend.min.js'

/**
 * Breast diagram component
 *
 * @augments {ConfigurableComponent<BreastDiagramConfig>}
 */
export class BreastDiagram extends ConfigurableComponent {
  /**
   * @type {HTMLFormElement}
   */
  $form

  /**
   * @type {HTMLInputElement}
   */
  $input

  /**
   * @type {HTMLTemplateElement}
   */
  $imageMarker

  /**
   * @type {ImageMarker[]}
   */
  markers

  /**
   * @type {BreastFeature[]}
   */
  values

  /**
   * @param {Element | null} $root - HTML element to use for component
   * @param {Partial<BreastDiagramConfig>} [config] - Breast diagram config
   */
  constructor($root, config = {}) {
    super($root, config)

    const { readOnly } = this.config

    const $form = this.$root.closest('form')
    if (!($form instanceof HTMLFormElement)) {
      throw new ElementError({
        component: BreastDiagram,
        element: $form,
        expectedType: 'HTMLFormElement',
        identifier: 'Breast diagram form (`<form>`)'
      })
    }

    const $input = $form.querySelector('input[name="features"]')
    if (!($input instanceof HTMLInputElement)) {
      throw new ElementError({
        component: BreastDiagram,
        element: $input,
        expectedType: 'HTMLInputElement',
        identifier: 'Breast diagram feature values (`input[name="features"]`)'
      })
    }

    const $imageMarker = this.$root.querySelector(
      'template.app-js-template-image-marker'
    )

    if (!($imageMarker instanceof HTMLTemplateElement)) {
      throw new ElementError({
        component: BreastDiagram,
        identifier: 'Breast diagram template (`<template>`)'
      })
    }

    this.$form = $form
    this.$input = $input
    this.$imageMarker = $imageMarker
    this.markers = []
    this.values = []

    const imageMaps = createAll(
      ImageMap,
      {
        imageClass: 'app-breast-diagram__svg',
        selectors: [
          '.app-breast-diagram__regions path',
          '.app-breast-diagram__regions polygon'
        ]
      },
      { scope: this.$root }
    )

    if (!imageMaps.length || !(imageMaps[0].$root instanceof HTMLElement)) {
      throw new ElementError({
        component: BreastDiagram,
        identifier: `Image map (\`[data-module="${ImageMap.moduleName}"]\`)`
      })
    }

    this.imageMap = imageMaps[0]

    if (!readOnly) {
      this.imageMap.addEventListener('click', (event) => this.onClick(event))
      this.imageMap.addEventListener('hover', (event) => this.log(event))
      window.addEventListener('hashchange', () => this.onHashChange(), true)
    }

    // Render diagram features
    this.read()
    this.render()
    this.log()
  }

  /**
   * Render diagram features
   */
  render() {
    const { imageMap, markers, values } = this

    if (!values.length) {
      imageMap.unsetState('active')
    }

    values.forEach(({ region_id, x, y }, index) => {
      const $path = imageMap.getPathById(region_id)
      const point = imageMap.createPoint(x, y, region_id)

      // Render active region
      imageMap.setState('active', $path)

      // Set marker position
      this.setMarker(point, index)
    })

    // Remove excess markers
    for (const marker of markers.splice(values.length)) {
      marker.$root.remove()
    }
  }

  /**
   * Read diagram values from hidden input
   */
  read() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.values = /** @type {BreastFeature[]} */ (
        JSON.parse(decodeURIComponent(this.$input.value), getArrayValue) ?? []
      )
    } catch {
      throw new ElementError({
        component: BreastDiagram,
        identifier: 'Breast diagram feature JSON (`input[name="features"]`)'
      })
    }
  }

  /**
   * Write diagram values to hidden input
   */
  write() {
    this.$input.value = JSON.stringify(this.values)
  }

  /**
   * Update status messages
   *
   * @param {CustomEvent<ImageMapPayload>} [event] - Image map event
   */
  log(event) {
    const { debug } = this.config
    const { point, $path } = event?.detail ?? {}

    if (!debug) {
      return
    }

    /** @type {Element | null} */
    this.$debugX = this.$debugX ?? this.$root.querySelector('.app-js-image-x')

    /** @type {Element | null} */
    this.$debugY = this.$debugY ?? this.$root.querySelector('.app-js-image-y')

    /** @type {Element | null} */
    this.$debugRegion =
      this.$debugRegion ?? this.$root.querySelector('.app-js-image-region')

    /** @type {Element | null} */
    this.$debugInput =
      this.$debugInput ?? this.$root.querySelector('.app-js-image-input code')

    const { $debugX, $debugY, $debugRegion, $debugInput } = this
    if (!$debugInput) {
      return
    }

    $debugInput.innerHTML = JSON.stringify(this.values, undefined, 2)

    if (!$debugX || !$debugY || !$debugRegion) {
      return
    }

    $debugX.innerHTML = point ? `<samp>${point.x}</samp>` : 'N/A'
    $debugY.innerHTML = point ? `<samp>${point.y}</samp>` : 'N/A'

    $debugRegion.innerHTML = $path
      ? `<samp>${$path.classList.value}</samp>`
      : 'N/A'
  }

  /**
   * Handle image map hash change
   */
  onHashChange() {
    const { markers } = this
    const { hash } = window.location

    // Click associated marker
    markers
      .find(({ $root }) => $root.getAttribute('href') === hash)
      ?.$root.click()
  }

  /**
   * Handle image map click
   *
   * @type {ImageMapListener}
   */
  onClick(event) {
    const { $path, point } = event.detail
    if (!$path || !point) {
      return
    }

    this.add({
      id: 'pending',
      region_id: $path.classList.value,
      x: point.x,
      y: point.y
    })

    this.log(event)
  }

  /**
   * Add breast feature
   *
   * @param {BreastFeature} feature
   */
  add(feature) {
    this.values.push(feature)
    this.render()
    this.write()
  }

  /**
   * Remove breast feature
   *
   * @param {Pick<BreastFeature, 'x' | 'y'>} feature
   */
  remove(feature) {
    const { imageMap, values } = this

    const entry = values.find(({ x, y }) => {
      return x === feature.x && y === feature.y
    })

    if (!entry) {
      return
    }

    const index = values.indexOf(entry)
    const $path = imageMap.getPathById(entry.region_id)

    imageMap.unsetState('active', $path)
    values.splice(index, 1)

    this.render()
    this.write()
    this.log()
  }

  /**
   * Set marker for image map
   *
   * @param {DOMPoint} point - SVG point at pointer coordinates
   * @param {number} index - Image marker index
   */
  setMarker(point, index) {
    const { $imageMarker, imageMap, config, markers } = this
    const { width, height } = imageMap

    if (!markers[index]) {
      const { firstElementChild: $root } = document.importNode(
        $imageMarker.content,
        true
      )

      markers[index] = new ImageMarker($root, {
        href: config.readOnly ? undefined : `#marker-${index + 1}`,
        width: width,
        height: height
      })
    }

    const marker = markers[index]

    // Set marker properties
    marker.textContent = `${index + 1}`
    marker.point = point

    // Temporarily remove marker on click
    marker.$root.onclick = () =>
      this.remove({
        x: point.x,
        y: point.y
      })

    // Append new markers only
    if (!marker.$root.parentElement) {
      imageMap.$root.appendChild(marker.$root)
    }

    return marker
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-breast-diagram'

  /**
   * Breast diagram default config
   *
   * @see {@link BreastDiagramConfig}
   * @constant
   * @type {BreastDiagramConfig}
   */
  static defaults = Object.freeze({
    debug: false,
    readOnly: false
  })

  /**
   * Breast diagram config schema
   *
   * @constant
   * @satisfies {Schema<BreastDiagramConfig>}
   */
  static schema = Object.freeze({
    properties: {
      debug: { type: 'boolean' },
      readOnly: { type: 'boolean' }
    }
  })
}

/**
 * Accept valid array values only
 *
 * Used as reviver function in `JSON.parse()`
 *
 * @this {unknown}
 * @param {string} key
 * @param {unknown} value
 */
function getArrayValue(key, value) {
  return isValid(value) ||
    isValidObject(value) ||
    (key === '' && Array.isArray(value))
    ? value
    : undefined
}

/**
 * Whether feature object is valid
 *
 * @param {unknown | BreastFeature} value
 * @returns {value is BreastFeature}
 */
function isValidObject(value) {
  if (!isObject(value)) {
    return false
  }

  const keys = new Set(['id', 'region_id', 'x', 'y'])

  return (
    Object.keys(value).every((key) => keys.has(key)) &&
    typeof value.id === 'string' &&
    typeof value.region_id === 'string' &&
    typeof value.x === 'number' &&
    typeof value.y === 'number'
  )
}

/**
 * Whether feature nested value is valid
 *
 * @param {unknown} value
 */
function isValid(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Breast diagram config
 *
 * @see {@link BreastDiagram.defaults}
 * @typedef {object} BreastDiagramConfig
 * @property {boolean} debug - Whether to show debug information
 * @property {boolean} readOnly - Whether image map is read only
 */

/**
 * Breast feature input value
 *
 * @typedef {object} BreastFeature
 * @property {string} id - Breast feature ID
 * @property {string} region_id - Image map region ID
 * @property {number} x - X coordinate of breast feature
 * @property {number} y - Y coordinate of breast feature
 */

/**
 * @import { Schema } from 'nhsuk-frontend/dist/nhsuk/common/configuration/index.mjs'
 * @import { ImageMapPayload, ImageMapListener } from '../image-map/image-map.js'
 */
