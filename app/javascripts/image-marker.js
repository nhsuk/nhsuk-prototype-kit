import { ConfigurableComponent } from '/nhsuk-frontend/nhsuk-frontend.min.js'

/**
 * Image marker component
 *
 * @augments {ConfigurableComponent<ImageMarkerConfig>}
 */
export class ImageMarker extends ConfigurableComponent {
  /**
   * @param {Element | null} [$root] - HTML element to use for component
   * @param {Partial<ImageMarkerConfig>} [config] - Image marker config
   */
  constructor($root, config = {}) {
    $root = $root ?? document.createElement(config.href ? 'a' : 'div')

    super($root, config)

    this.$root.setAttribute('data-module', ImageMarker.moduleName)
    this.$root.classList.add(ImageMarker.moduleName)

    if (config.href) {
      this.$root.setAttribute('href', config.href)
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
    const offsetX = Math.min(Math.max(point.x, 20), this.config.width - 20)
    const offsetY = Math.min(Math.max(point.y, 20), this.config.height - 20)

    this.$root.style.left = `${(offsetX / this.config.width) * 100}%`
    this.$root.style.top = `${(offsetY / this.config.height) * 100}%`
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
      href: { type: 'string' },
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
 * @property {string} [href] - Marker `href` attribute
 * @property {number} width - Image width
 * @property {number} height - Image height
 */

/**
 * @import { Schema } from 'nhsuk-frontend/dist/nhsuk/common/configuration/index.mjs'
 */
