<template>
  <div>
    <section class="hero">
      <div class="hero-inner">
        <h1 class="hero-title">{{ t('hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('hero.subtitle') }}</p>
        <a href="#services" class="hero-cta">{{ t('hero.cta') }}</a>
      </div>
    </section>

    <section id="services" class="section section-services">
      <h2 class="section-title">{{ t('sections.servicesTitle') }}</h2>

      <div v-if="!selectedCategory" class="services-tree-grid">
        <button
          v-for="cat in SERVICES_TREE"
          :key="cat.id"
          type="button"
          class="service-tree-card"
          @click="selectedCategory = cat.id"
        >
          <span class="service-tree-icon" aria-hidden="true">{{ cat.icon }}</span>
          <h3 class="service-tree-title">{{ t(`servicesTree.${cat.id}.title`) }}</h3>
          <p class="service-tree-desc">{{ t(`servicesTree.${cat.id}.shortDesc`) }}</p>
          <span class="service-tree-arrow" aria-hidden="true">→</span>
        </button>
      </div>

      <Transition name="services-detail">
        <div v-if="selectedCategory" class="services-detail">
          <button type="button" class="services-detail-back" @click="selectedCategory = null">
            ← {{ t('servicePage.back') }}
          </button>
          <div class="services-detail-header">
            <span
              class="service-tree-icon services-detail-icon"
              aria-hidden="true"
            >{{ activeCategory?.icon }}</span>
            <div>
              <h3 class="services-detail-title">{{ activeCategory && t(`servicesTree.${activeCategory.id}.title`) }}</h3>
              <p class="services-detail-lead">{{ activeCategory && t(`servicesTree.${activeCategory.id}.shortDesc`) }}</p>
            </div>
          </div>
          <ul class="services-detail-list" role="list">
            <li
              v-for="subKey in (activeCategory?.subKeys ?? [])"
              :key="subKey"
              class="services-detail-item"
            >
              <NuxtLink
                :to="localePath(`/services/${activeCategory!.id}/${subKey}`)"
                class="services-detail-link"
              >
                {{ t(`servicesTree.${activeCategory!.id}.sub.${subKey}`) }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </Transition>
    </section>

    <section id="experience" class="section section-experience">
      <h2 class="section-title">{{ t('sections.experienceTitle') }}</h2>
      <div class="experience-content">
        <p class="experience-lead">{{ t('experience.lead', { years: t('experience.years') }) }}</p>
        <div class="experience-stats">
          <div class="stat">
            <span class="stat-value">3+</span>
            <span class="stat-label">{{ t('experience.statYears') }}</span>
          </div>
          <div class="stat">
            <span class="stat-value">50+</span>
            <span class="stat-label">{{ t('experience.statProjects') }}</span>
          </div>
          <div class="stat">
            <span class="stat-value">30+</span>
            <span class="stat-label">{{ t('experience.statClients') }}</span>
          </div>
        </div>
        <p class="experience-text">{{ t('experience.text') }}</p>
      </div>
    </section>

    <section id="faq" class="section section-faq">
      <h2 class="section-title">{{ t('sections.faqTitle') }}</h2>
      <div class="faq-list" role="list">
        <div
          v-for="(item, index) in faq"
          :key="index"
          class="faq-item"
          role="listitem"
        >
          <button
            type="button"
            class="faq-question"
            :aria-expanded="openFaq === index"
            :aria-controls="`faq-answer-${index}`"
            :id="`faq-question-${index}`"
            @click="openFaq = openFaq === index ? -1 : index"
          >
            {{ item.q }}
            <span class="faq-icon" aria-hidden="true">{{ openFaq === index ? '−' : '+' }}</span>
          </button>
          <div
            :id="`faq-answer-${index}`"
            class="faq-answer"
            role="region"
            :aria-labelledby="`faq-question-${index}`"
            :hidden="openFaq !== index"
          >
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ServiceCategoryId } from '~/utils/services'
import { SERVICES_TREE } from '~/utils/services'

const { t, get, localePath } = useAppI18n()

const selectedCategory = ref<ServiceCategoryId | null>(null)
const activeCategory = computed(() =>
  selectedCategory.value
    ? SERVICES_TREE.find((c) => c.id === selectedCategory.value) ?? null
    : null
)

const faq = computed(() => get<Array<{ q: string; a: string }>>('faq'))

const openFaq = ref(0)
</script>

<style scoped>
.hero {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  background: var(--color-bg-alt);
  border-bottom: 1px solid var(--color-card-border);
}

.hero-inner {
  max-width: 720px;
  text-align: center;
}

.hero-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  margin: 0 0 1rem;
  color: var(--color-text);
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  margin: 0 0 2rem;
  line-height: 1.6;
}

.hero-cta {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--color-accent);
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
}

.hero-cta:hover {
  background: var(--color-accent-hover);
  color: #fff;
  text-decoration: none;
}

.section-services {
  background: var(--color-bg);
}

.services-tree-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.service-tree-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 1.5rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
}

.service-tree-card:hover {
  border-color: var(--color-accent, #2563eb);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.service-tree-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.service-tree-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--color-text);
}

.service-tree-desc {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  flex-grow: 1;
}

.service-tree-arrow {
  font-size: 1.25rem;
  color: var(--color-accent, #2563eb);
  opacity: 0.8;
}

/* Детальный вид категории */
.services-detail {
  margin-top: 0;
  padding: 1.5rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
}

.services-detail-back {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-accent, #2563eb);
  background: none;
  border: none;
  cursor: pointer;
}

.services-detail-back:hover {
  text-decoration: underline;
}

.services-detail-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-card-border);
}

.services-detail-icon {
  margin-bottom: 0;
  flex-shrink: 0;
}

.services-detail-title {
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0 0 0.35rem;
  color: var(--color-text);
}

.services-detail-lead {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.services-detail-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.services-detail-item {
  padding: 0.65rem 1rem;
  background: var(--color-bg-alt);
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--color-text);
  border: 1px solid transparent;
  transition: border-color 0.2s, background 0.2s;
}

.services-detail-item:hover {
  border-color: var(--color-card-border);
  background: var(--color-bg);
}

.services-detail-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.services-detail-link:hover {
  color: var(--color-accent);
}

/* Анимация появления детали */
.services-detail-enter-active,
.services-detail-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.services-detail-enter-from,
.services-detail-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.section-experience {
  background: var(--color-bg-alt);
}

.experience-content {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}

.experience-lead {
  font-size: 1.25rem;
  margin: 0 0 2rem;
}

.experience-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-accent);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.experience-text {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.section-faq {
  background: var(--color-bg);
}

.faq-list {
  max-width: 640px;
  margin: 0 auto;
}

.faq-item {
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  overflow: hidden;
  background: var(--color-card-bg);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
}

.faq-question:hover {
  background: var(--color-bg-alt);
}

.faq-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.faq-answer {
  padding: 0 1.25rem 1rem;
}

.faq-answer[hidden] {
  display: none;
}

.faq-answer p {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero {
    min-height: 50vh;
    padding: 3rem 1rem;
  }
  .services-tree-grid {
    grid-template-columns: 1fr;
  }
  .services-detail-header {
    flex-direction: column;
    gap: 0.75rem;
  }
  .experience-stats {
    gap: 1.5rem;
  }
  .stat-value {
    font-size: 1.5rem;
  }
}
</style>
