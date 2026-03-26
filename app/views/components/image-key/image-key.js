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

    const $button = this.$root.querySelector('.app-image-key__button')
    if (!($button instanceof HTMLButtonElement)) {
      throw new ElementError({
        component: ImageKey,
        expectedType: 'HTMLButtonElement',
        identifier:
          'Image key clear all (`<button class="app-image-key__button">`)'
      })
    }

    this.$button = $button

    const $list = this.$root.querySelector('.app-image-key__items')
    if (!($list instanceof HTMLUListElement)) {
      throw new ElementError({
        component: ImageKey,
        expectedType: 'HTMLUListElement',
        identifier: 'Image key items list (`<ul class="app-image-key__items">`)'
      })
    }

    this.$list = $list

    const $imageKeyItem = this.$root.querySelector(
      'template.app-js-template-image-key-item'
    )

    if (!($imageKeyItem instanceof HTMLTemplateElement)) {
      throw new ElementError({
        component: ImageKey,
        identifier: 'Image key template (`<template>`)'
      })
    }

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

    // Render key items
    values.forEach(({ id, region_id }, index) => {
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
      $label.textContent = this.format(id)
      $region.textContent = this.format(region_id)

      $list.appendChild($item)
    })

    // Show features list
    $root.removeAttribute('hidden')
    $button.removeAttribute('hidden')
  }

  /**
   * Format human readable text from ID
   *
   * @param {string} input - ID to format
   */
  format(input) {
    const output = input.toLowerCase().replace(/_/g, ' ')
    return output.charAt(0).toUpperCase() + output.slice(1)
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-image-key'
}

/**
 * @import { BreastFeature } from '../breast-diagram/breast-diagram.js'
 */
