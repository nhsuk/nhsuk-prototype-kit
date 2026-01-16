import { Component, ElementError } from '/nhsuk-frontend/nhsuk-frontend.min.js'

/**
 * Image map component
 */
export class ImageMap extends Component {
  /**
   * @type {ImageMapRegion | undefined}
   */
  region

  /**
   * @type {ImageMapRegion | undefined}
   */
  regionActive

  /**
   * @type {SVGPoint | undefined}
   */
  point

  /**
   * @type {Element | undefined}
   */
  $debugX

  /**
   * @type {Element | undefined}
   */
  $debugY

  /**
   * @type {Element | undefined}
   */
  $debugInput

  /**
   * @type {Element | undefined}
   */
  $debugRegion

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

    /** @type {NodeListOf<ImageMapRegion['$path']>} */
    const $paths = $image.querySelectorAll(
      '.app-breast-diagram__regions path, .app-breast-diagram__regions polygon'
    )
    if (!$paths.length) {
      throw new ElementError({
        component: ImageMap,
        identifier: 'Image paths and polygons (`<path>`, `<polygon>`)'
      })
    }

    const $input = this.$root.querySelector('input[name="imageMapRegion"]')
    if (!($input instanceof HTMLInputElement)) {
      throw new ElementError({
        component: ImageMap,
        element: $input,
        expectedType: 'HTMLInputElement',
        identifier: 'Image map region (`input[name="imageMapRegion"]`)'
      })
    }

    // Reverse paths to pick frontmost path first
    this.$paths = Array.from($paths).reverse()
    this.$image = $image
    this.$input = $input

    this.$image.addEventListener('pointermove', this.onPointerMove.bind(this))
    this.$image.addEventListener('pointerout', this.onPointerOut.bind(this))
    this.$image.addEventListener('click', this.onClick.bind(this))
  }

  /**
   * Get SVG path region at pointer coordinates
   *
   * @returns {ImageMapRegion | undefined}
   */
  getRegion() {
    const $path = this.$paths.find(($path) => $path.isPointInFill(this.point))
    if (!$path) {
      return
    }

    return {
      id: $path.classList.value,
      label: $path.getAttribute('aria-label'),
      $path
    }
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
   * Update form inputs
   */
  updateForm() {
    this.$input.setAttribute('value', this.regionActive?.id ?? '')

    // Set path active states
    for (const $path of this.$paths) {
      $path === this.regionActive?.$path
        ? $path.setAttribute('data-active', 'true')
        : $path.removeAttribute('data-active')
    }
  }

  /**
   * Update status messages
   */
  updateStatus() {
    this.$debugX ??= this.$root.querySelector('.app-js-image-x')
    this.$debugY ??= this.$root.querySelector('.app-js-image-y')
    this.$debugRegion ??= this.$root.querySelector('.app-js-image-region')
    this.$debugInput ??= this.$root.querySelector('.app-js-image-input')

    const { $debugX, $debugY, $debugRegion, $debugInput } = this

    if (!this.point || !this.region) {
      $debugX.textContent = 'N/A'
      $debugY.textContent = 'N/A'
      $debugRegion.textContent = 'N/A'

      return
    }

    $debugX.textContent = this.point.x.toString()
    $debugY.textContent = this.point.y.toString()
    $debugRegion.textContent = this.region.label

    if (this.regionActive) {
      $debugInput.textContent = this.regionActive.label
    }
  }

  /**
   * @param {PointerEvent | MouseEvent} event
   */
  onPointerMove(event) {
    const { clientX, clientY } = event

    this.point = this.getPoint(clientX, clientY)
    this.region = this.getRegion()

    // Set path highlight states
    for (const $path of this.$paths) {
      $path === this.region.$path
        ? $path.setAttribute('data-highlight', 'true')
        : $path.removeAttribute('data-highlight')
    }

    this.updateStatus()
  }

  onPointerOut() {
    this.point = undefined
    this.region = undefined

    // Remove path highlight states
    for (const $path of this.$paths) {
      $path.removeAttribute('data-highlight')
    }

    this.updateStatus()
  }

  /**
   * @param {MouseEvent} event
   */
  onClick(event) {
    event.preventDefault()

    // Trigger X/Y and region update
    this.onPointerMove(event)

    // Save active region
    this.regionActive = this.region

    this.updateStatus()
    this.updateForm()
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-image-map'
}

/**
 * @typedef {object} ImageMapRegion
 * @property {string} id - Image map region ID
 * @property {string} label - Region map region label
 * @property {SVGPathElement | SVGPolygonElement} $path - Image map region element
 */
