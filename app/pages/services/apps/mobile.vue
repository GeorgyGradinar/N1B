<template>
  <ServiceDetailPage
    category-id="apps"
    sub-key="mobile"
    :service-num="2"
    :content="content"
    :comparison="comparison"
    :calculator="calculator"
    :faq-items="faqItems"
  />
</template>

<script setup lang="ts">
import { mobileCalculatorConfig } from '~/config/mobileCalculator'

const { get } = useAppI18n()

const content = computed(() => {
  const c = get<Record<string, any>>('servicesTree.apps.mobileContent')
  return c && typeof c === 'object' ? c : null
})

const comparison = computed(() => {
  const data = get<any>('servicesTree.apps.mobileComparison')
  return data?.custom && data?.offshelf
    ? { shape: 'pros-cons' as const, data, leftKey: 'custom', rightKey: 'offshelf' }
    : null
})

const faqItems = computed(() => {
  const faq = get<Array<{ q: string; a: string }>>('servicesTree.apps.mobileFaq')
  return Array.isArray(faq) ? faq : []
})

const calculator = computed(() => {
  const labels = get<Record<string, string>>('servicesTree.apps.mobileCalculator')
  return { config: mobileCalculatorConfig, labels: labels && typeof labels === 'object' ? labels : {} }
})
</script>
