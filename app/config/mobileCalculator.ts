import type { CalculatorGroup } from './landingCalculator'

export const mobileCalculatorConfig = {
  basePrice: 0,
  minPrice: 10000,
  groups: [
    {
      id: 'platform',
      type: 'radio',
      labelKey: 'platform',
      options: [
        { value: 'platformCross', labelKey: 'platformCross', price: 6000 },
        { value: 'platformIos', labelKey: 'platformIos', price: 5000 },
        { value: 'platformAndroid', labelKey: 'platformAndroid', price: 5000 },
        { value: 'platformBoth', labelKey: 'platformBoth', price: 20000 }
      ]
    },
    {
      id: 'complexity',
      type: 'radio',
      labelKey: 'complexity',
      options: [
        { value: 'complexitySimple', labelKey: 'complexitySimple', price: 0, multiplier: 1.25 },
        { value: 'complexityMedium', labelKey: 'complexityMedium', price: 0, multiplier: 1.85 },
        { value: 'complexityComplex', labelKey: 'complexityComplex', price: 0, multiplier: 3 }
      ]
    },
    {
      id: 'design',
      type: 'radio',
      labelKey: 'design',
      options: [
        { value: 'designStandard', labelKey: 'designStandard', price: 0 },
        { value: 'designCustom', labelKey: 'designCustom', price: 3000 }
      ]
    },
    {
      id: 'integrations',
      type: 'checkbox',
      labelKey: 'integrations',
      options: [
        { value: 'integrationsPayment', labelKey: 'integrationsPayment', price: 3000 },
        { value: 'integrationsAnalytics', labelKey: 'integrationsAnalytics', price: 1500 },
        { value: 'integrationsSocial', labelKey: 'integrationsSocial', price: 1000 },
        { value: 'integrationsBackendNew', labelKey: 'integrationsBackendNew', price: 4000 },
        { value: 'integrationsBackendAdmin', labelKey: 'integrationsBackendAdmin', price: 2500 },
        { value: 'integrationsBackendRealtime', labelKey: 'integrationsBackendRealtime', price: 3000 }
      ]
    },
    {
      id: 'timeline',
      type: 'radio',
      labelKey: 'timeline',
      options: [
        { value: 'timelineStandard', labelKey: 'timelineStandard', price: 0 },
        { value: 'timelineUrgent', labelKey: 'timelineUrgent', price: 0, multiplier: 1.3 }
      ]
    }
  ] as CalculatorGroup[]
}
