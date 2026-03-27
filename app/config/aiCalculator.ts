import type { CalculatorGroup } from './landingCalculator'

export const aiCalculatorConfig = {
  basePrice: 500,
  groups: [
    {
      id: 'baseType',
      type: 'radio' as const,
      labelKey: 'baseType',
      options: [
        { value: 'baseExisting', labelKey: 'baseExisting', price: 0 },
        { value: 'baseNew', labelKey: 'baseNew', price: 800 }
      ]
    },
    {
      id: 'chatbotType',
      type: 'radio' as const,
      labelKey: 'chatbotType',
      options: [
        { value: 'chatbotSimple', labelKey: 'chatbotSimple', price: 400 },
        { value: 'chatbotCustom', labelKey: 'chatbotCustom', price: 900 },
        { value: 'chatbotAdvanced', labelKey: 'chatbotAdvanced', price: 1800 }
      ]
    },
    {
      id: 'extra',
      type: 'checkbox' as const,
      labelKey: 'extra',
      options: [
        { value: 'extraKnowledge', labelKey: 'extraKnowledge', price: 200 },
        { value: 'extraCrm', labelKey: 'extraCrm', price: 300 },
        { value: 'extraRecommendations', labelKey: 'extraRecommendations', price: 400 },
        { value: 'extraContentGen', labelKey: 'extraContentGen', price: 350 },
        { value: 'extraMultilang', labelKey: 'extraMultilang', price: 150 }
      ]
    }
  ] as CalculatorGroup[]
}
