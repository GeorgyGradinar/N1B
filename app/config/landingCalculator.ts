export interface CalculatorOption {
  value: string
  labelKey: string
  price?: number
  multiplier?: number
  tooltipKey?: string
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
        { value: 'designAi', labelKey: 'designAi', price: 30, tooltipKey: 'designAiTooltip' },
        { value: 'designIndividual', labelKey: 'designIndividual', price: 250, tooltipKey: 'designIndividualTooltip' }
      ]
    },
    {
      id: 'copywriting',
      type: 'radio',
      labelKey: 'copywriting',
      options: [
        { value: 'copyClient', labelKey: 'copyClient', price: 0 },
        { value: 'copySales', labelKey: 'copySales', price: 50 }
      ]
    },
    {
      id: 'extra',
      type: 'checkbox',
      labelKey: 'extra',
      options: [
        { value: 'extraCalculator', labelKey: 'extraCalculator', price: 100 },
        { value: 'extraChat', labelKey: 'extraChat', price: 100, tooltipKey: 'extraChatTooltip' },
        { value: 'extraCrm', labelKey: 'extraCrm', price: 200 },
        { value: 'extraPayment', labelKey: 'extraPayment', price: 150 },
        { value: 'extraAi', labelKey: 'extraAi', price: 300, tooltipKey: 'extraAiTooltip' }
      ]
    },
    {
      id: 'languages',
      type: 'checkbox',
      labelKey: 'languages',
      options: [
        { value: 'langEn', labelKey: 'langEn', price: 150 },
        { value: 'langKa', labelKey: 'langKa', price: 150 },
        { value: 'langRu', labelKey: 'langRu', price: 150 },
        { value: 'langDe', labelKey: 'langDe', price: 150 },
        { value: 'langFr', labelKey: 'langFr', price: 150 },
        { value: 'langEs', labelKey: 'langEs', price: 150 },
        { value: 'langIt', labelKey: 'langIt', price: 150 },
        { value: 'langAr', labelKey: 'langAr', price: 150 },
        { value: 'langZh', labelKey: 'langZh', price: 150 },
        { value: 'langTr', labelKey: 'langTr', price: 150 },
        { value: 'langUk', labelKey: 'langUk', price: 150 }
      ]
    },
    {
      id: 'animations',
      type: 'radio',
      labelKey: 'animations',
      options: [
        { value: 'animNone', labelKey: 'animNone', price: 0 },
        { value: 'animLight', labelKey: 'animLight', price: 0 },
        { value: 'animAdvanced', labelKey: 'animAdvanced', price: 100 },
        { value: 'anim3d', labelKey: 'anim3d', price: 800 }
      ]
    },
    {
      id: 'timeline',
      type: 'radio',
      labelKey: 'timeline',
      options: [
        { value: 'timelineStandard', labelKey: 'timelineStandard', price: 0 },
        { value: 'timelineUrgent', labelKey: 'timelineUrgent', price: 150, multiplier: 1.3 }
      ]
    },
    {
      id: 'analytics',
      type: 'checkbox',
      labelKey: 'analytics',
      options: [
        { value: 'analyticsGa', labelKey: 'analyticsGa', price: 100 },
        { value: 'analyticsPixel', labelKey: 'analyticsPixel', price: 100 },
        { value: 'analyticsAds', labelKey: 'analyticsAds', price: 200 }
      ]
    }
  ] as CalculatorGroup[]
}
