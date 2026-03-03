<template>
  <div class="page">
    <div class="page-inner section">
      <AppBreadcrumbs :items="breadcrumbItems" />
      <NuxtLink :to="localePath('/') + '#services'" class="back-link">{{ t('servicePage.back') }}</NuxtLink>
      <article class="article">
        <span class="article-icon" aria-hidden="true">⚡</span>
        <p class="article-category">{{ t('servicesTree.optimization.title') }}</p>
        <h1 class="article-title">{{ t('servicesTree.optimization.sub.audit') }}</h1>
        <div class="article-body">
          <p v-if="detail">{{ detail }}</p>
          <p class="article-cta">{{ t('serviceSubPage.cta') }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, localePath } = useAppI18n()
const detailKey = 'servicesTree.optimization.subDetail.audit'
const detail = computed(() => { const v = t(detailKey); return v !== detailKey ? v : '' })
const breadcrumbItems = computed(() => [
  { label: t('breadcrumbs.home'), to: localePath('/') },
  { label: t('sections.servicesTitle'), to: localePath('/') + '#services' },
  { label: t('servicesTree.optimization.title') },
  { label: t('servicesTree.optimization.sub.audit') }
])
const pageTitle = computed(() => t('servicesTree.optimization.sub.audit'))
useHead({ title: () => `${pageTitle.value} — N1B`, meta: [{ name: 'description', content: () => pageTitle.value }] })
</script>

<style scoped>
.page { padding-bottom: 4rem; }
.page-inner { max-width: 720px; margin: 0 auto; }
.back-link { display: inline-block; margin-bottom: 2rem; color: var(--color-accent); font-weight: 500; }
.back-link:hover { text-decoration: underline; }
.article { padding: 2rem 0; }
.article-icon { font-size: 2.5rem; display: block; margin-bottom: 0.75rem; }
.article-category { font-size: 0.9rem; color: var(--color-text-muted); margin: 0 0 0.25rem; }
.article-title { font-size: 1.75rem; font-weight: 700; margin: 0 0 1rem; }
.article-body { font-size: 1.0625rem; line-height: 1.7; color: var(--color-text-muted); }
.article-body p { margin: 0 0 1rem; }
.article-cta { margin-top: 1.5rem; font-weight: 500; color: var(--color-text); }
</style>
