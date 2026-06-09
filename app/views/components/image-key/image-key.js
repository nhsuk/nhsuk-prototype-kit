import {
  ConfigurableComponent,
  ElementError
} from '/nhsuk-frontend/nhsuk-frontend.min.js'

/**
 * Image key component
 *
 * @augments {ConfigurableComponent<ImageKeyConfig>}
 */
export class ImageKey extends ConfigurableComponent {
  /**
   * @type {ImageMarker[]}
   */
  markers = []

  /**
   * @param {Element | null} $root - HTML element to use for component
   * @param {Partial<ImageKeyConfig>} [config] - Image key config
   */
  constructor($root, config = {}) {
    super($root, config)

    const $list = this.$root.querySelector('.app-image-key__items')
    if (!($list instanceof HTMLUListElement)) {
      throw new ElementError({
        component: ImageKey,
        expectedType: 'HTMLUListElement',
        identifier: 'Image key items list (`<ul class="app-image-key__items">`)'
      })
    }

    this.$list = $list

    if (!this.config.readOnly) {
      const $button = this.$root.querySelector('button[type="reset"]')
      if (!($button instanceof HTMLButtonElement)) {
        throw new ElementError({
          component: ImageKey,
          expectedType: 'HTMLButtonElement',
          identifier: 'Clear all features (`<button type="reset">`)'
        })
      }

      const $imageKeyItem = this.$root.querySelector(
        'template.app-js-template-image-key-item'
      )

      if (!($imageKeyItem instanceof HTMLTemplateElement)) {
        throw new ElementError({
          component: ImageKey,
          identifier: 'Image key template (`<template>`)'
        })
      }

      this.$button = $button
      this.$imageKeyItem = $imageKeyItem

      this.$button.addEventListener('click', this.onClear.bind(this))
    }
  }

  render() {
    const { $root, $list, $button, $imageKeyItem, markers } = this
    if (!$button || !$imageKeyItem) {
      return
    }

    // Clear key items
    $list.innerHTML = ''

    // Hide features list
    if (!markers.length) {
      $root.setAttribute('hidden', '')
      return
    }

    const filtered = markers.filter(({ config }) => !!config.text)
    if (!filtered.length) {
      return
    }

    // Render key items
    filtered.forEach((marker, index) => {
      const $item = document.importNode($imageKeyItem.content, true)

      const $marker = $item.querySelector('.app-image-marker')
      const $number = $item.querySelector('.app-image-marker__number')
      const $description = $item.querySelector('.app-image-marker__description')
      const $tag = $item.querySelector('.app-image-key__tag')

      if (!$marker || !$number || !$description || !$tag) {
        throw new ElementError({
          component: ImageKey,
          identifier: 'Image key item elements'
        })
      }

      const number = index + 1
      const markerId = `marker-${number}`

      $number.textContent = marker.config.text ?? '?'
      $description.textContent = marker.config.description

      $tag.textContent = marker.config.tag
      $tag.id = `${markerId}-tag`

      $marker.setAttribute('href', `#${markerId}`)
      $marker.setAttribute('aria-label', marker.config.ariaLabel)
      $marker.setAttribute('aria-describedby', $tag.id)

      $list.appendChild($item)
    })

    // Show features list
    $root.removeAttribute('hidden')
    $button.removeAttribute('hidden')
  }

  /**
   * Add event listener for image key
   *
   * @param {ImageKeyEvent} name - Event name, e.g. 'clear'
   * @param {ImageKeyListener} listener - Image key listener
   */
  addEventListener(name, listener) {
    this.$root.addEventListener(
      `${ImageKey.moduleName}:${name}`,
      /** @type {EventListener} */ (listener)
    )
  }

  /**
   * Dispatch event for image key
   *
   * @param {ImageKeyEvent} name - Event name, e.g. 'clear'
   */
  dispatchEvent(name) {
    this.$root.dispatchEvent(
      new CustomEvent(`${ImageKey.moduleName}:${name}`, {
        bubbles: true
      })
    )
  }

  /**
   * @param {MouseEvent} event
   */
  onClear(event) {
    event.preventDefault()
    this.dispatchEvent('clear')
  }

  /**
   * Format human readable text from ID
   *
   * @param {string} input - ID to format
   */
  static format(input) {
    const output = input.toLowerCase().replace(/_/g, ' ')
    return output.charAt(0).toUpperCase() + output.slice(1)
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-image-key'

  /**
   * Image key default config
   *
   * @see {@link ImageKeyConfig}
   * @constant
   * @type {ImageKeyConfig}
   */
  static defaults = Object.freeze({
    readOnly: false
  })

  /**
   * Image key config schema
   *
   * @constant
   * @satisfies {Schema<ImageKeyConfig>}
   */
  static schema = Object.freeze({
    properties: {
      readOnly: { type: 'boolean' }
    }
  })
}

/**
 * Image key config
 *
 * @see {@link ImageKey.defaults}
 * @typedef {object} ImageKeyConfig
 * @property {boolean} readOnly - Whether image key is read only
 */

/**
 * @typedef {'clear'} ImageKeyEvent - Image key event
 */

/**
 * Image key listener
 *
 * @callback ImageKeyListener
 * @param {CustomEvent} event - Image key event
 * @returns {void}
 */

/**
 * @import { Schema } from 'nhsuk-frontend'
 * @import { ImageMarker } from '../image-marker/image-marker.js'
 */
