import type { CalculatorGroup } from './landingCalculator'

export const supportCalculatorConfig = {
  basePrice: 0,
  minPrice: 1800,
  groups: [
    {
      id: 'coverage',
      type: 'radio',
      labelKey: 'coverage',
      options: [
        { value: 'coverageFrontend', labelKey: 'coverageFrontend', price: 0, multiplier: 1 },
        { value: 'coverageBackend', labelKey: 'coverageBackend', price: 0, multiplier: 1.15 },
        { value: 'coverageFullstack', labelKey: 'coverageFullstack', price: 0, multiplier: 1.4 }
      ]
    },
    {
      id: 'hours',
      type: 'radio',
      labelKey: 'hours',
      options: [
        { value: 'hours10', labelKey: 'hours10', price: 1800 },
        { value: 'hours20', labelKey: 'hours20', price: 3200 },
        { value: 'hours40', labelKey: 'hours40', price: 5800 }
      ]
    },
    {
      id: 'sla',
      type: 'radio',
      labelKey: 'sla',
      options: [
        { value: 'slaStandard', labelKey: 'slaStandard', price: 0 },
        { value: 'slaPriority', labelKey: 'slaPriority', price: 800 },
        { value: 'slaCritical', labelKey: 'slaCritical', price: 1800 }
      ]
    },
    {
      id: 'extras',
      type: 'checkbox',
      labelKey: 'extras',
      options: [
        { value: 'extrasDatabase', labelKey: 'extrasDatabase', price: 1200 },
        { value: 'extrasDevops', labelKey: 'extrasDevops', price: 1500 },
        { value: 'extrasSecurity', labelKey: 'extrasSecurity', price: 1000 },
        { value: 'extrasReporting', labelKey: 'extrasReporting', price: 500 }
      ]
    }
  ] as CalculatorGroup[]
}
