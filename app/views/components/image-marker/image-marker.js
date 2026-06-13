import {
  ConfigurableComponent,
  ElementError
} from '/nhsuk-frontend/nhsuk-frontend.min.js'

/**
 * Image marker component
 *
 * @augments {ConfigurableComponent<ImageMarkerConfig>}
 */
export class ImageMarker extends ConfigurableComponent {
  x = 0
  y = 0

  /**
   * @type {DOMPoint | undefined}
   */
  point

  /**
   * @type {'left' | 'right' | undefined}
   */
  side

  /**
   * @param {Element | null} $root - HTML element to use for component
   * @param {Partial<ImageMarkerConfig>} [config] - Image marker config
   */
  constructor($root, config = {}) {
    super($root, config)
    this.render()
  }

  render() {
    const { $root, config } = this

    $root.textContent = config.text ?? '?'
    $root.style.left = `${(this.x / config.width) * 100}%`
    $root.style.top = `${(this.y / config.height) * 100}%`

    if (!($root instanceof HTMLButtonElement)) {
      return
    }

    $root.setAttribute('aria-label', config.ariaLabel)

    if (config.value) {
      $root.setAttribute('id', `marker-${config.value}`)
      $root.setAttribute('value', config.value)
    }
  }

  focus() {
    this.$root.focus({ preventScroll: true })
  }

  /**
   * @param {DOMPoint} point - SVG point at pointer coordinates
   */
  setPosition(point) {
    const { config } = this

    const gutter = 20 // 20px

    // Maximum safe area
    const safeX = config.width - gutter
    const safeY = config.height - gutter

    // Save original point for reference
    this.point = point

    // Offset to minimum and maximum safe area
    this.x = Math.min(Math.max(point.x, gutter), safeX)
    this.y = Math.min(Math.max(point.y, gutter), safeY)

    // Locate left or right side
    this.side = point.x < config.width / 2 ? 'left' : 'right'
  }

  /**
   * Create new image marker element
   *
   * @param {HTMLElement} $scope
   */
  static createElement($scope) {
    const $template = $scope.querySelector(
      'template.app-js-template-image-marker'
    )

    if (!($template instanceof HTMLTemplateElement)) {
      throw new ElementError({
        component: ImageMarker,
        identifier: 'Image marker template (`<template>`)'
      })
    }

    const { firstElementChild: $root } = document.importNode(
      $template.content,
      true
    )

    if (!($root instanceof HTMLElement)) {
      throw new ElementError({
        component: ImageMarker,
        identifier: 'Image marker template contents (`<template>`)'
      })
    }

    return $root
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
    description: 'Pending',
    ariaLabel: 'New marker',
    tag: 'Unknown',
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
      text: { type: 'string' },
      description: { type: 'string' },
      ariaLabel: { type: 'string' },
      tag: { type: 'string' },
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
 * @property {string} [text] - Image marker text to display
 * @property {string} [value] - Image marker `value` attribute
 * @property {string} description - Image marker label, e.g. "Bruising or trauma"
 * @property {string} ariaLabel - Image marker ARIA label, e.g. "Marker 1"
 * @property {string} tag - Image marker tag, e.g. "Left lower central "
 * @property {number} width - Image width
 * @property {number} height - Image height
 */

/**
 * @import { Schema } from 'nhsuk-frontend'
 */
