export interface CalculatorOption {
  value: string
  labelKey: string
  price?: number
  multiplier?: number
}

export interface CalculatorGroup {
  id: string
  type: 'radio' | 'checkbox'
  labelKey: string
  options: CalculatorOption[]
}

export const landingCalculatorConfig = {
  basePrice: 800,
  groups: [
    {
      id: 'designType',
      type: 'radio',
      labelKey: 'designType',
      options: [
        { value: 'designTemplate', labelKey: 'designTemplate', price: 0 },
        { value: 'designIndividual', labelKey: 'designIndividual', price: 400 }
      ]
    },
    {
      id: 'copywriting',
      type: 'radio',
      labelKey: 'copywriting',
      options: [
        { value: 'copyClient', labelKey: 'copyClient', price: 0 },
        { value: 'copySales', labelKey: 'copySales', price: 200 }
      ]
    },
    {
      id: 'extra',
      type: 'checkbox',
      labelKey: 'extra',
      options: [
        { value: 'extraCalculator', labelKey: 'extraCalculator', price: 150 },
        { value: 'extraChat', labelKey: 'extraChat', price: 100 },
        { value: 'extraCrm', labelKey: 'extraCrm', price: 200 },
        { value: 'extraPayment', labelKey: 'extraPayment', price: 250 },
        { value: 'extraMultilang', labelKey: 'extraMultilang', price: 150 },
        { value: 'extraAi', labelKey: 'extraAi', price: 300 }
      ]
    },
    {
      id: 'animations',
      type: 'radio',
      labelKey: 'animations',
      options: [
        { value: 'animNone', labelKey: 'animNone', price: 0 },
        { value: 'animLight', labelKey: 'animLight', price: 80 },
        { value: 'animAdvanced', labelKey: 'animAdvanced', price: 200 }
      ]
    },
    {
      id: 'timeline',
      type: 'radio',
      labelKey: 'timeline',
      options: [
        { value: 'timelineStandard', labelKey: 'timelineStandard', price: 0 },
        { value: 'timelineUrgent', labelKey: 'timelineUrgent', price: 150, multiplier: 1.2 }
      ]
    },
    {
      id: 'analytics',
      type: 'checkbox',
      labelKey: 'analytics',
      options: [
        { value: 'analyticsGa', labelKey: 'analyticsGa', price: 50 },
        { value: 'analyticsPixel', labelKey: 'analyticsPixel', price: 80 },
        { value: 'analyticsAds', labelKey: 'analyticsAds', price: 100 }
      ]
    }
  ] as CalculatorGroup[]
}
