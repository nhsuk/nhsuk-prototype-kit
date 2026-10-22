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
   * @type {HTMLAnchorElement[]}
   */
  $links = []

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
      this.$root.addEventListener('focusin', this.onFocusIn.bind(this))
    }
  }

  render() {
    const { $root, $list, $links, $button, $imageKeyItem, markers } = this
    if (!$button || !$imageKeyItem) {
      return
    }

    // Clear key items
    $list.innerHTML = ''
    $links.length = 0

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
      const { firstElementChild: $item } = document.importNode(
        $imageKeyItem.content,
        true
      )

      if (!($item instanceof HTMLElement)) {
        throw new ElementError({
          component: ImageKey,
          identifier: 'Image key template contents (`<template>`)'
        })
      }

      const $link = $item.querySelector('.app-image-marker')
      if (!($link instanceof HTMLAnchorElement)) {
        throw new ElementError({
          component: ImageKey,
          element: $item,
          expectedType: 'HTMLAnchorElement',
          identifier: 'Image key template link (`<a class="app-image-marker">`)'
        })
      }

      const $number = $item.querySelector('.app-image-marker__number')
      const $description = $item.querySelector('.app-image-marker__description')
      const $tag = $item.querySelector('.app-image-key__tag')

      if (!$number || !$description || !$tag) {
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

      $link.setAttribute('href', `#${markerId}`)
      $link.setAttribute('aria-label', marker.config.ariaLabel)
      $link.setAttribute('aria-describedby', $tag.id)

      $links.push($link)
      $list.appendChild($item)
    })

    // Show features list
    $root.removeAttribute('hidden')
    $button.removeAttribute('hidden')
  }

  /**
   * Focus image key link by number
   *
   * @param {number | string} [number] - Image key number
   */
  focus(number) {
    const { $root } = this

    const $link = this.getLink(number)
    if (!$link) {
      return
    }

    const { top: rootTop } = $root.getBoundingClientRect()
    const { bottom: linkBottom } = $link.getBoundingClientRect()

    // If the link is in the bottom half of the screen we optionally scroll to
    // either the image key or image link (see NHS.UK frontend error summary)
    const isLinkNear = linkBottom < window.innerHeight / 2
    const isImageMapNear = linkBottom - rootTop < window.innerHeight / 2

    if (!isLinkNear && isImageMapNear) {
      $root.scrollIntoView({ behavior: 'smooth' })
    } else if (!isLinkNear) {
      $link.parentElement?.scrollIntoView({ behavior: 'smooth' })
    }

    $link.focus({ preventScroll: true })
  }

  /**
   * Get link for image key
   *
   * @param {number | string} [number] - Image link number
   */
  getLink(number) {
    if (number === undefined) {
      return
    }

    const index = Number(number) - 1
    return this.$links[index]
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
   * @param {EventTarget | null} [target] - Event target
   */
  dispatchEvent(name, target) {
    target ??= this.$root

    target.dispatchEvent(
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
   * @param {FocusEvent} event
   */
  onFocusIn(event) {
    if (!(
      event.target instanceof HTMLAnchorElement ||
      event.target instanceof HTMLButtonElement
    )) {
      return
    }

    this.dispatchEvent('focusin', event.target)
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
 * @typedef {'clear' | 'focusin'} ImageKeyEvent - Image key event
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
