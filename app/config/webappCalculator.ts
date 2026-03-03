import type { CalculatorGroup } from './landingCalculator'

export const webappCalculatorConfig = {
  basePrice: 5000,
  groups: [
    {
      id: 'appType',
      type: 'radio',
      labelKey: 'appType',
      options: [
        { value: 'appMvp', labelKey: 'appMvp', price: 0 },
        { value: 'appStandard', labelKey: 'appStandard', price: 4000 },
        { value: 'appComplex', labelKey: 'appComplex', price: 10000 }
      ]
    },
    {
      id: 'users',
      type: 'radio',
      labelKey: 'users',
      options: [
        { value: 'usersSmall', labelKey: 'usersSmall', price: 0 },
        { value: 'usersMedium', labelKey: 'usersMedium', price: 800 },
        { value: 'usersLarge', labelKey: 'usersLarge', price: 2000 }
      ]
    },
    {
      id: 'auth',
      type: 'radio',
      labelKey: 'auth',
      options: [
        { value: 'authBasic', labelKey: 'authBasic', price: 0 },
        { value: 'authSocial', labelKey: 'authSocial', price: 400 },
        { value: 'authSso', labelKey: 'authSso', price: 800 }
      ]
    },
    {
      id: 'design',
      type: 'radio',
      labelKey: 'design',
      options: [
        { value: 'designUiKit', labelKey: 'designUiKit', price: 0 },
        { value: 'designCustom', labelKey: 'designCustom', price: 2000 }
      ]
    },
    {
      id: 'features',
      type: 'checkbox',
      labelKey: 'features',
      options: [
        { value: 'featuresRealtime', labelKey: 'featuresRealtime', price: 600 },
        { value: 'featuresPayments', labelKey: 'featuresPayments', price: 700 },
        { value: 'featuresFileStorage', labelKey: 'featuresFileStorage', price: 400 },
        { value: 'featuresAnalytics', labelKey: 'featuresAnalytics', price: 500 },
        { value: 'featuresApi', labelKey: 'featuresApi', price: 500 },
        { value: 'featuresAi', labelKey: 'featuresAi', price: 1000 },
        { value: 'featuresNotifications', labelKey: 'featuresNotifications', price: 300 },
        { value: 'featuresMultilang', labelKey: 'featuresMultilang', price: 400 }
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
