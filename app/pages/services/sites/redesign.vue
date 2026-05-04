<template>
  <ServiceDetailPage
    category-id="sites"
    sub-key="redesign"
    :service-num="1"
    :content="content"
    :comparison="comparison"
    :calculator="calculator"
    :faq-items="faqItems"
    languages-show-more
    total-postfix=" GEL"
  />
</template>

<script setup lang="ts">
import { redesignCalculatorConfig } from '~/config/redesignCalculator'

const { get } = useAppI18n()

const content = computed(() => {
  const c = get<Record<string, any>>('servicesTree.sites.redesignContent')
  return c && typeof c === 'object' ? c : null
})

const comparison = computed(() => {
  const data = get<any>('servicesTree.sites.redesignComparison')
  return data?.features && Array.isArray(data.features)
    ? { shape: 'feature-matrix' as const, data, highlightCol: 0 }
    : null
})

const faqItems = computed(() => {
  const faq = get<Array<{ q: string; a: string }>>('servicesTree.sites.redesignFaq')
  return Array.isArray(faq) ? faq : []
})

const calculator = computed(() => {
  const labels = get<Record<string, string>>('servicesTree.sites.redesignCalculator')
  return { config: redesignCalculatorConfig, labels: labels && typeof labels === 'object' ? labels : {} }
})
</script>
