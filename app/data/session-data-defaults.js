/* eslint-disable no-loss-of-precision */

export const sessionDataDefaults = {
  debug: true,

  /**
   * Pre-populated breast features
   *
   * @type {BreastFeature[]}
   */
  features: [
    {
      id: 'mole',
      region_id: 'right_upper_outer',
      x: 133.47036743164062,
      y: 82.14178466796875
    },
    {
      id: 'wart',
      region_id: 'right_medial_infraclavicular',
      x: 336.2579040527344,
      y: 59.039405822753906
    },
    {
      id: 'scar',
      region_id: 'left_upper_inner',
      x: 488.9902648925781,
      y: 164.2835693359375
    },
    {
      id: 'bruising_or_trauma',
      region_id: 'left_lower_central',
      x: 562.1478271484375,
      y: 305.4647521972656
    },
    {
      id: 'other_feature',
      region_id: 'left_lateral_upper_abdominal_wall',
      x: 741.8329467773438,
      y: 300.3309020996094
    }
  ]
}

/**
 * @import { BreastFeature } from '../views/components/breast-diagram/breast-diagram.js'
 */
