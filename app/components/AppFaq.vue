<template>
  <section class="app-faq" aria-labelledby="app-faq-title">
    <h2 id="app-faq-title" class="app-faq-title">{{ title }}</h2>
    <div class="app-faq-list" role="list">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="app-faq-item"
        role="listitem"
      >
        <button
          type="button"
          class="app-faq-question"
          :aria-expanded="openIndex === index"
          :aria-controls="`app-faq-answer-${id}-${index}`"
          :id="`app-faq-question-${id}-${index}`"
          @click="openIndex = openIndex === index ? -1 : index"
        >
          {{ item.q }}
          <span class="app-faq-icon" aria-hidden="true">{{ openIndex === index ? '−' : '+' }}</span>
        </button>
        <div
          :id="`app-faq-answer-${id}-${index}`"
          class="app-faq-answer"
          role="region"
          :aria-labelledby="`app-faq-question-${id}-${index}`"
          :hidden="openIndex !== index"
        >
          <p>{{ item.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface FaqItem {
  q: string
  a: string
}

const props = withDefaults(
  defineProps<{
    items: FaqItem[]
    title?: string
  }>(),
  { title: '' }
)

const id = Math.random().toString(36).slice(2, 9)
const openIndex = ref(-1)
const { t } = useAppI18n()
const title = computed(() => props.title || t('sections.faqTitle'))
</script>

<style scoped>
.app-faq {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.app-faq-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: var(--color-text);
}

.app-faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.app-faq-item {
  border: 1px solid var(--color-card-border, #e5e5e5);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-bg-alt, #f5f5f5);
}

.app-faq-question {
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

.app-faq-question:hover {
  background: var(--color-card-bg, #fff);
}

.app-faq-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.app-faq-answer {
  padding: 0 1.25rem 1rem;
}

.app-faq-answer[hidden] {
  display: none;
}

.app-faq-answer p {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.6;
}
</style>
