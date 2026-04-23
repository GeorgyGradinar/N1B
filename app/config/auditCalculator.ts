import type { CalculatorGroup } from './landingCalculator'

export const auditCalculatorConfig = {
  basePrice: 100,
  groups: [
    {
      id: 'scope',
      type: 'radio',
      labelKey: 'scope',
      options: [
        { value: 'scopeSmall', labelKey: 'scopeSmall', price: 0 },
        { value: 'scopeMedium', labelKey: 'scopeMedium', price: 100 },
        { value: 'scopeLarge', labelKey: 'scopeLarge', price: 250 }
      ]
    },
    {
      id: 'checks',
      type: 'checkbox',
      labelKey: 'checks',
      options: [
        { value: 'checksSeo', labelKey: 'checksSeo', price: 80 },
        { value: 'checksSecurity', labelKey: 'checksSecurity', price: 120 },
        { value: 'checksA11y', labelKey: 'checksA11y', price: 60 },
        { value: 'checksCode', labelKey: 'checksCode', price: 150 }
      ]
    },
    {
      id: 'report',
      type: 'radio',
      labelKey: 'report',
      options: [
        { value: 'reportBrief', labelKey: 'reportBrief', price: 0 },
        { value: 'reportDetailed', labelKey: 'reportDetailed', price: 80 },
        { value: 'reportFull', labelKey: 'reportFull', price: 180 }
      ]
    },
    {
      id: 'timeline',
      type: 'radio',
      labelKey: 'timeline',
      options: [
        { value: 'timelineStandard', labelKey: 'timelineStandard', price: 0 },
        { value: 'timelineUrgent', labelKey: 'timelineUrgent', price: 50, multiplier: 1.3 }
      ]
    }
  ] as CalculatorGroup[]
}
