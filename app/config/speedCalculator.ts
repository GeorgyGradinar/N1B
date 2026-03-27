import type { CalculatorGroup } from './landingCalculator'

export const speedCalculatorConfig = {
  basePrice: 150,
  groups: [
    {
      id: 'audit',
      type: 'radio',
      labelKey: 'audit',
      options: [
        { value: 'auditExpress', labelKey: 'auditExpress', price: 0 },
        { value: 'auditFull', labelKey: 'auditFull', price: 150 },
        { value: 'auditFullSeo', labelKey: 'auditFullSeo', price: 250 }
      ]
    },
    {
      id: 'scope',
      type: 'radio',
      labelKey: 'scope',
      options: [
        { value: 'scopeSpeed', labelKey: 'scopeSpeed', price: 500 },
        { value: 'scopeSeo', labelKey: 'scopeSeo', price: 200 },
        { value: 'scopeBoth', labelKey: 'scopeBoth', price: 600 }
      ]
    },
    {
      id: 'extra',
      type: 'checkbox',
      labelKey: 'extra',
      options: [
        { value: 'extraCwv', labelKey: 'extraCwv', price: 30 },
        { value: 'extraCdn', labelKey: 'extraCdn', price: 200 },
        { value: 'extraCaching', labelKey: 'extraCaching', price: 80 }
      ]
    },
    {
      id: 'timeline',
      type: 'radio',
      labelKey: 'timeline',
      options: [
        { value: 'timelineStandard', labelKey: 'timelineStandard', price: 0 },
        { value: 'timelineUrgent', labelKey: 'timelineUrgent', price: 100, multiplier: 1.2 }
      ]
    }
  ] as CalculatorGroup[]
}
