import { ConfigurableComponent } from '/nhsuk-frontend/nhsuk-frontend.min.js'

/**
 * Image marker component
 *
 * @augments {ConfigurableComponent<ImageMarkerConfig>}
 */
export class ImageMarker extends ConfigurableComponent {
  /**
   * @param {Element | null} $root - HTML element to use for component
   * @param {Partial<ImageMarkerConfig>} [config] - Image marker config
   */
  constructor($root, config = {}) {
    super($root, config)

    if (!(this.$root instanceof HTMLButtonElement)) {
      return this
    }

    if (config.id) {
      this.$root.setAttribute('id', config.id)
    }

    if (config.value) {
      this.$root.setAttribute('value', config.value)
    }
  }

  /**
   * @param {string} value - Image marker text
   */
  set textContent(value) {
    this.$root.textContent = value
  }

  /**
   * @param {DOMPoint} point - SVG point at pointer coordinates
   */
  set point(point) {
    const { $root, config } = this

    const gutter = 20 // 20px

    // Maximum safe area
    const safeX = config.width - gutter
    const safeY = config.height - gutter

    // Offset to minimum and maximum safe area
    this.x = Math.min(Math.max(point.x, gutter), safeX)
    this.y = Math.min(Math.max(point.y, gutter), safeY)

    $root.style.left = `${(this.x / config.width) * 100}%`
    $root.style.top = `${(this.y / config.height) * 100}%`
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-image-marker'

  /**
   * Image marker default config
   *
   * @see {@link ImageMarkerConfig}
   * @constant
   * @type {ImageMarkerConfig}
   */
  static defaults = Object.freeze({
    width: 0,
    height: 0
  })

  /**
   * Image marker config schema
   *
   * @constant
   * @satisfies {Schema<ImageMarkerConfig>}
   */
  static schema = Object.freeze({
    properties: {
      id: { type: 'string' },
      value: { type: 'string' },
      width: { type: 'number' },
      height: { type: 'number' }
    }
  })
}

/**
 * Image marker config
 *
 * @see {@link ImageMarker.defaults}
 * @typedef {object} ImageMarkerConfig
 * @property {string} [id] - Marker `id` attribute
 * @property {string} [value] - Marker `value` attribute
 * @property {number} width - Image width
 * @property {number} height - Image height
 */

/**
 * @import { Schema } from 'nhsuk-frontend'
 */
