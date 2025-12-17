import { Component, ElementError } from '/nhsuk-frontend/nhsuk-frontend.min.js'

/**
 * Image map component
 */
export class ImageMap extends Component {
  /**
   * @type {SVGPoint | undefined}
   */
  point

  /**
   * @param {Element | null} $root - HTML element to use for component
   */
  constructor($root) {
    super($root)

    const $image = this.$root.querySelector('.nhsuk-image__img')
    if (!$image || !($image instanceof SVGSVGElement)) {
      throw new ElementError({
        component: ImageMap,
        identifier: 'Image (`<svg class="nhsuk-image__img">`)'
      })
    }

    /** @type {NodeListOf<SVGPathElement | SVGPolygonElement>} */
    const $paths = $image.querySelectorAll(
      '.app-breast-diagram__regions path, .app-breast-diagram__regions polygon'
    )
    if (!$paths.length) {
      throw new ElementError({
        component: ImageMap,
        identifier: 'Image paths and polygons (`<path>`, `<polygon>`)'
      })
    }

    const $debugX = this.$root.querySelector('.app-js-image-x')
    const $debugY = this.$root.querySelector('.app-js-image-y')
    const $debugLocation = this.$root.querySelector('.app-js-image-location')

    if (!$debugX || !$debugY || !$debugLocation) {
      throw new ElementError({
        component: ImageMap,
        identifier: 'Debug elements (`.app-js-image-*`)'
      })
    }

    // Reverse paths to pick frontmost path first
    this.$paths = Array.from($paths).reverse()
    this.$image = $image

    this.x = 0
    this.y = 0

    this.$debugX = $debugX
    this.$debugY = $debugY
    this.$debugLocation = $debugLocation

    this.$image.addEventListener('pointermove', this.onPointerMove.bind(this))
    this.$image.addEventListener('pointerout', this.onPointerOut.bind(this))
  }

  /**
   * Get SVG path title at pointer coordinates
   *
   * @param {number} clientX - Pointer X coordinate in screen pixels
   * @param {number} clientY - Pointer Y coordinate in screen pixels
   * @returns {string | undefined}
   */
  getLabel(clientX, clientY) {
    this.point = this.getPoint(clientX, clientY)

    const $path = this.$paths.find(($path) => $path.isPointInFill(this.point))
    return $path?.getAttribute('aria-label')
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
   * @param {PointerEvent} event
   */
  onPointerMove(event) {
    const { clientX, clientY } = event
    const title = this.getLabel(clientX, clientY)

    this.$debugLocation.textContent = title ?? 'Background'
    this.$debugX.textContent = this.point.x.toString()
    this.$debugY.textContent = this.point.y.toString()
  }

  onPointerOut() {
    this.$debugLocation.textContent = 'N/A'
    this.$debugX.textContent = 'N/A'
    this.$debugY.textContent = 'N/A'
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-image-map'
}
