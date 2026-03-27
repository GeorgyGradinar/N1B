<template>
  <div class="page">
    <div class="page-inner section">
      <AppBreadcrumbs :items="breadcrumbItems" />
      <NuxtLink :to="localePath('/') + '#services'" class="back-link">{{ t('servicePage.back') }}</NuxtLink>
      <article class="article">
        <span class="article-icon" aria-hidden="true">⚡</span>
        <p class="article-category">{{ t('servicesTree.sites.title') }}</p>
        <h1 class="article-title">{{ t('servicesTree.sites.sub.speed') }}</h1>
        <div class="article-body">
          <section v-for="(section, key) in content" :key="key" class="content-section">
            <h2 class="content-section-title">{{ section.title }}</h2>
            <p v-if="section.p1" class="content-p">{{ section.p1 }}</p>
            <p v-if="section.p2" class="content-p">{{ section.p2 }}</p>
            <p v-if="section.p3" class="content-p">{{ section.p3 }}</p>
            <p v-if="section.lead" class="content-lead">{{ section.lead }}</p>
            <ul v-if="section.items?.length" class="content-list" role="list">
              <li v-for="(item, i) in section.items" :key="i">{{ item }}</li>
            </ul>
            <p v-if="section.footer" class="content-footer">{{ section.footer }}</p>
          </section>
          <p class="article-cta">{{ t('serviceSubPage.cta') }}</p>
        </div>
      </article>

      <section v-if="comparison" class="comparison" aria-labelledby="comparison-title">
        <h2 id="comparison-title" class="comparison-title">{{ comparison.title }}</h2>
        <p v-if="comparison.subtitle" class="comparison-subtitle">{{ comparison.subtitle }}</p>
        <div class="comparison-table-wrap">
          <table class="comparison-table" role="table">
            <thead>
              <tr>
                <th scope="col" class="comparison-th comparison-th--feature">{{ comparison.featureLabel }}</th>
                <th
                  v-for="(col, ci) in comparison.columns"
                  :key="ci"
                  scope="col"
                  class="comparison-th"
                  :class="{ 'comparison-th--highlight': ci === 2 }"
                >
                  {{ col }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(feature, fi) in comparison.features"
                :key="fi"
                class="comparison-row"
                :class="{ 'comparison-row--odd': fi % 2 !== 0 }"
              >
                <td class="comparison-td comparison-td--label">{{ feature.label }}</td>
                <td
                  v-for="(val, vi) in feature.values"
                  :key="vi"
                  class="comparison-td comparison-td--val"
                  :class="{ 'comparison-td--highlight': vi === 2 }"
                >
                  <span v-if="val" class="comparison-check" aria-label="Да">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <circle cx="9" cy="9" r="9" fill="currentColor" fill-opacity="0.15"/>
                      <path d="M5 9l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span v-else class="comparison-cross" aria-label="Нет">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <circle cx="9" cy="9" r="9" fill="currentColor" fill-opacity="0.12"/>
                      <path d="M6 6l6 6M12 6l-6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
                    </svg>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <aside class="calculator" aria-labelledby="calculator-title">
        <h2 id="calculator-title" class="calculator-title">{{ calcLabels.title }}</h2>
        <div v-for="group in calcConfig.groups" :key="group.id" class="calculator-group">
          <p class="calculator-group-label">{{ calcLabels[group.labelKey] }}</p>
          <div
            class="calculator-options"
            :class="{ 'calculator-options--checkboxes': group.type === 'checkbox' }"
          >
            <label v-for="opt in group.options" :key="opt.value" class="calculator-option">
              <input v-model="calc[group.id]" :type="group.type" :value="opt.value" />
              <span>{{ calcLabels[opt.labelKey] }}</span>
            </label>
          </div>
        </div>
        <div class="calculator-total">
          <p class="calculator-total-label">{{ calcLabels.total }}</p>
          <p class="calculator-total-value">{{ calcLabels.totalPrefix }}{{ totalFormatted }}</p>
          <p class="calculator-total-note">{{ calcLabels.totalNote }}</p>
        </div>
      </aside>

      <AppFaq :items="faqItems" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { speedCalculatorConfig as calcConfig } from '~/config/speedCalculator'
import type { CalculatorGroup } from '~/config/landingCalculator'

const { t, get, localePath } = useAppI18n()

const breadcrumbItems = computed(() => [
  { label: t('breadcrumbs.home'), to: localePath('/') },
  { label: t('sections.servicesTitle'), to: localePath('/') + '#services' },
  { label: t('servicesTree.sites.title') },
  { label: t('servicesTree.sites.sub.speed') }
])

const content = computed(() => {
  const c = get('servicesTree.sites.speedContent')
  return c && typeof c === 'object' ? c : null
})

const comparison = computed(() => {
  const data = get('servicesTree.sites.speedComparison')
  return data?.features && Array.isArray(data.features) ? data : null
})

const faqItems = computed(() => {
  const faq = get<Array<{ q: string; a: string }>>('servicesTree.sites.speedFaq')
  return Array.isArray(faq) ? faq : []
})

const calcLabels = computed(() => get('servicesTree.sites.speedCalculator') || {})

function getInitialCalcState () {
  const state: Record<string, string | string[]> = {}
  for (const group of calcConfig.groups) {
    state[group.id] = group.type === 'radio' ? (group.options[0]?.value ?? '') : []
  }
  return state
}
const calc = reactive<Record<string, string | string[]>>(getInitialCalcState())

function getOptionPrice (group: CalculatorGroup, value: string): number {
  return group.options.find((o) => o.value === value)?.price ?? 0
}
function getOptionMultiplier (group: CalculatorGroup, value: string): number {
  return group.options.find((o) => o.value === value)?.multiplier ?? 1
}

const total = computed(() => {
  let sum = calcConfig.basePrice
  let multiplier = 1
  for (const group of calcConfig.groups) {
    const selected = calc[group.id]
    if (group.type === 'radio' && typeof selected === 'string') {
      sum += getOptionPrice(group, selected)
      const m = getOptionMultiplier(group, selected)
      if (m !== 1) multiplier = m
    } else if (group.type === 'checkbox' && Array.isArray(selected)) {
      for (const v of selected) sum += getOptionPrice(group, v)
    }
  }
  return Math.round(sum * multiplier)
})

const totalFormatted = computed(() =>
  new Intl.NumberFormat('ka-GE', { maximumFractionDigits: 0 }).format(total.value) + ' GEL'
)

const pageTitle = computed(() => t('servicesTree.sites.sub.speed'))

useHead({
  title: () => `${pageTitle.value} - N1B`,
  meta: [{ name: 'description', content: () => pageTitle.value }]
})
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
.content-section { margin-bottom: 2rem; }
.content-section:last-of-type { margin-bottom: 1rem; }
.content-section-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 0.75rem; color: var(--color-text); }
.content-p, .content-lead, .content-footer { margin: 0 0 0.75rem; }
.content-lead { font-weight: 500; }
.content-list { list-style: disc; margin: 0 0 0.75rem; padding-left: 1.5rem; }
.content-list li { margin-bottom: 0.35rem; }
.content-footer { font-weight: 500; color: var(--color-text); }
.comparison { margin-top: 2.5rem; }
.comparison-title { font-size: 1.25rem; font-weight: 700; margin: 0 0 0.5rem; color: var(--color-text); }
.comparison-subtitle { font-size: 0.9rem; color: var(--color-text-muted); margin: 0 0 1.5rem; }

