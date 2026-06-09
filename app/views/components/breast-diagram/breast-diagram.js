import { ImageKey } from '../image-key/image-key.js'
import { ImageMap } from '../image-map/image-map.js'
import { ImageMarker } from '../image-marker/image-marker.js'
import {
  ConfigurableComponent,
  ElementError,
  createAll,
  isObject
} from '/nhsuk-frontend/nhsuk-frontend.min.js'

const FEATURE_ID_PENDING = 'pending'
const FEATURE_ID_OTHER = 'other_feature'

/**
 * Breast diagram component
 *
 * @augments {ConfigurableComponent<BreastDiagramConfig>}
 */
export class BreastDiagram extends ConfigurableComponent {
  /**
   * @type {HTMLFormElement}
   */
  $form

  /**
   * @type {HTMLInputElement}
   */
  $input

  /**
   * @type {HTMLElement | null}
   */
  $popover = null

  /**
   * @type {HTMLElement | null}
   */
  $radiosFieldset = null

  /**
   * @type {HTMLElement | null}
   */
  $radiosLegend = null

  /**
   * @type {HTMLElement | null}
   */
  $radiosFormGroup = null

  /**
   * @type {HTMLElement | null}
   */
  $radiosErrorMessage = null

  /**
   * @type {HTMLInputElement[]}
   */
  $radios = []

  /**
   * @type {HTMLElement | null}
   */
  $region = null

  /**
   * @type {HTMLElement | null}
   */
  $detailsFormGroup = null

  /**
   * @type {HTMLElement | null}
   */
  $detailsErrorMessage = null

  /**
   * @type {HTMLInputElement | null}
   */
  $details = null

  /**
   * @type {Element[]}
   */
  $captions = []

  /**
   * @type {Element[]}
   */
  $buttons = []

  /**
   * @type {HTMLTemplateElement}
   */
  $imageMarker

  /**
   * @type {ImageMap}
   */
  imageMap

  /**
   * @type {ImageKey | null}
   */
  imageKey = null

  /**
   * @type {ImageMarker[]}
   */
  markers

  /**
   * @type {BreastFeature[]}
   */
  values

