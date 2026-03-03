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
   * @type {typeof this.onUpdate | null}
   */
  onUpdateHandler = null

  /**
   * @param {Element | null} $root - HTML element to use for component
   * @param {Partial<Pick<ImageMapConfig, 'imageClass' | 'readOnly' | 'selectors'>>} [config] - Image map config
   */
  constructor($root, config = {}) {
    super($root, config)

    const { imageClass, readOnly, selectorsQuery, selectorsFormatted } =
      this.config

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

    if (!readOnly) {
      this.$image.addEventListener('mousemove', this.onMouseMove.bind(this))
      this.$image.addEventListener('mouseleave', this.onMouseLeave.bind(this))
      this.$image.addEventListener('click', this.onClick.bind(this))
    }
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

  get onUpdate() {
    return this.onUpdateHandler ?? (() => undefined)
  }

  /**
   * @param {ImageMapStateCallback} callback
   */
  set onUpdate(callback) {
    this.onUpdateHandler = callback
  }

  /**
   * Set state to active path only
   *
   * - If state is 'active', multiple paths can be active
   * - If state is 'highlight', only one path can be active
   *
   * @param {ImageMapState} state - State to set, e.g. 'highlight'
   * @param {ImageMapRegion | undefined} [region] - Image map region
   * @param {ImageMapStateCallback | null} [callback] - Set state callback
   */
  setState(state, region, callback = this.onUpdate) {
    for (const $path of this.$paths) {
      if ($path === region?.$path) {
        $path.setAttribute(`data-${state}`, 'true')
      } else if (state === 'highlight') {
        $path.removeAttribute(`data-${state}`)
      }
    }

    callback?.(state, region)
  }

  /**
   * Get image map region at SVG point
   *
   * @overload
   * @param {SVGGeometryElement} $path - SVG path at pointer coordinates
   * @param {DOMPoint} point - SVG point at pointer coordinates
   * @returns {ImageMapRegion}
   */

  /**
   * @overload
   * @param {SVGGeometryElement | undefined} $path - SVG path at pointer coordinates
   * @param {DOMPoint} point - SVG point at pointer coordinates
   * @returns {ImageMapRegion | undefined}
   */

  /**
   * @param {SVGGeometryElement | undefined} $path - SVG path at pointer coordinates
   * @param {DOMPoint} point - SVG point at pointer coordinates
   */
  createRegion($path, point) {
    if (!$path) {
      return
    }

    const id = $path.classList.value
    const label = $path.querySelector('title')?.textContent

    if (!id || !label) {
      throw new ElementError({
        component: ImageMap,
        identifier: id
          ? 'Image path or polygon (`<title>`)'
          : 'Image path or polygon attribute (`class`)'
      })
    }

    return {
      id,
      label,
      point,
      $path
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
        identifier: `Image path or polygon by ID (\`${id}\`) with SVG point (${pointX}, ${pointY})`
      })
    }

    return point
  }

  /**
   * @param {MouseEvent} event
   */
  onMouseMove(event) {
    const { clientX, clientY } = event

    const point = this.getPoint(clientX, clientY)
    const $path = this.getPath(point)
    const region = this.createRegion($path, point)

    this.setState('highlight', region)
  }

  onMouseLeave() {
    this.setState('highlight')
  }

  /**
   * @param {MouseEvent} event
   */
  onClick(event) {
    event.preventDefault()

    const { clientX, clientY } = event

    const point = this.getPoint(clientX, clientY)
    const $path = this.getPath(point)
    const region = this.createRegion($path, point)

    this.setState('active', region)
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
    readOnly: false,
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
      readOnly: { type: 'boolean' },
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
 * @property {boolean} readOnly - Whether image map is read only
 * @property {string[]} selectors - Image map region selectors
 * @property {string} selectorsQuery - Image map region selectors (for DOM query selector)
 * @property {string} selectorsFormatted - Image map region selectors (formatted for error messages)
 */

/**
 * Image map region
 *
 * @typedef {object} ImageMapRegion
 * @property {string} id - Image map region ID
 * @property {string} label - Region map region label
 * @property {DOMPoint} point - SVG point at pointer coordinates
 * @property {SVGGeometryElement} $path - SVG path at pointer coordinates
 */

/**
 * Image map state
 *
 * @typedef {'highlight' | 'active'} ImageMapState
 */

/**
 * Image map state callback
 *
 * @callback ImageMapStateCallback
 * @param {ImageMapState} state - State to set, e.g. 'highlight'
 * @param {ImageMapRegion} [region] - Image map region
 * @returns {void}
 */

/**
 * @import { Schema } from 'nhsuk-frontend/dist/nhsuk/common/configuration/index.mjs'
 */
