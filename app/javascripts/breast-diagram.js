import {
  createAll,
  isObject,
  Component,
  ElementError
} from '/nhsuk-frontend/nhsuk-frontend.min.js'
import { ImageMap } from './image-map.js'

/**
 * Breast diagram component
 *
 * @augments {Component<HTMLFormElement>}
 */
export class BreastDiagram extends Component {
  static elementType = HTMLFormElement

  /**
   * @type {HTMLInputElement}
   */
  $input

  /**
   * @type {BreastFeatureValue[] | null}
   */
  values = null

  /**
   * @param {Element | null} $root - HTML element to use for component
   */
  constructor($root) {
    super($root)

    const $input = this.$root.querySelector('input[name="features"]')
    if (!($input instanceof HTMLInputElement)) {
      throw new ElementError({
        component: BreastDiagram,
        element: $input,
        expectedType: 'HTMLInputElement',
        identifier: 'Breast diagram feature values (`input[name="features"]`)'
      })
    }

    this.$input = $input

    const [$imageMap] = createAll(
      ImageMap,
      {
        selectors: [
          '.app-breast-diagram__regions path',
          '.app-breast-diagram__regions polygon'
        ]
      },
      { scope: this.$root }
    )

    if (!$imageMap) {
      throw new ElementError({
        component: BreastDiagram,
        identifier: `Image map (\`[data-module="${ImageMap.moduleName}"]\`)`
      })
    }

    this.$imageMap = $imageMap
    this.$imageMap.onUpdate = this.onUpdate.bind(this)

    // Render diagram features
    this.render()
    this.debug()
  }

  /**
   * Get diagram features
   */
  get features() {
    if (!this.values) {
      try {
        this.values ??= /** @type {BreastFeatureValue[]} */ (
          JSON.parse(decodeURIComponent(this.$input.value), getArrayValue) ?? []
        )
      } catch {
        throw new ElementError({
          component: BreastDiagram,
          identifier: 'Breast diagram feature JSON (`input[name="features"]`)'
        })
      }
    }

    return this.values
      .map(({ id, name, x, y }) => {
        const $path = this.$imageMap.getPathById(id)
        const point = this.$imageMap.createPoint(x, y, id)
        return { name, region: this.$imageMap.createRegion($path, point) }
      })
      .filter(
        /** @returns {feature is BreastFeature} */
        (feature) => !!feature.region
      )
  }

  /**
   * Render diagram features
   */
  render() {
    for (const feature of this.features) {
      this.$imageMap.setState('active', feature.region, null)
    }
  }

  /**
   * Write diagram features to hidden input
   */
  write() {
    this.$input.value = JSON.stringify(this.values ?? [])
      .replaceAll('<', '\\u003c')
      .replaceAll('>', '\\u003e')
      .replaceAll('&', '\\u0026')
      .replaceAll("'", '\\u0027')
  }

  /**
   * Update status messages
   *
   * @param {Partial<ImageMapRegion>} [region] - Image map region
   */
  debug({ point, label } = {}) {
    /** @type {Element | null} */
    this.$debugX = this.$debugX ?? this.$root.querySelector('.app-js-image-x')

    /** @type {Element | null} */
    this.$debugY = this.$debugY ?? this.$root.querySelector('.app-js-image-y')

    /** @type {Element | null} */
    this.$debugRegion =
      this.$debugRegion ?? this.$root.querySelector('.app-js-image-region')

    /** @type {Element | null} */
    this.$debugInput =
      this.$debugInput ?? this.$root.querySelector('.app-js-image-input')

    const { $debugX, $debugY, $debugRegion, $debugInput } = this
    if (!$debugX || !$debugY || !$debugRegion || !$debugInput) {
      return
    }

    $debugX.textContent = point?.x.toString() ?? 'N/A'
    $debugY.textContent = point?.y.toString() ?? 'N/A'
    $debugRegion.textContent = label ?? 'N/A'
    $debugInput.textContent =
      this.values?.map(({ id }) => id).join(', ') || 'N/A'
  }

  /**
   * Update form inputs
   *
   * @param {ImageMapState} state - State to set, e.g. 'highlight'
   * @param {ImageMapRegion} [region] - Image map region
   */
  onUpdate(state, region) {
    this.debug(region)

    if (!region) {
      return
    }

    switch (state) {
      case 'active':
        this.values ??= []
        this.values.push({
          id: region.id,
          name: 'Pending',
          x: region.point.x,
          y: region.point.y
        })

        this.write()
        this.debug(region)

        break
    }
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-breast-diagram'
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
 * @param {unknown | BreastFeatureValue} value
 * @returns {value is BreastFeatureValue}
 */
function isValidObject(value) {
  if (!isObject(value)) {
    return false
  }

  return (
    Object.keys(value).every((key) => ['id', 'name', 'x', 'y'].includes(key)) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
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
 * Breast feature with image map region
 *
 * @typedef {object} BreastFeature
 * @property {string} name - Breast feature name
 * @property {ImageMapRegion} region - Image map region
 */

/**
 * Breast feature input value
 *
 * @typedef {object} BreastFeatureValue
 * @property {string} id - Image map region ID
 * @property {string} name - Breast feature name
 * @property {number} x - X coordinate of breast feature
 * @property {number} y - Y coordinate of breast feature
 */

/**
 * @import { ImageMapRegion, ImageMapState } from './image-map.js'
 */