  /**
   * @param {Element | null} $root - HTML element to use for component
   * @param {Partial<BreastDiagramConfig>} [config] - Breast diagram config
   */
  constructor($root, config = {}) {
    super($root, config)

    const { readOnly } = this.config

    const $form = this.$root.closest('form')
    if (!($form instanceof HTMLFormElement)) {
      throw new ElementError({
        component: BreastDiagram,
        element: $form,
        expectedType: 'HTMLFormElement',
        identifier: 'Breast diagram form (`<form>`)'
      })
    }

    const $input = $form.querySelector('input[name="features"]')
    if (!($input instanceof HTMLInputElement)) {
      throw new ElementError({
        component: BreastDiagram,
        element: $input,
        expectedType: 'HTMLInputElement',
        identifier: 'Breast diagram feature values (`input[name="features"]`)'
      })
    }

    const $imageMarker = this.$root.querySelector(
      'template.app-js-template-image-marker'
    )

    if (!($imageMarker instanceof HTMLTemplateElement)) {
      throw new ElementError({
        component: BreastDiagram,
        identifier: 'Breast diagram template (`<template>`)'
      })
    }

    this.$form = $form
    this.$input = $input
    this.$imageMarker = $imageMarker
    this.markers = []
    this.values = []

    const imageMaps = createAll(
      ImageMap,
      {
        imageClass: 'app-breast-diagram__svg',
        selectors: [
          '.app-breast-diagram__regions path',
          '.app-breast-diagram__regions polygon'
        ]
      },
      { scope: this.$root }
    )

    if (!imageMaps.length || !(imageMaps[0].$root instanceof HTMLElement)) {
      throw new ElementError({
        component: BreastDiagram,
        identifier: `Image map (\`[data-module="${ImageMap.moduleName}"]\`)`
      })
    }

    this.imageMap = imageMaps[0]

    if (!readOnly) {
      const $popover = this.$root.querySelector('.app-breast-diagram__popover')

      if (!($popover instanceof HTMLElement)) {
        throw new ElementError({
          component: BreastDiagram,
          identifier: 'Add or edit breast feature popover'
        })
      }

      const $region = $popover.querySelector('.app-breast-diagram__region')
      const $details = $form.querySelector('input[name="feature_details"]')
      const $detailsFormGroup = $details?.closest('.nhsuk-form-group')
      const $detailsErrorMessage = $detailsFormGroup?.querySelector(
        '.nhsuk-error-message'
      )

      const $captions = Array.from(
        $popover.querySelectorAll('.app-breast-diagram__caption')
      )

      const $buttons = Array.from(
        $popover.querySelectorAll('.app-breast-diagram__button')
      )

      const $radios = Array.from(
        $form.querySelectorAll('input[name="feature"]')
      )

      const $radiosFieldset = $radios[0]?.closest('.nhsuk-fieldset')
      const $radiosLegend = $radiosFieldset?.querySelector(
        '.nhsuk-fieldset__legend'
      )

      const $radiosFormGroup = $radios[0]?.closest('.nhsuk-form-group')
      const $radiosErrorMessage = $radiosFieldset?.querySelector(
        '.nhsuk-error-message'
      )

      if (
        !($region instanceof HTMLElement) ||
        !($details instanceof HTMLInputElement) ||
        !($detailsFormGroup instanceof HTMLElement) ||
        !($detailsErrorMessage instanceof HTMLElement) ||
        !($radiosFieldset instanceof HTMLElement) ||
        !($radiosLegend instanceof HTMLElement) ||
        !($radiosFormGroup instanceof HTMLElement) ||
        !($radiosErrorMessage instanceof HTMLElement) ||
        !$captions.length ||
        !$buttons.length ||
        !$radios.length
      ) {
        throw new ElementError({
          component: BreastDiagram,
          identifier: 'Add or edit breast feature popover elements'
        })
      }

      this.$popover = $popover
      this.$region = $region
      this.$details = $details
      this.$detailsFormGroup = $detailsFormGroup
      this.$detailsErrorMessage = $detailsErrorMessage
      this.$captions = $captions
      this.$buttons = $buttons
      this.$radios = $radios
      this.$radiosFieldset = $radiosFieldset
      this.$radiosLegend = $radiosLegend
      this.$radiosFormGroup = $radiosFormGroup
      this.$radiosErrorMessage = $radiosErrorMessage

      const imageKeys = createAll(
        ImageKey,
        { allowlist: this.$radios.map(($radio) => $radio.value) },
        { scope: this.$root }
      )

      if (!imageKeys.length || !(imageKeys[0].$root instanceof HTMLElement)) {
        throw new ElementError({
          component: BreastDiagram,
          identifier: `Image key (\`[data-module="${ImageKey.moduleName}"]\`)`
        })
      }

      this.imageKey = imageKeys[0]

      this.imageMap.addEventListener('create', (event) => this.onCreate(event))
      this.imageMap.addEventListener('edit', (event) => this.onEdit(event))
      this.imageMap.addEventListener('hover', (event) => this.log(event))

      this.$form.addEventListener('click', (event) => this.onClick(event))
      this.$form.addEventListener('submit', (event) => this.onSubmit(event))
      this.$form.addEventListener('reset', (event) => this.onReset(event))

      document.addEventListener('keydown', (event) => this.onKeyDown(event))
    }

    // Render diagram features
    this.read()
    this.render()
    this.log()
  }

  /**
   * Render diagram features
   */
  render() {
    const { imageMap, markers, values } = this

    if (!values.length) {
      imageMap.unsetState('active')
    }

    values.forEach((feature, index) => {
      const $path = imageMap.getPathById(feature.region_id)

      // Render active region
      imageMap.setState('active', $path)

      // Set marker position
      this.setMarker(feature, index)
    })

    // Update key (optional if read only)
    this.imageKey?.render()

    // Remove excess markers
    for (const marker of markers.splice(values.length)) {
      marker.$root.remove()
    }
  }

  /**
   * Read diagram values from hidden input
   */
  read() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.values = /** @type {BreastFeature[]} */ (
        JSON.parse(decodeURIComponent(this.$input.value), getArrayValue) ?? []
      )

