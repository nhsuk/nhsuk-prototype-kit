import { Component, ElementError } from '/nhsuk-frontend/nhsuk-frontend.min.js'

/**
 * Image key component
 */
export class ImageKey extends Component {
  /**
   * @type {BreastFeature[]}
   */
  values = []

  /**
   * @param {Element | null} $root - HTML element to use for component
   */
  constructor($root) {
    super($root)

    const $list = this.$root.querySelector('.app-image-key__items')
    if (!($list instanceof HTMLUListElement)) {
      throw new ElementError({
        component: ImageKey,
        expectedType: 'HTMLUListElement',
        identifier: 'Image key items list (`<ul class="app-image-key__items">`)'
      })
    }

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

    this.$list = $list
    this.$button = $button
    this.$imageKeyItem = $imageKeyItem
  }

  render() {
    const { $button, $list, $root, values } = this

    // Clear key items
    $list.innerHTML = ''

    // Hide features list
    if (!values.length) {
      $root.setAttribute('hidden', '')
      return
    }

    const filtered = values.filter(({ id }) => id !== 'pending')
    if (!filtered.length) {
      return
    }

    // Render key items
    filtered.forEach(({ id, region_id }, index) => {
      const $item = document.importNode(this.$imageKeyItem.content, true)

      const $marker = $item.querySelector('.app-image-marker')
      const $number = $item.querySelector('.app-image-marker__number')
      const $label = $item.querySelector('.app-image-marker__label')
      const $region = $item.querySelector('.app-image-key__region')

      if (!$marker || !$number || !$label || !$region) {
        throw new ElementError({
          component: ImageKey,
          identifier: 'Image key item elements'
        })
      }

      $marker.setAttribute('href', `#marker-${index + 1}`)
      $number.textContent = `${index + 1}`
      $label.textContent = ImageKey.format(id)
      $region.textContent = ImageKey.format(region_id)

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
}

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
 * @import { BreastFeature } from '../breast-diagram/breast-diagram.js'
 */
