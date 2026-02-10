import {
  createAll,
  Component,
  ElementError
} from '/nhsuk-frontend/nhsuk-frontend.min.js'
import { ImageMap } from './image-map.js'

/**
 * Breast diagram component
 */
export class BreastDiagram extends Component {
  /**
   * @param {Element | null} $root - HTML element to use for component
   */
  constructor($root) {
    super($root)

    const $input = this.$root.querySelector('input[name="region"]')
    if (!($input instanceof HTMLInputElement)) {
      throw new ElementError({
        component: BreastDiagram,
        element: $input,
        expectedType: 'HTMLInputElement',
        identifier: 'Breast diagram region (`input[name="region"]`)'
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
    this.$imageMap.onState = this.onState.bind(this)

    // Init from saved input value
    if (this.$input.value) {
      const $pathActive = this.$root.querySelector(`.${this.$input.value}`)
      if (
        !(
          $pathActive instanceof SVGPathElement ||
          $pathActive instanceof SVGPolygonElement
        )
      ) {
        return
      }

      // Save active region
      $imageMap.setState('active', $imageMap.getRegion($pathActive))
    }
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
    $debugInput.textContent = this.$input.value || 'N/A'
  }

  /**
   * Update form inputs
   *
   * @param {ImageMapState} state - State to set, e.g. 'highlight'
   * @param {ImageMapRegion | undefined} [region] - Image map region
   */
  onState(state, region) {
    switch (state) {
      case 'active':
        this.$input.setAttribute('value', region?.id ?? '')
        break
    }

    this.debug(region)
  }

  /**
   * Name for the component used when initialising using data-module attributes
   */
  static moduleName = 'app-breast-diagram'
}

/**
 * @import { ImageMapRegion, ImageMapState } from './image-map.js'
 */
