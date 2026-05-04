<template>
  <ServiceDetailPage
    category-id="optimization"
    sub-key="ai"
    :service-num="3"
    :detail="detail"
  />
</template>

<script setup lang="ts">
const { t } = useAppI18n()
const detailKey = 'servicesTree.optimization.subDetail.ai'
const detail = computed(() => {
  const v = t(detailKey)
  return v !== detailKey ? String(v) : ''
})
</script>
