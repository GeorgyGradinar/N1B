<template>
  <div v-if="serviceSlug" class="service-page">
    <div class="service-page-inner section">
      <AppBreadcrumbs :items="breadcrumbItems" />
      <NuxtLink :to="localePath('/') + '#services'" class="back-link">{{ t('servicePage.back') }}</NuxtLink>
      <article class="service-article">
        <span class="service-page-icon" aria-hidden="true">{{ SERVICE_ICONS[serviceSlug] }}</span>
        <h1 class="service-page-title">{{ t(`services.${serviceSlug}.title`) }}</h1>
        <p class="service-page-lead">{{ t(`services.${serviceSlug}.shortDesc`) }}</p>
        <div class="service-page-body">
          <p>{{ t(`services.${serviceSlug}.detail`) }}</p>
        </div>
      </article>
    </div>
  </div>
  <div v-else class="section">
    <p>{{ t('servicePage.back') }}</p>
    <NuxtLink :to="localePath('/')">{{ t('servicePage.back') }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { isServiceSlug, SERVICE_ICONS } from '~/utils/services'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const serviceSlug = computed(() => (isServiceSlug(slug.value) ? slug.value : null))

const { t, localePath } = useAppI18n()

const breadcrumbItems = computed(() =>
  serviceSlug.value
    ? [
        { label: t('breadcrumbs.home'), to: localePath('/') },
        { label: t('sections.servicesTitle'), to: localePath('/') + '#services' },
        { label: t(`services.${serviceSlug.value}.title`) }
      ]
    : []
)

useHead({
  title: () => (serviceSlug.value ? `${t(`services.${serviceSlug.value}.title`)} — N1B` : 'N1B'),
  meta: [
    {
      name: 'description',
      content: () =>
        serviceSlug.value ? t(`services.${serviceSlug.value}.shortDesc`) : ''
    }
  ]
})
</script>

<style scoped>
.service-page {
  padding-bottom: 4rem;
}

.service-page-inner {
  max-width: 720px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: var(--color-accent);
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.service-article {
  padding: 2rem 0;
}

.service-page-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.service-page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.service-page-lead {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.service-page-body {
  font-size: 1.0625rem;
  line-height: 1.7;
}

.service-page-body p {
  margin: 0 0 1rem;
}

.service-page-body p:last-child {
  margin-bottom: 0;
}
</style>
