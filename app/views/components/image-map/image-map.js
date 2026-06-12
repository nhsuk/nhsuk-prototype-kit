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
   * @type {ImageMarker[]}
   */
  markers = []

  /**
   * Track drag and drop pointer event targets
   *
   * @type {Map<number, ImageMapTarget>}
   */
  targets = new Map()

  /**
   * @param {Element | null} $root - HTML element to use for component
   * @param {Partial<Pick<ImageMapConfig, 'imageClass' | 'selectors' | 'readOnly'>>} [config] - Image map config
   */
  constructor($root, config = {}) {
    super($root, config)

    const { events } = ImageMap
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

    this.handleDrag = this.onDrag.bind(this)
    this.handleDragEnd = this.onDragEnd.bind(this)

    if (!this.config.readOnly) {
      this.$root.setAttribute('tabindex', '-1')
      this.$root.addEventListener('focusin', this.onFocusIn.bind(this))
      this.$root.addEventListener('click', this.onClick.bind(this))

      this.$root.addEventListener(events.down, this.onPointerDown.bind(this))
      this.$root.addEventListener(events.move, this.onPointerMove.bind(this))
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

  render() {
    const { markers } = this

    // Render all markers
    for (const marker of markers) {
      marker.render()

      // Append new marker (optional)
      if (!marker.$root.parentElement) {
        this.$root.appendChild(marker.$root)
      }
    }
  }

  focus() {
    this.$root.focus({ preventScroll: true })
  }

  /**
   * Set image map state
   *
   * @param {ImageMapState} state - State to set, e.g. 'active'
   * @param {SVGGeometryElement} [$activePath] - SVG path to set state for
   */
  setState(state, $activePath) {
    $activePath?.setAttribute(`data-${state}`, 'true')
  }

  /**
   * Unset image map state
   *
   * @param {ImageMapState} state - State to unset, e.g. 'active'
   * @param {SVGGeometryElement} [$activePath] - SVG path to unset state for
   */
  unsetState(state, $activePath) {
    const { $paths } = this

    // Reset state for all paths
    if (!$activePath) {
      $paths.forEach(($path) => this.unsetState(state, $path))
      return
    }

    // Reset state for active path only
    $activePath.removeAttribute(`data-${state}`)
  }

  /**
   * Get marker for image map
   *
   * @param {number | string} [number] - Image marker number
   */
  getMarker(number) {
    if (number === undefined) {
      return
    }

    const index = Number(number) - 1
    return this.markers[index]
  }

  /**
   * Set marker for image map
   *
   * @param {number | string} number - Image marker number
   * @param {ImageMarker} marker - Image marker
   * @param {number} pointX - SVG point X coordinate
   * @param {number} pointY - SVG point Y coordinate
   */
  setMarker(number, marker, pointX, pointY) {
    const index = Number(number) - 1

    // Create new marker (optional)
    if (!this.markers[index]) {
      this.markers[index] = marker
    }

    // Create SVG point
    const point = this.createPoint(pointX, pointY)

    // Set marker position
    marker.setPosition(point)

    return marker
  }

  /**
   * Get pointer event target ID
   *
   * @param {MouseEvent | PointerEvent} event
   */
  getTargetId(event) {
    return event instanceof PointerEvent ? event.pointerId : 0
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
   * @returns {DOMPoint}
   */
  createPoint(pointX, pointY) {
    const point = this.$image.createSVGPoint()

    point.x = pointX
    point.y = pointY

    return point
  }

  /**
   * Add event listener for image map
   *
   * @param {ImageMapEvent} name - Event name, e.g. 'hover', 'edit'
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
   * @param {ImageMapEvent} name - Event name, e.g. 'hover', 'edit'
   * @param {ImageMapPayload} detail - Image map payload
   * @param {EventTarget | null} [target] - Event target
   */
  dispatchEvent(name, detail, target) {
    target ??= this.$root

    target.dispatchEvent(
      new CustomEvent(`${ImageMap.moduleName}:${name}`, {
        bubbles: true,
        detail
      })
    )
  }

  /**
   * @param {MouseEvent | PointerEvent} event
   */
  onPointerDown(event) {
    const { targets } = this
    const { events } = ImageMap
    const { clientX, clientY, target } = event

    if (!(target instanceof HTMLButtonElement) || event.button > 0) {
      return
    }

    // Skip markers already being dragged
    for (const { $element } of targets.values()) {
      if ($element === target) return
    }

    // Add drag and drop listeners on first pointer down
    if (!targets.size) {
      document.addEventListener(events.move, this.handleDrag)
      document.addEventListener(events.up, this.handleDragEnd)
    }

    const targetId = this.getTargetId(event)

    targets.set(targetId, {
      pointerDownX: clientX,
      pointerDownY: clientY,
      $element: target,
      isDragging: false
    })
  }

  /**
   * @param {MouseEvent | PointerEvent} event
   */
  onPointerMove(event) {
    const { clientX, clientY } = event

    const point = this.getPoint(clientX, clientY)
    const $path = this.getPath(point)

    this.dispatchEvent('hover', { $path, point })
  }

  /**
   * @param {MouseEvent | PointerEvent} event
   */
  onDrag(event) {
    const { clientX, clientY } = event

    const targetId = this.getTargetId(event)
    const target = this.targets.get(targetId)

    if (!target) {
      return
    }

    if (!target.isDragging) {
      const dx = clientX - target.pointerDownX
      const dy = clientY - target.pointerDownY

      // Minimum 5px movement before dragging
      if (Math.sqrt(dx * dx + dy * dy) < 5) {
        return
      }

      target.isDragging = true
    }

    const point = this.getPoint(clientX, clientY)
    const $path = this.getPath(point)

    this.dispatchEvent('drag', { $path, point }, target.$element)
  }

  /**
   * @param {MouseEvent | PointerEvent} event
   */
  onDragEnd(event) {
    const { targets } = this
    const { events } = ImageMap
    const { clientX, clientY } = event

    const targetId = this.getTargetId(event)
    const target = this.targets.get(targetId)
    if (!target) {
      return
    }

    // Delay end of drag and drop until after click event fires
    window.requestAnimationFrame(() => {
      targets.delete(targetId)

      // Remove drag and drop listeners after last pointer up
      if (!targets.size) {
        document.removeEventListener(events.move, this.handleDrag)
        document.removeEventListener(events.up, this.handleDragEnd)
      }

      if (target.isDragging) {
        const point = this.getPoint(clientX, clientY)
        const $path = this.getPath(point)

        target.isDragging = false
        this.dispatchEvent('dragend', { $path, point }, target.$element)
      }
    })
  }

  /**
   * @param {FocusEvent} event
   */
  onFocusIn(event) {
    if (!(event.target instanceof HTMLElement)) {
      return
    }

    this.dispatchEvent('focusin', { $path: undefined }, event.target)
  }

  /**
   * @param {MouseEvent} event
   */
  onClick(event) {
    const { targets } = this
    const { clientX, clientY, target } = event

    event.preventDefault()

    const point = this.getPoint(clientX, clientY)
    const $path = this.getPath(point)

    if (!(target instanceof HTMLButtonElement)) {
      this.dispatchEvent('create', { $path, point })
    }

    // Suppress click event at end of drag and drop
    for (const { $element, isDragging } of targets.values()) {
      if ($element === target && isDragging) return
    }

    this.dispatchEvent('edit', { $path, point }, target)
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-image-map'

  static events = Object.freeze({
    move: 'PointerEvent' in window ? 'pointermove' : 'mousemove',
    up: 'PointerEvent' in window ? 'pointerup' : 'mouseup',
    down: 'PointerEvent' in window ? 'pointerdown' : 'mousedown'
  })

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
 * @typedef {'active'} ImageMapState - Image map state
 * @typedef {'hover' | 'create' | 'edit' | 'focusin' | 'drag' | 'dragend'} ImageMapEvent - Image map event
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
 * Image map pointer target
 *
 * @typedef ImageMapTarget
 * @property {number} pointerDownX - Pointer down X coordinate in screen pixels
 * @property {number} pointerDownY - Pointer down Y coordinate in screen pixels
 * @property {HTMLButtonElement} $element - Pointer target element
 * @property {boolean} isDragging - Whether pointer target is being dragged
 */

/**
 * Image map listener
 *
 * @callback ImageMapListener
 * @param {CustomEvent<ImageMapPayload>} event - Image map event
 * @returns {void}
 */

/**
 * @import { Schema } from 'nhsuk-frontend'
 * @import { ImageMarker } from '../image-marker/image-marker.js'
 */
