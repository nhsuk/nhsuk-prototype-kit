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
   * @param {Partial<ImageMapConfig>} [config] - Image map config
   */
  constructor($root, config = {}) {
    super($root, config)

    const { selectors } = this.config

    const selectorsQuery = selectors.join(', ')
    const selectorsFormatted = selectors
      .map((selector) => `\`${selector}\``)
      .join(', ')

    const $image = this.$root.querySelector('.nhsuk-image__img')
    if (!$image || !($image instanceof SVGSVGElement)) {
      throw new ElementError({
        component: ImageMap,
        identifier: 'Image (`<svg class="nhsuk-image__img">`)'
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

    this.$image.addEventListener('pointermove', this.onPointerMove.bind(this))
    this.$image.addEventListener('pointerout', this.onPointerOut.bind(this))
    this.$image.addEventListener('click', this.onClick.bind(this))
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
   */
  setState(state = 'highlight', region) {
    for (const $path of this.$paths) {
      if ($path === region?.$path) {
        $path.setAttribute(`data-${state}`, 'true')
      } else if (state === 'highlight') {
        $path.removeAttribute(`data-${state}`)
      }
    }

    this.onUpdate(state, region)
  }

  /**
   * Get image map region at SVG point
   *
   * @param {SVGGeometryElement} [$path] - SVG path at pointer coordinates
   * @param {DOMPoint} [point] - SVG point at pointer coordinates
   * @returns {ImageMapRegion | undefined}
   */
  getRegion($path, point) {
    const id = $path?.classList.value
    const label = $path?.getAttribute('aria-label')

    if (!$path || !id || !label) {
      return
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
   * @param {PointerEvent | MouseEvent} event
   */
  onPointerMove(event) {
    const { clientX, clientY } = event

    const point = this.getPoint(clientX, clientY)
    const $path = this.getPath(point)
    const region = this.getRegion($path, point)

    this.setState('highlight', region)
  }

  onPointerOut() {
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
    const region = this.getRegion($path, point)

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
    selectors: ['path', 'polygon']
  })

  /**
   * Image map config schema
   *
   * @constant
   * @satisfies {Schema<ImageMapConfig>}
   */
  static schema = Object.freeze({
    properties: {
      selectors: { type: 'array' }
    }
  })
}

/**
 * Image map config
 *
 * @see {@link ImageMap.defaults}
 * @typedef {object} ImageMapConfig
 * @property {string[]} selectors - Image map region selectors
 */

/**
 * Image map region
 *
 * @typedef {object} ImageMapRegion
 * @property {string} id - Image map region ID
 * @property {string} label - Region map region label
 * @property {DOMPoint} [point] - SVG point at pointer coordinates
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
 * @param {ImageMapRegion | undefined} [region] - Image map region
 * @returns {void}
 */

/**
 * @import { Schema } from 'nhsuk-frontend/dist/nhsuk/common/configuration/index.mjs'
 */
