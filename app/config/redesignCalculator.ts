import type { CalculatorGroup } from './landingCalculator'

export const redesignCalculatorConfig = {
  basePrice: 300,
  groups: [
    {
      id: 'scope',
      type: 'radio',
      labelKey: 'scope',
      options: [
        { value: 'scopeVisual', labelKey: 'scopeVisual', price: 0 },
        { value: 'scopeFull', labelKey: 'scopeFull', price: 500 },
        { value: 'scopeRebuild', labelKey: 'scopeRebuild', price: 1200 }
      ]
    },
    {
      id: 'design',
      type: 'radio',
      labelKey: 'design',
      options: [
        { value: 'designStandard', labelKey: 'designStandard', price: 0 },
        { value: 'designCustom', labelKey: 'designCustom', price: 400 }
      ]
    },
    {
      id: 'extra',
      type: 'checkbox',
      labelKey: 'extra',
      options: [
        { value: 'extraMobile', labelKey: 'extraMobile', price: 200 },
        { value: 'extraSpeed', labelKey: 'extraSpeed', price: 200 },
        { value: 'extraAnalytics', labelKey: 'extraAnalytics', price: 50 }
      ]
    },
    {
      id: 'languages',
      type: 'checkbox',
      labelKey: 'languages',
      options: [
        { value: 'langEn', labelKey: 'langEn', price: 150 },
        { value: 'langKa', labelKey: 'langKa', price: 150 },
        { value: 'langUk', labelKey: 'langUk', price: 150 },
        { value: 'langRu', labelKey: 'langRu', price: 150 },
        { value: 'langDe', labelKey: 'langDe', price: 150 },
        { value: 'langFr', labelKey: 'langFr', price: 150 },
        { value: 'langEs', labelKey: 'langEs', price: 150 },
        { value: 'langIt', labelKey: 'langIt', price: 150 },
        { value: 'langAr', labelKey: 'langAr', price: 150 },
        { value: 'langZh', labelKey: 'langZh', price: 150 },
        { value: 'langTr', labelKey: 'langTr', price: 150 }
      ]
    },
    {
      id: 'timeline',
      type: 'radio',
      labelKey: 'timeline',
      options: [
        { value: 'timelineStandard', labelKey: 'timelineStandard', price: 0 },
        { value: 'timelineUrgent', labelKey: 'timelineUrgent', price: 200, multiplier: 1.25 }
      ]
    }
  ] as CalculatorGroup[]
}