.comparison-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-card-border);
  border-radius: 14px;
  background: var(--color-card-bg);
  box-shadow: var(--shadow-card);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.comparison-th {
  padding: 1rem 1.25rem;
  font-weight: 600;
  font-size: 0.82rem;
  text-align: center;
  color: var(--color-text-muted);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-card-border);
  white-space: nowrap;
  letter-spacing: 0.01em;
}

.comparison-th--feature {
  text-align: left;
  width: 38%;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.comparison-th--highlight {
  color: var(--color-accent);
  background: var(--color-tag-bg);
  border-left: 2px solid var(--color-accent);
  border-right: 2px solid var(--color-accent);
}

.comparison-row:last-child .comparison-td {
  border-bottom: none;
}

.comparison-td {
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid var(--color-card-border);
  vertical-align: middle;
  color: var(--color-text-muted);
}

.comparison-td--label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.comparison-td--val {
  text-align: center;
}

.comparison-td--highlight {
  background: var(--color-tag-bg);
  border-left: 2px solid var(--color-accent);
  border-right: 2px solid var(--color-accent);
}

.comparison-row--odd .comparison-td {
  background: var(--color-bg);
}

.comparison-row--odd .comparison-td--highlight {
  background: color-mix(in srgb, var(--color-tag-bg) 80%, var(--color-bg) 20%);
}

.comparison-check {
  display: inline-flex;
  color: #16a34a;
}

.comparison-cross {
  display: inline-flex;
  color: #dc2626;
}

@media (max-width: 640px) {
  .comparison-th, .comparison-td { padding: 0.65rem 0.75rem; font-size: 0.82rem; }
  .comparison-th--feature, .comparison-td--label { font-size: 0.8rem; }
}
.calculator { margin-top: 3rem; padding: 2rem; background: var(--color-bg-alt, #f5f5f5); border: 1px solid var(--color-card-border, #e5e5e5); border-radius: 12px; }
.calculator-title { font-size: 1.5rem; font-weight: 700; margin: 0 0 1.5rem; color: var(--color-text); }
.calculator-group { margin-bottom: 1.5rem; }
.calculator-group-label { font-size: 0.95rem; font-weight: 600; margin: 0 0 0.5rem; color: var(--color-text); }
.calculator-options { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; }
.calculator-options--checkboxes { flex-direction: column; gap: 0.4rem; }
.calculator-option { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; color: var(--color-text-muted); cursor: pointer; }
.calculator-option input { width: 1.1rem; height: 1.1rem; accent-color: var(--color-accent, #2563eb); }
.calculator-option:has(input:checked) { color: var(--color-text); font-weight: 500; }
.calculator-total { margin-top: 2rem; padding-top: 1.5rem; border-top: 2px solid var(--color-card-border, #e5e5e5); }
.calculator-total-label { font-size: 1rem; font-weight: 600; margin: 0 0 0.25rem; color: var(--color-text); }
.calculator-total-value { font-size: 1.75rem; font-weight: 700; margin: 0; color: var(--color-accent, #2563eb); }
.calculator-total-note { font-size: 0.8rem; color: var(--color-text-muted); margin: 0.5rem 0 0; }
</style>