      // Set key values (optional if read only)
      if (this.imageKey) {
        this.imageKey.values = this.values
      }
    } catch {
      throw new ElementError({
        component: BreastDiagram,
        identifier: 'Breast diagram feature JSON (`input[name="features"]`)'
      })
    }
  }

  /**
   * Write diagram values to hidden input
   */
  write() {
    this.$input.value = JSON.stringify(this.values)
    this.log()
  }

  /**
   * Add breast feature
   *
   * @param {BreastFeature} feature
   */
  add(feature) {
    this.values.push(feature)
    this.render()
    this.write()
  }

  /**
   * Remove breast feature
   *
   * @param {Pick<BreastFeature, 'x' | 'y'> | DOMPoint} [point]
   */
  remove(point) {
    const { imageMap, values } = this

    const value = this.getValue(point)
    if (!value) {
      return
    }

    const index = values.indexOf(value)
    const $path = imageMap.getPathById(value.region_id)

    imageMap.unsetState('active', $path)
    values.splice(index, 1)

    this.render()
    this.write()
  }

  /**
   * Clear all features
   */
  clear() {
    this.values.length = 0
    this.render()
    this.write()
  }

  /**
   * Update status messages
   *
   * @param {CustomEvent<ImageMapPayload>} [event] - Image map event
   */
  log(event) {
    const { debug } = this.config
    const { point, $path } = event?.detail ?? {}

    if (!debug) {
      return
    }

    /** @type {Element | null} */
    this.$debugX = this.$debugX ?? this.$root.querySelector('.app-js-image-x')

    /** @type {Element | null} */
    this.$debugY = this.$debugY ?? this.$root.querySelector('.app-js-image-y')

    /** @type {Element | null} */
    this.$debugRegion =
      this.$debugRegion ?? this.$root.querySelector('.app-js-image-region')

    /** @type {Element | null} */
    this.$debugInput =
      this.$debugInput ?? this.$root.querySelector('.app-js-image-input code')

    const { $debugX, $debugY, $debugRegion, $debugInput } = this
    if (!$debugInput) {
      return
    }

    $debugInput.innerHTML = JSON.stringify(this.values, undefined, 2)

    if (!$debugX || !$debugY || !$debugRegion) {
      return
    }

    $debugX.innerHTML = point ? `<samp>${point.x}</samp>` : 'N/A'
    $debugY.innerHTML = point ? `<samp>${point.y}</samp>` : 'N/A'

    $debugRegion.innerHTML = $path
      ? `<samp>${$path.classList.value}</samp>`
      : 'N/A'
  }

  /**
   * Show add or edit feature popover
   *
   * @param {BreastFeature} feature
   * @param {string} number
   * @param {'add' | 'edit'} mode
   */
  showPopover(feature, number, mode = 'edit') {
    const { $popover, $captions, $details, $buttons, $radios, $region } = this
    if (!$popover || !$details || !$region) {
      return
    }

    // Show add or edit feature caption
    for (const $caption of $captions) {
      $caption.setAttribute('hidden', '')

      // Show caption with optional feature number
      if ($caption.matches(`.app-js-feature-caption-${mode}`)) {
        if (mode === 'edit') {
          $caption.textContent += ` ${number}`
        }

        $caption.removeAttribute('hidden')
      }
    }

    // Show add, edit, remove or cancel buttons
    for (const $button of $buttons) {
      $button.setAttribute('hidden', '')

      if (
        $button.matches(`.app-js-feature-${mode}`) ||
        $button.matches(`.app-js-feature-cancel`) ||
        ($button.matches(`.app-js-feature-remove`) &&
          feature.id !== FEATURE_ID_PENDING)
      ) {
        $button.removeAttribute('hidden')
      }
    }

    // Click radio for feature being edited
    if (mode === 'edit') {
      $radios
        .filter(($radio) => $radio.value === feature.id)
        .forEach(($radio) => $radio.click())

      // Update custom details text input
      if (feature.id === FEATURE_ID_OTHER && feature.details) {
        $details.value = feature.details
      }
    }

    $popover.dataset.id = feature.id
    $popover.dataset.regionId = feature.region_id
    $popover.dataset.number = number

    $region.textContent = ImageKey.format($popover.dataset.regionId)
    $popover.removeAttribute('hidden')
  }

  /**
   * Handle image map add marker
   *
   * @type {ImageMapListener}
   */
  onCreate(event) {
    const { $radios, markers, values } = this

    const { $path, point } = event.detail
    if (!$path || !point) {
      return
    }

    const value = /** @type {BreastFeature} */ ({
      id: FEATURE_ID_PENDING,
      region_id: $path.classList.value,
      x: point.x,
      y: point.y
    })

    // Save checked (but unsaved) feature when a marker is moved
    const $checked = values.some(({ id }) => id === FEATURE_ID_PENDING)
      ? $radios.find(($radio) => $radio.checked)
      : undefined

    this.onReset()
    this.add(value)
    this.showPopover(value, `${markers.length}`, 'add')

    if ($checked) {
      $checked.checked = true
    }

    this.log(event)
  }

  /**
   * Handle image map edit marker
   *
   * @type {ImageMapListener}
   */
  onEdit(event) {
    const { $popover } = this
    const { target } = event

    if (!$popover || !(target instanceof HTMLButtonElement)) {
      return
    }

    const marker = this.getMarker(target.value)
    const value = this.getValue(marker)

    // Skip unnecessary reset when the same marker is clicked again
    if (!value || $popover.dataset.number === target.value) {
      return
    }

    this.onReset()
    this.showPopover(value, target.value)
  }

  /**
   * Handle image map form clicks
   *
   * @param {MouseEvent} event - Click event
   */
  onClick(event) {
    const { $popover, imageMap, markers } = this
    const { target } = event

    if (
      !(target instanceof HTMLButtonElement) &&
      !(target instanceof HTMLAnchorElement)
    ) {
      return
    }

    // Handle clear all features button
    if (target.matches('.app-js-feature-clear-all')) {
      this.clear()
    }

    // Handle marker links in image key
    if (target.matches('.app-image-marker[href]')) {
      event.preventDefault()

      const href = target.getAttribute('href')
      const marker = markers.find(({ $root }) => !!href && $root.matches(href))

      imageMap.$root.scrollIntoView({ behavior: 'smooth' })
      marker?.$root.click()
    }

    if (!$popover) {
      return
    }

    // Handle form cancel button
    if (target.matches('.app-js-feature-cancel')) {
      imageMap.$root.scrollIntoView({ behavior: 'smooth' })
    }

    // Handle form remove button
    if (target.matches('.app-js-feature-remove')) {
      const marker = this.getMarker($popover.dataset.number)
      this.remove(marker?.point)
    }

    // Handle form save button
    if (target.matches('.app-js-feature-save') && !this.canSubmit()) {
      event.preventDefault()
      imageMap.$root.scrollIntoView({ behavior: 'smooth' })
    }
  }

  /**
   * Handle image map form reset via escape key
   *
   * @param {KeyboardEvent} event - Keydown event
   */
  onKeyDown(event) {
    if (event.key === 'Escape') {
      this.onReset()
    }
  }

  /**
   * Whether form can be submitted (popover is hidden or not populated)
   */
  canSubmit() {
    const { $popover } = this

    return (
      !!$popover?.hasAttribute('hidden') ||
      !$popover?.dataset.id ||
      !$popover.dataset.number ||
      !$popover.dataset.regionId
    )
  }

  /**
   * Handle image map form submit
   *
   * @param {SubmitEvent} event
   */
  onSubmit(event) {
    const { $popover, $details, $radiosFieldset, $radiosLegend, $radios } = this
    if (this.canSubmit()) {
      return
    }

    // Prevent submission when popover is visible
    event.preventDefault()

    // Reset validation errors
    this.onResetValidation()

    // Check for selected feature and custom details
    const $checked = $radios.find(($radio) => $radio.checked)
    const details = $details?.value.trim()

    // Show form validation
    if (!$checked || ($checked.value === FEATURE_ID_OTHER && !details)) {
      this.onResetValidation()

      // Scroll radios legend into view
      $radiosLegend?.scrollIntoView({ behavior: 'smooth' })

      // Invalid: Focus first radio button
      if (!$checked) {
        showError($radiosFieldset, {
          $errorMessage: this.$radiosErrorMessage,
          $formGroup: this.$radiosFormGroup
        })

        $radios[0]?.focus({ preventScroll: true })
        return
      }

      // Invalid: Focus custom details text input
      if ($checked.value === FEATURE_ID_OTHER && !details) {
        showError($details, {
          $errorMessage: this.$detailsErrorMessage,
          $formGroup: this.$detailsFormGroup
        })

        $details?.focus({ preventScroll: true })
        return
      }
    }

    const marker = this.getMarker($popover?.dataset.number)
    const value = this.getValue(marker?.point)
    if (!value) {
      return
    }

    // Set feature ID
    value.id = $checked.value

    // Set custom details (optional)
    if ($checked.value === FEATURE_ID_OTHER && details) {
      value.details = details
    }

    this.onReset()
    this.render()
    this.write()
  }

  /**
   * Handle image map form validation reset
   */
  onResetValidation() {
    const { $details, $radiosFieldset } = this
    if (!$details || !$radiosFieldset) {
      return
    }

    hideError($radiosFieldset, {
      $errorMessage: this.$radiosErrorMessage,
      $formGroup: this.$radiosFormGroup
    })

    hideError($details, {
      $errorMessage: this.$detailsErrorMessage,
      $formGroup: this.$detailsFormGroup
    })
  }

  /**
   * Handle image map form reset
   *
   * @param {Event} [event] - Reset event
   */
  onReset(event) {
    event?.preventDefault()

    const { $popover, $captions, $details, $radios, values } = this
    if (!$popover || !$details) {
      return
    }

    $popover.setAttribute('hidden', '')

    // Reset validation errors
    this.onResetValidation()

    // Remove pending (unsaved) features
    for (const value of values) {
      if (value.id === FEATURE_ID_PENDING) {
        this.remove(value)
      }
    }

    // Remove edit caption feature number
    if ($popover.dataset.id !== FEATURE_ID_PENDING) {
      const $caption = $captions.find(($caption) =>
        $caption.matches('.app-js-feature-caption-edit')
      )

      if ($caption) {
        $caption.textContent = $caption.textContent.replace(/\s\d+$/, '')
      }
    }

    // Click radio to hide custom details text input before reset
    $radios[0].click()
    $radios[0].checked = false

    // Clear custom details text input
    $details.value = ''

    delete $popover.dataset.id
    delete $popover.dataset.regionId
    delete $popover.dataset.number
  }

  /**
   * Get marker for image map
   *
   * @param {number | string} [number] - Image marker number
   */
  getMarker(number) {
    const { markers } = this

    // No number or zero value
    if (!number) {
      return
    }

    return markers.find(
      ({ $root }) => $root.getAttribute('value') === `${number}`
    )
  }

  /**
   * Set marker for image map
   *
   * @param {BreastFeature} feature - Breast feature
   * @param {number} index - Image marker index
   */
  setMarker(feature, index) {
    const { $imageMarker, imageMap, config, markers } = this
    const { x, y, region_id } = feature
    const { width, height } = imageMap

    if (!markers[index]) {
      const { firstElementChild: $root } = document.importNode(
        $imageMarker.content,
        true
      )

      markers[index] = new ImageMarker($root, {
        id: `marker-${index + 1}`,
        value: config.readOnly ? undefined : `${index + 1}`,
        width: width,
        height: height
      })
    }

    const marker = markers[index]
    const point = imageMap.createPoint(x, y, region_id)
    const number = feature.id === FEATURE_ID_PENDING ? '?' : index + 1

    // Set marker position
    marker.setPosition(point, number)

    // Append new markers only
    if (!marker.$root.parentElement) {
      imageMap.$root.appendChild(marker.$root)
    }

    return marker
  }

  /**
   * Get value by pointer coordinates
   *
   * @param {Pick<BreastFeature, 'x' | 'y'> | DOMPoint} [point]
   */
  getValue(point) {
    const { values } = this

    if (!point) {
      return
    }

    return values.find(({ x, y }) => {
      return x === point.x && y === point.y
    })
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-breast-diagram'

  /**
   * Breast diagram default config
   *
   * @see {@link BreastDiagramConfig}
   * @constant
   * @type {BreastDiagramConfig}
   */
  static defaults = Object.freeze({
    debug: false,
    readOnly: false
  })

  /**
   * Breast diagram config schema
   *
   * @constant
   * @satisfies {Schema<BreastDiagramConfig>}
   */
  static schema = Object.freeze({
    properties: {
      debug: { type: 'boolean' },
      readOnly: { type: 'boolean' }
    }
  })
}

