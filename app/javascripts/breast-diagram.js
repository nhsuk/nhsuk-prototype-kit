import {
  createAll,
  isObject,
  Component,
  ElementError
} from '/nhsuk-frontend/nhsuk-frontend.min.js'
import { ImageMap } from './image-map.js'
import { ImageMarker } from './image-marker.js'

/**
 * Breast diagram component
 *
 * @augments {Component<HTMLFormElement>}
 */
export class BreastDiagram extends Component {
  static elementType = HTMLFormElement

  /**
   * @type {HTMLInputElement}
   */
  $input

  /**
   * @type {ImageMarker[]}
   */
  markers

  /**
   * @type {BreastFeatureValue[]}
   */
  values

  /**
   * @param {Element | null} $root - HTML element to use for component
   */
  constructor($root) {
    super($root)

    const $input = this.$root.querySelector('input[name="features"]')
    if (!($input instanceof HTMLInputElement)) {
      throw new ElementError({
        component: BreastDiagram,
        element: $input,
        expectedType: 'HTMLInputElement',
        identifier: 'Breast diagram feature values (`input[name="features"]`)'
      })
    }

    this.$input = $input
    this.markers = []

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.values = /** @type {BreastFeatureValue[]} */ (
        JSON.parse(decodeURIComponent(this.$input.value), getArrayValue) ?? []
      )
    } catch {
      throw new ElementError({
        component: BreastDiagram,
        identifier: 'Breast diagram feature JSON (`input[name="features"]`)'
      })
    }

    const $imageMaps = createAll(
      ImageMap,
      {
        imageClass: 'app-breast-diagram__svg',
        readOnly: $input.readOnly,
        selectors: [
          '.app-breast-diagram__regions path',
          '.app-breast-diagram__regions polygon'
        ]
      },
      { scope: this.$root }
    )

    if (!$imageMaps.length || !($imageMaps[0].$root instanceof HTMLElement)) {
      throw new ElementError({
        component: BreastDiagram,
        identifier: `Image map (\`[data-module="${ImageMap.moduleName}"]\`)`
      })
    }

    this.$imageMap = $imageMaps[0]
    this.$imageMap.onUpdate = this.onUpdate.bind(this)

    // Render diagram features
    this.render()
    this.debug()
  }

  /**
   * Get diagram features
   *
   * @returns {BreastFeature[]}
   */
  get features() {
    return this.values.map(({ id, name, x, y }, index) => {
      const $path = this.$imageMap.getPathById(id)
      const point = this.$imageMap.createPoint(x, y, id)
      const region = this.$imageMap.createRegion($path, point)

      this.setMarker(region, index)

      return { name, region }
    })
  }

  /**
   * Render diagram features
   */
  render() {
    const { $imageMap, features, markers } = this

    // Remove excess markers
    for (const marker of markers.splice(features.length)) {
      marker.$root.remove()
    }

    // Set active regions
    for (const feature of features) {
      $imageMap.setState(feature.region, 'active')
    }
  }

  /**
   * Write diagram features to hidden input
   */
  write() {
    this.$input.value = JSON.stringify(this.values)
  }

  /**
   * Update status messages
   *
   * @param {Partial<ImageMapRegion>} [region] - Image map region
   */
  debug({ point, label } = {}) {
    /** @type {Element | null} */
    this.$debugX = this.$debugX ?? this.$root.querySelector('.app-js-image-x')

    /** @type {Element | null} */
    this.$debugY = this.$debugY ?? this.$root.querySelector('.app-js-image-y')

    /** @type {Element | null} */
    this.$debugRegion =
      this.$debugRegion ?? this.$root.querySelector('.app-js-image-region')

    /** @type {Element | null} */
    this.$debugInput =
      this.$debugInput ?? this.$root.querySelector('.app-js-image-input')

    const { $debugX, $debugY, $debugRegion, $debugInput } = this
    if (!$debugX || !$debugY || !$debugRegion || !$debugInput) {
      return
    }

    $debugX.textContent = point?.x.toString() ?? 'N/A'
    $debugY.textContent = point?.y.toString() ?? 'N/A'
    $debugRegion.textContent = label ?? 'N/A'
    $debugInput.textContent =
      this.values.map(({ id }) => id).join(', ') || 'N/A'
  }

  /**
   * Update region state and write to form input
   *
   * @type {ImageMapStateCallback}
   */
  onUpdate(region, state) {
    const { values } = this

    this.debug(region)

    if (!region) {
      return
    }

    if (state === 'active') {
      const entry = values.find(
        (value) =>
          value.id === region.id &&
          value.x === region.point.x &&
          value.y === region.point.y
      )

      if (!entry) {
        values.push({
          id: region.id,
          name: 'Pending',
          x: region.point.x,
          y: region.point.y
        })

        this.setMarker(region, values.length - 1)
        this.write()
        this.debug(region)
      }
    }
  }

  /**
   * Set marker for image map region
   *
   * @param {ImageMapRegion} region - Image map region
   * @param {number} index - Image marker index
   */
  setMarker(region, index) {
    const { $imageMap, $input, markers } = this
    const { width, height } = $imageMap

    if (!markers[index]) {
      markers[index] = new ImageMarker(null, {
        href: $input.readOnly ? undefined : `#${region.id}`,
        width: width,
        height: height
      })
    }

    const marker = markers[index]

    // Set marker properties
    marker.textContent = `${index + 1}`
    marker.point = region.point

    // Append new markers only
    if (!marker.$root.parentElement) {
      $imageMap.$root.appendChild(marker.$root)
    }

    return marker
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-breast-diagram'
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
 * @param {unknown | BreastFeatureValue} value
 * @returns {value is BreastFeatureValue}
 */
function isValidObject(value) {
  if (!isObject(value)) {
    return false
  }

  return (
    Object.keys(value).every((key) => ['id', 'name', 'x', 'y'].includes(key)) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
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
 * Breast feature with image map region
 *
 * @typedef {object} BreastFeature
 * @property {string} name - Breast feature name
 * @property {ImageMapRegion} region - Image map region
 */

/**
 * Breast feature input value
 *
 * @typedef {object} BreastFeatureValue
 * @property {string} id - Image map region ID
 * @property {string} name - Breast feature name
 * @property {number} x - X coordinate of breast feature
 * @property {number} y - Y coordinate of breast feature
 */

/**
 * @import { ImageMapRegion, ImageMapStateCallback } from './image-map.js'
 */
