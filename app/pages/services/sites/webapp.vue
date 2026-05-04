<template>
  <ServiceDetailPage
    category-id="sites"
    sub-key="webapp"
    :service-num="1"
    :content="content"
    :comparison="comparison"
    :calculator="calculator"
    :faq-items="faqItems"
  />
</template>

<script setup lang="ts">
import { webappCalculatorConfig } from '~/config/webappCalculator'

const { get } = useAppI18n()

const content = computed(() => {
  const c = get<Record<string, any>>('servicesTree.sites.webappContent')
  return c && typeof c === 'object' ? c : null
})

const comparison = computed(() => {
  const data = get<any>('servicesTree.sites.webappComparison')
  return data?.custom && data?.platform
    ? { shape: 'pros-cons' as const, data, leftKey: 'custom', rightKey: 'platform' }
    : null
})

const faqItems = computed(() => {
  const faq = get<Array<{ q: string; a: string }>>('servicesTree.sites.webappFaq')
  return Array.isArray(faq) ? faq : []
})

const calculator = computed(() => {
  const labels = get<Record<string, string>>('servicesTree.sites.webappCalculator')
  return { config: webappCalculatorConfig, labels: labels && typeof labels === 'object' ? labels : {} }
})
</script>
