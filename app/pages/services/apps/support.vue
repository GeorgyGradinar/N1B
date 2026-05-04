<template>
  <ServiceDetailPage
    category-id="apps"
    sub-key="support"
    :service-num="2"
    :content="content"
    :comparison="comparison"
    :calculator="calculator"
    :faq-items="faqItems"
  />
</template>

<script setup lang="ts">
import { supportCalculatorConfig } from '~/config/supportCalculator'

const { get } = useAppI18n()

const content = computed(() => {
  const c = get<Record<string, any>>('servicesTree.apps.supportContent')
  return c && typeof c === 'object' ? c : null
})

const comparison = computed(() => {
  const data = get<any>('servicesTree.apps.supportComparison')
  return data?.custom && data?.offshelf
    ? { shape: 'pros-cons' as const, data, leftKey: 'custom', rightKey: 'offshelf' }
    : null
})

const faqItems = computed(() => {
  const faq = get<Array<{ q: string; a: string }>>('servicesTree.apps.supportFaq')
  return Array.isArray(faq) ? faq : []
})

const calculator = computed(() => {
  const labels = get<Record<string, string>>('servicesTree.apps.supportCalculator')
  return { config: supportCalculatorConfig, labels: labels && typeof labels === 'object' ? labels : {} }
})
</script>
