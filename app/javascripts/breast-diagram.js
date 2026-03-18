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
   * @type {BreastFeature[]}
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
    this.values = []

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
    this.$imageMap.addEventListener('click', (event) => this.onClick(event))
    this.$imageMap.addEventListener('hover', (event) => this.debug(event))

    // Render diagram features
    this.read()
    this.render()
    this.debug()
  }

  /**
   * Render diagram features
   */
  render() {
    const { $imageMap, markers, values } = this

    values.forEach(({ id, x, y }, index) => {
      const $path = $imageMap.getPathById(id)
      const point = $imageMap.createPoint(x, y, id)

      // Render active region
      $imageMap.setState('active', $path)

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
  debug(event) {
    const { point, $path } = event?.detail ?? {}

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

    $debugRegion.textContent =
      $path?.querySelector('title')?.textContent ?? 'N/A'

    $debugInput.textContent =
      this.values.map(({ id }) => id).join(', ') || 'N/A'
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
      id: $path.classList.value,
      name: 'Pending',
      x: point.x,
      y: point.y
    })

    this.debug(event)
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
    const { $imageMap, values } = this

    const entry = values.find(({ x, y }) => {
      return x === feature.x && y === feature.y
    })

    if (!entry) {
      return
    }

    const index = values.indexOf(entry)
    const $path = $imageMap.getPathById(entry.id)

    $imageMap.setState('active', $path, false)
    values.splice(index, 1)

    this.render()
    this.write()
    this.debug()
  }

  /**
   * Set marker for image map
   *
   * @param {DOMPoint} point - SVG point at pointer coordinates
   * @param {number} index - Image marker index
   */
  setMarker(point, index) {
    const { $imageMap, $input, markers } = this
    const { width, height } = $imageMap

    if (!markers[index]) {
      markers[index] = new ImageMarker(null, {
        href: $input.readOnly ? undefined : `#marker-${index + 1}`,
        width: width,
        height: height
      })
    }

    const marker = markers[index]

    // Set marker properties
    marker.textContent = `${index + 1}`
    marker.point = point

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
 * @param {unknown | BreastFeature} value
 * @returns {value is BreastFeature}
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
 * Breast feature input value
 *
 * @typedef {object} BreastFeature
 * @property {string} id - Image map region ID
 * @property {string} name - Breast feature name
 * @property {number} x - X coordinate of breast feature
 * @property {number} y - Y coordinate of breast feature
 */

/**
 * @import { ImageMapPayload, ImageMapListener } from './image-map.js'
 */
