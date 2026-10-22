import {
  ConfigurableComponent,
  ElementError
} from '/nhsuk-frontend/nhsuk-frontend.min.js'

/**
 * Image map component
 *
 * @augments {ConfigurableComponent<ImageMapConfig>}
 */
export class ImageMap extends ConfigurableComponent {
  /**
   * @param {Element | null} $root - HTML element to use for component
   * @param {Partial<Pick<ImageMapConfig, 'imageClass' | 'selectors'>>} [config] - Image map config
   */
  constructor($root, config = {}) {
    super($root, config)

    const { imageClass, selectorsQuery, selectorsFormatted } = this.config

    const $image = this.$root.querySelector(`.${imageClass}`)
    if (!$image || !($image instanceof SVGSVGElement)) {
      throw new ElementError({
        component: ImageMap,
        identifier: `Image (\`<svg class="${imageClass}">\`)`
      })
    }

    const $paths = /** @type {NodeListOf<SVGGeometryElement>} */ (
      $image.querySelectorAll(selectorsQuery)
    )

    if (!$paths.length) {
      throw new ElementError({
        component: ImageMap,
        identifier: `Image paths and polygons (${selectorsFormatted})`
      })
    }

    // Reverse paths to pick frontmost path first
    this.$paths = Array.from($paths).reverse()
    this.$image = $image

    this.$image.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.$image.addEventListener('click', this.onClick.bind(this))
  }

  /**
   * Image map config override
   *
   * @param {Partial<ImageMapConfig>} datasetConfig - Config specified by dataset
   * @returns {Partial<ImageMapConfig>} Config to override by dataset
   */
  configOverride(datasetConfig) {
    const { selectors = this.config.selectors } = datasetConfig

    return {
      selectorsQuery: selectors.join(', '),
      selectorsFormatted: selectors
        .map((selector) => `\`${selector}\``)
        .join(', ')
    }
  }

  get width() {
    return this.$image.viewBox.baseVal.width
  }

  get height() {
    return this.$image.viewBox.baseVal.height
  }

  /**
   * Set image map state
   *
   * @param {ImageMapState} state - State updated, e.g. 'active'
   * @param {SVGGeometryElement} [$activePath] - SVG path to set state for
   * @param {boolean} [value] - Set state value
   */
  setState(state, $activePath, value = true) {
    if (value) {
      $activePath?.setAttribute(`data-${state}`, 'true')
    } else {
      $activePath?.removeAttribute(`data-${state}`)
    }
  }

  /**
   * Get SVG path at pointer coordinates
   *
   * @param {DOMPoint} [point] - SVG point at pointer coordinates
   * @returns {SVGGeometryElement | undefined}
   */
  getPath(point) {
    if (!point) {
      return
    }

    return this.$paths.find(($path) => $path.isPointInFill(point))
  }

  /**
   * Get SVG path by ID
   *
   * @param {string} id - SVG path ID specified in path class attribute
   */
  getPathById(id) {
    const $path = this.$paths.find(($path) => $path.classList.value === id)

    if (!$path) {
      throw new ElementError({
        component: ImageMap,
        identifier: `Image path or polygon (\`class="${id}"\`)`
      })
    }

    return $path
  }

  /**
   * Get SVG point at pointer coordinates
   *
   * @param {number} clientX - Pointer X coordinate in screen pixels
   * @param {number} clientY - Pointer Y coordinate in screen pixels
   * @returns {DOMPoint}
   */
  getPoint(clientX, clientY) {
    const matrix = this.$image.getScreenCTM()
    const point = this.$image.createSVGPoint()

    if (!matrix) {
      return point
    }

    point.x = clientX
    point.y = clientY

    // Transform from screen space to SVG space
    return point.matrixTransform(matrix.inverse())
  }

  /**
   * Create SVG point from existing coordinates
   *
   * @param {number} pointX - SVG point X coordinate
   * @param {number} pointY - SVG point Y coordinate
   * @param {string} id - SVG path ID specified in path class attribute
   * @returns {DOMPoint}
   */
  createPoint(pointX, pointY, id) {
    const point = this.$image.createSVGPoint()

    point.x = pointX
    point.y = pointY

    const $path = this.getPath(point)

    if (!$path || $path !== this.getPathById(id)) {
      throw new ElementError({
        component: ImageMap,
        identifier: `Image path or polygon (\`class="${id}"\`) with SVG point (${pointX}, ${pointY})`
      })
    }

    return point
  }

  /**
   * Add event listener for image map
   *
   * @param {ImageMapEvent} name - Event name, e.g. 'hover', 'click'
   * @param {ImageMapListener} listener - Image map listener
   */
  addEventListener(name, listener) {
    this.$root.addEventListener(
      `${ImageMap.moduleName}:${name}`,
      /** @type {EventListener} */ (listener)
    )
  }

  /**
   * Dispatch event for image map
   *
   * @param {ImageMapEvent} name - Event name, e.g. 'hover', 'click'
   * @param {ImageMapPayload} detail - Image map payload
   */
  dispatchEvent(name, detail) {
    this.$root.dispatchEvent(
      new CustomEvent(`${ImageMap.moduleName}:${name}`, { detail })
    )
  }

  /**
   * @param {MouseEvent} event
   */
  onMouseMove(event) {
    const { clientX, clientY } = event

    const point = this.getPoint(clientX, clientY)
    const $path = this.getPath(point)

    this.dispatchEvent('hover', { $path, point })
  }

  /**
   * @param {MouseEvent} event
   */
  onClick(event) {
    event.preventDefault()

    const { clientX, clientY } = event

    const point = this.getPoint(clientX, clientY)
    const $path = this.getPath(point)

    this.dispatchEvent('click', { $path, point })
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-image-map'

  /**
   * Image map default config
   *
   * @see {@link ImageMapConfig}
   * @constant
   * @type {ImageMapConfig}
   */
  static defaults = Object.freeze({
    imageClass: 'nhsuk-image__img',
    selectors: ['path', 'polygon'],
    selectorsQuery: '',
    selectorsFormatted: ''
  })

  /**
   * Image map config schema
   *
   * @constant
   * @satisfies {Schema<ImageMapConfig>}
   */
  static schema = Object.freeze({
    properties: {
      imageClass: { type: 'string' },
      selectors: { type: 'array' },
      selectorsQuery: { type: 'string' },
      selectorsFormatted: { type: 'string' }
    }
  })
}

/**
 * Image map config
 *
 * @see {@link ImageMap.defaults}
 * @typedef {object} ImageMapConfig
 * @property {string} imageClass - Image class
 * @property {string[]} selectors - Image map region selectors
 * @property {string} selectorsQuery - Image map region selectors (for DOM query selector)
 * @property {string} selectorsFormatted - Image map region selectors (formatted for error messages)
 */

/**
 * @typedef {'active'} ImageMapState - Image map state
 * @typedef {'hover' | 'click'} ImageMapEvent - Image map event
 */

/**
 * Image map state payload
 *
 * @typedef ImageMapPayload
 * @property {SVGGeometryElement | undefined} $path - SVG path at pointer coordinates
 * @property {DOMPoint} [point] - SVG point at pointer coordinates (optional)
 * @returns {void}
 */

/**
 * Image map listener
 *
 * @callback ImageMapListener
 * @param {CustomEvent<ImageMapPayload>} event - Image map event
 * @returns {void}
 */

/**
 * @import { Schema } from 'nhsuk-frontend/dist/nhsuk/common/configuration/index.mjs'
 */
