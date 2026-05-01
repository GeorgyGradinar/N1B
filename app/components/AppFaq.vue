<template>
  <section class="app-faq" aria-labelledby="app-faq-title">
    <h2 id="app-faq-title" class="app-faq-title serif">{{ title }}</h2>
    <div class="app-faq-list" role="list">
      <article
        v-for="(item, index) in items"
        :key="index"
        class="app-faq-item"
        :class="{ 'is-open': openIndex === index }"
        role="listitem"
        @click="openIndex = openIndex === index ? -1 : index"
      >
        <div class="app-faq-num mono">{{ String(index + 1).padStart(2, '0') }}</div>
        <div class="app-faq-body">
          <button
            type="button"
            class="app-faq-q serif"
            :aria-expanded="openIndex === index"
            :aria-controls="`app-faq-answer-${id}-${index}`"
            :id="`app-faq-question-${id}-${index}`"
            @click.stop="openIndex = openIndex === index ? -1 : index"
          >
            {{ item.q }}
          </button>
          <div
            :id="`app-faq-answer-${id}-${index}`"
            class="app-faq-a"
            role="region"
            :aria-labelledby="`app-faq-question-${id}-${index}`"
            :hidden="openIndex !== index"
          >
            <p>{{ item.a }}</p>
          </div>
        </div>
        <span class="app-faq-toggle serif" aria-hidden="true">{{ openIndex === index ? '−' : '+' }}</span>
      </article>
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
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}

.app-faq-title {
  font-family: "Fraunces", serif;
  font-weight: 800;
  font-size: clamp(1.6rem, 3.2vw, 2.6rem);
  letter-spacing: -0.025em;
  line-height: 1;
  margin: 0 0 1.5rem;
  color: var(--ink);
}

.app-faq-list {
  display: flex;
  flex-direction: column;
  border-top: var(--line-w) solid var(--ink);
}

.app-faq-item {
  display: grid;
  grid-template-columns: clamp(54px, 6vw, 96px) 1fr auto;
  gap: clamp(16px, 1.6vw, 28px);
  padding: clamp(18px, 1.8vw, 28px) 0;
  border-bottom: var(--line-w) solid var(--ink);
  align-items: start;
  cursor: pointer;
  transition: background 0.2s ease;
}

.app-faq-item:hover { background: var(--paper); }

.app-faq-num {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.86rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}

.app-faq-body {
  display: flex;
  flex-direction: column;
}

.app-faq-q {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  text-align: left;
  font-family: "Fraunces", serif;
  font-weight: 700;
  font-size: clamp(1.2rem, 1.8vw, 1.8rem);
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--ink);
  cursor: pointer;
}

.app-faq-a {
  margin-top: 12px;
  color: var(--ink-2);
  font-size: 0.98rem;
  line-height: 1.6;
  max-width: 60ch;
}

.app-faq-a[hidden] { display: none; }

.app-faq-a p { margin: 0; }

.app-faq-toggle {
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.4rem;
  align-self: center;
  color: var(--ink);
}

@media (max-width: 768px) {
  .app-faq-item {
    grid-template-columns: 36px 1fr auto;
    gap: 12px;
  }
}
</style>
