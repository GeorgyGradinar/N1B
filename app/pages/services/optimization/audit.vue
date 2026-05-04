<template>
  <ServiceDetailPage
    category-id="optimization"
    sub-key="audit"
    :service-num="3"
    :content="content"
    :comparison="comparison"
    :calculator="calculator"
    :faq-items="faqItems"
  />
</template>

<script setup lang="ts">
import { auditCalculatorConfig } from '~/config/auditCalculator'

const { get } = useAppI18n()

const content = computed(() => {
  const c = get<Record<string, any>>('servicesTree.optimization.auditContent')
  return c && typeof c === 'object' ? c : null
})

const comparison = computed(() => {
  const data = get<any>('servicesTree.optimization.auditComparison')
  return data?.express && data?.full
    ? { shape: 'pros-cons' as const, data, leftKey: 'express', rightKey: 'full' }
    : null
})

const faqItems = computed(() => {
  const faq = get<Array<{ q: string; a: string }>>('servicesTree.optimization.auditFaq')
  return Array.isArray(faq) ? faq : []
})

const calculator = computed(() => {
  const labels = get<Record<string, string>>('servicesTree.optimization.auditCalculator')
  return { config: auditCalculatorConfig, labels: labels && typeof labels === 'object' ? labels : {} }
})
</script>
