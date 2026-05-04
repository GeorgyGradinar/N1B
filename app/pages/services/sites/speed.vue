<template>
  <ServiceDetailPage
    category-id="sites"
    sub-key="speed"
    :service-num="1"
    :content="content"
    :comparison="comparison"
    :calculator="calculator"
    :faq-items="faqItems"
  />
</template>

<script setup lang="ts">
import { speedCalculatorConfig } from '~/config/speedCalculator'

const { get } = useAppI18n()

const content = computed(() => {
  const c = get<Record<string, any>>('servicesTree.sites.speedContent')
  return c && typeof c === 'object' ? c : null
})

const comparison = computed(() => {
  const data = get<any>('servicesTree.sites.speedComparison')
  return data?.features && Array.isArray(data.features)
    ? { shape: 'feature-matrix' as const, data, highlightCol: 2 }
    : null
})

const faqItems = computed(() => {
  const faq = get<Array<{ q: string; a: string }>>('servicesTree.sites.speedFaq')
  return Array.isArray(faq) ? faq : []
})

const calculator = computed(() => {
  const labels = get<Record<string, string>>('servicesTree.sites.speedCalculator')
  return { config: speedCalculatorConfig, labels: labels && typeof labels === 'object' ? labels : {} }
})
</script>
