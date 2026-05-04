<template>
  <ServiceDetailPage
    category-id="optimization"
    sub-key="automation"
    :service-num="3"
    :detail="detail"
  />
</template>

<script setup lang="ts">
const { t } = useAppI18n()
const detailKey = 'servicesTree.optimization.subDetail.automation'
const detail = computed(() => {
  const v = t(detailKey)
  return v !== detailKey ? String(v) : ''
})
</script>