/**
 * Accept valid array values only
 *
 * Used as reviver function in `JSON.parse()`
 *
 * @this {unknown}
 * @param {string} key
 * @param {unknown} value
 */
function getArrayValue(key, value) {
  return isValid(value) ||
    isValidObject(value) ||
    (key === '' && Array.isArray(value))
    ? value
    : undefined
}

/**
 * Whether feature object is valid
 *
 * @param {unknown | BreastFeature} value
 * @returns {value is BreastFeature}
 */
function isValidObject(value) {
  if (!isObject(value)) {
    return false
  }

  const keys = new Set(['id', 'details', 'region_id', 'x', 'y'])

  return (
    Object.keys(value).every((key) => keys.has(key)) &&
    typeof value.id === 'string' &&
    (typeof value.details === 'string' || !('details' in value)) &&
    typeof value.region_id === 'string' &&
    typeof value.x === 'number' &&
    typeof value.y === 'number'
  )
}

/**
 * Whether feature nested value is valid
 *
 * @param {unknown} value
 */
function isValid(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Show error on input or fieldset
 *
 * @param {HTMLElement | null} $element - Input or fieldset
 * @param {{ $formGroup: HTMLElement | null, $errorMessage: HTMLElement | null }} options
 */
function showError($element, { $errorMessage, $formGroup }) {
  let describedBy = $element?.getAttribute('aria-describedby')

  if (
    !$element ||
    !$errorMessage ||
    !$formGroup ||
    describedBy?.includes($errorMessage.id)
  ) {
    return
  }

  // Update description to add error
  describedBy ??= ''
  describedBy = `${describedBy} ${$errorMessage.id}`

  // Set new description
  $element.setAttribute('aria-describedby', describedBy)

  // Add error border to form group
  $formGroup.classList.add('nhsuk-form-group--error')

  // Add error border to input (optional)
  if ($element instanceof HTMLInputElement) {
    $element.classList.add('nhsuk-input--error')
  }

  // Show error message until next validation
  $errorMessage.removeAttribute('hidden')
}

/**
 * Hide error on input or fieldset
 *
 * @param {HTMLElement | null} $element - Input or fieldset
 * @param {{ $formGroup: HTMLElement | null, $errorMessage: HTMLElement | null }} options
 */
function hideError($element, { $errorMessage, $formGroup }) {
  let describedBy = $element?.getAttribute('aria-describedby')

  if (
    !$element ||
    !$errorMessage ||
    !$formGroup ||
    !describedBy?.includes($errorMessage.id)
  ) {
    return
  }

  // Update description to remove error
  describedBy = describedBy.replace($errorMessage.id, '').trim()

  // Set new description or remove if empty
  if (describedBy) {
    $element.setAttribute('aria-describedby', describedBy)
  } else {
    $element.removeAttribute('aria-describedby')
  }

  // Remove error border from form group
  $formGroup.classList.remove('nhsuk-form-group--error')

  // Remove error border from input (optional)
  if ($element instanceof HTMLInputElement) {
    $element.classList.remove('nhsuk-input--error')
  }

  // Hide error message until next validation
  $errorMessage.setAttribute('hidden', '')
}

/**
 * Breast diagram config
 *
 * @see {@link BreastDiagram.defaults}
 * @typedef {object} BreastDiagramConfig
 * @property {boolean} debug - Whether to show debug information
 * @property {boolean} readOnly - Whether image map is read only
 */

/**
 * Breast feature input value
 *
 * @typedef {object} BreastFeature
 * @property {string} id - Breast feature ID
 * @property {string} [details] - Custom details (optional)
 * @property {string} region_id - Image map region ID
 * @property {number} x - X coordinate of breast feature
 * @property {number} y - Y coordinate of breast feature
 */

/**
 * @import { Schema } from 'nhsuk-frontend'
 * @import { ImageMapPayload, ImageMapListener } from '../image-map/image-map.js'
 */
