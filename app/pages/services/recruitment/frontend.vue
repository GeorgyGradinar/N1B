<template>
  <ServiceDetailPage
    category-id="recruitment"
    sub-key="frontend"
    :service-num="4"
    :detail="detail"
  />
</template>

<script setup lang="ts">
const { t } = useAppI18n()
const detailKey = 'servicesTree.recruitment.subDetail.frontend'
const detail = computed(() => {
  const v = t(detailKey)
  return v !== detailKey ? String(v) : ''
})
</script>
