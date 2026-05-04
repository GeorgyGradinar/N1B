<template>
  <ServiceDetailPage
    category-id="sites"
    sub-key="landing"
    :service-num="1"
    :content="content"
    :comparison="comparison"
    :calculator="calculator"
    :faq-items="faqItems"
  />
</template>

<script setup lang="ts">
import { landingCalculatorConfig } from '~/config/landingCalculator'

const { get } = useAppI18n()

const content = computed(() => {
  const c = get<Record<string, any>>('servicesTree.sites.landingContent')
  return c && typeof c === 'object' ? c : null
})

const comparison = computed(() => {
  const data = get<any>('servicesTree.sites.landingComparison')
  return data?.landing && data?.multipage
    ? { shape: 'pros-cons' as const, data, leftKey: 'landing', rightKey: 'multipage' }
    : null
})

const faqItems = computed(() => {
  const faq = get<Array<{ q: string; a: string }>>('servicesTree.sites.landingFaq')
  return Array.isArray(faq) ? faq : []
})

const calculator = computed(() => {
  const labels = get<Record<string, string>>('servicesTree.sites.landingCalculator')
  return { config: landingCalculatorConfig, labels: labels && typeof labels === 'object' ? labels : {} }
})
</script>
