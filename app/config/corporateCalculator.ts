import type { CalculatorGroup } from './landingCalculator'

export const corporateCalculatorConfig = {
  basePrice: 3000,
  groups: [
    {
      id: 'appType',
      type: 'radio',
      labelKey: 'appType',
      options: [
        { value: 'appSimple', labelKey: 'appSimple', price: 0 },
        { value: 'appMedium', labelKey: 'appMedium', price: 2000 },
        { value: 'appComplex', labelKey: 'appComplex', price: 5000 }
      ]
    },
    {
      id: 'users',
      type: 'radio',
      labelKey: 'users',
      options: [
        { value: 'usersSmall', labelKey: 'usersSmall', price: 0 },
        { value: 'usersMedium', labelKey: 'usersMedium', price: 500 },
        { value: 'usersLarge', labelKey: 'usersLarge', price: 1200 }
      ]
    },
    {
      id: 'design',
      type: 'radio',
      labelKey: 'design',
      options: [
        { value: 'designStandard', labelKey: 'designStandard', price: 0 },
        { value: 'designCustom', labelKey: 'designCustom', price: 1500 }
      ]
    },
    {
      id: 'integrations',
      type: 'checkbox',
      labelKey: 'integrations',
      options: [
        { value: 'integrationsCrm', labelKey: 'integrationsCrm', price: 400 },
        { value: 'integrations1c', labelKey: 'integrations1c', price: 600 },
        { value: 'integrationsEmail', labelKey: 'integrationsEmail', price: 200 },
        { value: 'integrationsMessenger', labelKey: 'integrationsMessenger', price: 300 },
        { value: 'integrationsPayment', labelKey: 'integrationsPayment', price: 500 },
        { value: 'integrationsApi', labelKey: 'integrationsApi', price: 350 }
      ]
    },
    {
      id: 'extra',
      type: 'checkbox',
      labelKey: 'extra',
      options: [
        { value: 'extraRoles', labelKey: 'extraRoles', price: 400 },
        { value: 'extraDashboard', labelKey: 'extraDashboard', price: 500 },
        { value: 'extraMobile', labelKey: 'extraMobile', price: 600 },
        { value: 'extraAi', labelKey: 'extraAi', price: 800 },
        { value: 'extraNotifications', labelKey: 'extraNotifications', price: 250 }
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
