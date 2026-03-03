import type { CalculatorGroup } from './landingCalculator'

export const redesignCalculatorConfig = {
  basePrice: 600,
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
      id: 'pages',
      type: 'radio',
      labelKey: 'pages',
      options: [
        { value: 'pagesSmall', labelKey: 'pagesSmall', price: 0 },
        { value: 'pagesMedium', labelKey: 'pagesMedium', price: 300 },
        { value: 'pagesLarge', labelKey: 'pagesLarge', price: 700 }
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
        { value: 'extraMigration', labelKey: 'extraMigration', price: 200 },
        { value: 'extraSeo', labelKey: 'extraSeo', price: 150 },
        { value: 'extraMobile', labelKey: 'extraMobile', price: 100 },
        { value: 'extraSpeed', labelKey: 'extraSpeed', price: 150 },
        { value: 'extraAnalytics', labelKey: 'extraAnalytics', price: 80 },
        { value: 'extraCrm', labelKey: 'extraCrm', price: 200 },
        { value: 'extraMultilang', labelKey: 'extraMultilang', price: 150 }
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
