<template>
  <ServiceDetailPage
    category-id="recruitment"
    sub-key="project"
    :service-num="4"
    :detail="detail"
  />
</template>

<script setup lang="ts">
const { t } = useAppI18n()
const detailKey = 'servicesTree.recruitment.subDetail.project'
const detail = computed(() => {
  const v = t(detailKey)
  return v !== detailKey ? String(v) : ''
})
</script>
