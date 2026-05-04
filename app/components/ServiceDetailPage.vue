<template>
  <div class="page">

    <!-- ── breadcrumb band ── -->
    <div class="page-crumb">
      <div class="ed-wrap">
        <AppBreadcrumbs :items="breadcrumbItems" />
      </div>
    </div>

    <!-- ── article header ── -->
    <header class="article-head">
      <div class="ed-wrap article-head-inner">
        <div class="article-meta">
          <NuxtLink :to="localePath('/') + '#services'" class="back-link mono">← {{ t('servicePage.back') }}</NuxtLink>
          <span class="article-svc mono">SVC.{{ String(serviceNum).padStart(3, '0') }} · {{ t(`servicesTree.${categoryId}.title`) }}</span>
          <span class="article-icon" aria-hidden="true">
            <svg v-if="categoryId === 'sites'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter">
              <rect x="2" y="4" width="20" height="16"/>
              <line x1="2" y1="9" x2="22" y2="9"/>
            </svg>
            <svg v-else-if="categoryId === 'apps'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter">
              <rect x="7" y="2" width="10" height="20"/>
              <line x1="10" y1="18" x2="14" y2="18"/>
            </svg>
            <svg v-else-if="categoryId === 'optimization'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter">
              <path d="M14 2 L5 13 L11 13 L10 22 L19 11 L13 11 Z"/>
            </svg>
            <svg v-else-if="categoryId === 'recruitment'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 22 C 4 17, 8 14, 12 14 C 16 14, 20 17, 20 22"/>
            </svg>
          </span>
        </div>

        <h1 class="article-title serif">
          <em>{{ titleParts.italic }}</em><template v-if="titleParts.rest"> {{ titleParts.rest }}</template>.
        </h1>

        <p v-if="leadText" class="article-lead">{{ leadText }}</p>
      </div>
    </header>

    <!-- ── article body ── -->
    <article v-if="contentSections.length || detail" class="article-body">
      <div class="ed-wrap">

        <!-- minimal pages: single detail paragraph -->
        <template v-if="!contentSections.length && detail">
          <section class="content-section">
            <div class="content-marker">
              <span class="mono">01</span>
            </div>
            <div class="content-body">
              <p class="content-lead">{{ detail }}</p>
            </div>
          </section>
        </template>

        <!-- full pages: multi-section content -->
        <template v-else>
          <section
            v-for="(section, idx) in contentSections"
            :key="idx"
            class="content-section"
          >
            <div class="content-marker">
              <span class="mono">{{ String(idx + 1).padStart(2, '0') }}</span>
            </div>
            <div class="content-body">
              <h2 class="content-title serif">{{ section.title }}</h2>
              <p v-if="section.lead" class="content-lead">{{ section.lead }}</p>
              <p v-if="section.p1" class="content-p">{{ section.p1 }}</p>
              <p v-if="section.p2" class="content-p">{{ section.p2 }}</p>
              <p v-if="section.p3" class="content-p">{{ section.p3 }}</p>
              <ul v-if="section.items?.length" class="content-list" role="list">
                <li v-for="(item, i) in section.items" :key="i">{{ item }}</li>
              </ul>
              <p v-if="section.footer" class="content-footer">{{ section.footer }}</p>
            </div>
          </section>
        </template>

      </div>
    </article>

    <!-- ── pros/cons comparison ── -->
    <section
      v-if="comparison && comparison.shape === 'pros-cons'"
      class="comparison-section"
      aria-labelledby="comparison-title"
    >
      <div class="ed-wrap">
        <div class="ed-section-head">
          <div>
            <div class="ed-section-num serif">{{ sectionNum('comparison') }}<span class="ed-slash">/</span>{{ totalSections }}</div>
            <h2 id="comparison-title" class="ed-section-title serif">{{ comparison.data.title }}</h2>
          </div>
          <div class="ed-section-meta mono">— Pros &amp; cons</div>
        </div>

        <div class="comparison-grid pros-cons">
          <header class="comparison-col comparison-col--head">
            <span class="mono">↳ option</span>
          </header>
          <header class="comparison-col comparison-col--head">
            <span class="serif">{{ comparison.data[comparison.leftKey].label }}</span>
          </header>
          <header class="comparison-col comparison-col--head">
            <span class="serif">{{ comparison.data[comparison.rightKey].label }}</span>
          </header>

          <div class="comparison-col comparison-col--label">
            <span class="mono">{{ comparison.data.prosLabel }}</span>
          </div>
          <div class="comparison-col">
            <ul class="comparison-list comparison-list--pros" role="list">
              <li v-for="(item, i) in comparison.data[comparison.leftKey].pros" :key="'l-p-' + i">{{ item }}</li>
            </ul>
          </div>
          <div class="comparison-col">
            <ul class="comparison-list comparison-list--pros" role="list">
              <li v-for="(item, i) in comparison.data[comparison.rightKey].pros" :key="'r-p-' + i">{{ item }}</li>
            </ul>
          </div>

          <div class="comparison-col comparison-col--label">
            <span class="mono">{{ comparison.data.consLabel }}</span>
          </div>
          <div class="comparison-col">
            <ul class="comparison-list comparison-list--cons" role="list">
              <li v-for="(item, i) in comparison.data[comparison.leftKey].cons" :key="'l-c-' + i">{{ item }}</li>
            </ul>
          </div>
          <div class="comparison-col">
            <ul class="comparison-list comparison-list--cons" role="list">
              <li v-for="(item, i) in comparison.data[comparison.rightKey].cons" :key="'r-c-' + i">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ── feature matrix comparison ── -->
    <section
      v-else-if="comparison && comparison.shape === 'feature-matrix'"
      class="comparison-section"
      aria-labelledby="comparison-title"
    >
      <div class="ed-wrap">
        <div class="ed-section-head">
          <div>
            <div class="ed-section-num serif">{{ sectionNum('comparison') }}<span class="ed-slash">/</span>{{ totalSections }}</div>
            <h2 id="comparison-title" class="ed-section-title serif">{{ comparison.data.title }}</h2>
          </div>
          <div class="ed-section-meta mono">— Feature matrix</div>
        </div>

        <p v-if="comparison.data.subtitle" class="comparison-subtitle">{{ comparison.data.subtitle }}</p>

        <div
          class="matrix-grid"
          :style="{ '--matrix-cols': comparison.data.columns.length + 1 }"
        >
          <div class="matrix-col matrix-col--head matrix-col--feat">
            <span class="mono">{{ comparison.data.featureLabel }}</span>
          </div>
          <div
            v-for="(col, ci) in comparison.data.columns"
            :key="'col-' + ci"
            class="matrix-col matrix-col--head"
            :class="{ 'is-highlight': ci === (comparison.highlightCol ?? 0) }"
          >
            <span class="serif">{{ col }}</span>
          </div>

          <template v-for="(feature, fi) in comparison.data.features" :key="'f-' + fi">
            <div class="matrix-col matrix-col--label">
              <span>{{ feature.label }}</span>
            </div>
            <div
              v-for="(val, vi) in feature.values"
              :key="'v-' + fi + '-' + vi"
              class="matrix-col matrix-col--val"
              :class="{ 'is-highlight': vi === (comparison.highlightCol ?? 0) }"
            >
              <span v-if="val" class="matrix-mark matrix-mark--yes" aria-label="Yes">+</span>
              <span v-else class="matrix-mark matrix-mark--no" aria-label="No">−</span>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- ── calculator ── -->
    <section
      v-if="calculator && calcConfig"
      id="calculator"
      class="calculator-section"
      aria-labelledby="calculator-title"
    >
      <div class="ed-wrap">
        <div class="ed-section-head">
          <div>
            <div class="ed-section-num serif">{{ sectionNum('calc') }}<span class="ed-slash">/</span>{{ totalSections }}</div>
            <h2 id="calculator-title" class="ed-section-title serif">{{ calcLabels.title }}</h2>
          </div>
          <div class="ed-section-meta mono">— Live estimate</div>
        </div>

        <div class="calc-shell">
          <div class="calc-form">
            <div v-for="group in calcConfig.groups" :key="group.id" class="calc-group">
              <p class="calc-group-label mono">{{ calcLabels[group.labelKey] }}</p>

              <!-- languages with show-more (used by redesign) -->
              <template v-if="group.id === 'languages' && languagesShowMore">
                <div class="calc-options calc-options--check">
                  <label v-for="opt in visibleLanguageOptions" :key="opt.value" class="calc-option">
                    <input v-model="calc[group.id]" type="checkbox" :value="opt.value" />
                    <span class="calc-option-mark" aria-hidden="true"></span>
                    <span class="calc-option-text">{{ calcLabels[opt.labelKey] }}</span>
                  </label>
                </div>
                <button
                  v-if="moreLanguageOptions.length"
                  type="button"
                  class="calc-more-btn"
                  @click="showMoreLangs = !showMoreLangs"
                >
                  {{ showMoreLangs ? calcLabels.showLessLanguages : calcLabels.showMoreLanguages }}
                </button>
                <div v-show="showMoreLangs" class="calc-options calc-options--check">
                  <label v-for="opt in moreLanguageOptions" :key="opt.value" class="calc-option">
                    <input v-model="calc[group.id]" type="checkbox" :value="opt.value" />
                    <span class="calc-option-mark" aria-hidden="true"></span>
                    <span class="calc-option-text">{{ calcLabels[opt.labelKey] }}</span>
                  </label>
                </div>
              </template>

              <!-- standard radio/checkbox group -->
              <div
                v-else
                class="calc-options"
                :class="{ 'calc-options--check': group.type === 'checkbox' }"
              >
                <label v-for="opt in group.options" :key="opt.value" class="calc-option">
                  <input v-model="calc[group.id]" :type="group.type" :value="opt.value" />
                  <span class="calc-option-mark" aria-hidden="true"></span>
                  <span class="calc-option-text">{{ calcLabels[opt.labelKey] }}</span>
                  <span
                    v-if="opt.tooltipKey && calcLabels[opt.tooltipKey]"
                    class="calc-tooltip"
                    :aria-label="calcLabels[opt.tooltipKey]"
                    tabindex="0"
                    @click.stop.prevent
                  >
                    <span class="calc-tooltip-icon" aria-hidden="true">i</span>
                    <span class="calc-tooltip-text">{{ calcLabels[opt.tooltipKey] }}</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <aside class="calc-total">
            <div class="calc-total-label mono">{{ calcLabels.total }}</div>
            <div class="calc-total-value serif">{{ calcLabels.totalPrefix || '' }}{{ totalFormatted }}{{ calcLabels.totalPostfix || totalPostfix || '' }}</div>
            <div v-if="calcLabels.totalNote" class="calc-total-note">{{ calcLabels.totalNote }}</div>
            <a :href="localePath('/') + '#contact'" class="calc-cta">
              <span>{{ t('hero.cta') }}</span>
              <span class="calc-cta-arrow" aria-hidden="true">→</span>
            </a>
          </aside>
        </div>
      </div>
    </section>

    <!-- ── FAQ ── -->
    <section v-if="faqItems.length" class="page-faq-section">
      <div class="ed-wrap">
        <div class="ed-section-head">
          <div>
            <div class="ed-section-num serif">{{ sectionNum('faq') }}<span class="ed-slash">/</span>{{ totalSections }}</div>
            <h2 class="ed-section-title serif">{{ t('sections.faqTitle') }}</h2>
          </div>
          <div class="ed-section-meta mono">— {{ faqItems.length }}</div>
        </div>
        <AppFaq :items="faqItems" :title="''" />
      </div>
    </section>

    <!-- ── final CTA band ── -->
    <section class="page-cta">
      <div class="ed-wrap">
        <p class="cta-pre mono">— Let's begin</p>
        <h3 class="cta-h serif">
          <em>{{ t('serviceSubPage.cta') }}</em>
        </h3>
        <a :href="localePath('/') + '#contact'" class="cta-btn">
          <span>{{ t('hero.cta') }}</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
type ContentSection = {
  title?: string
  lead?: string
  p1?: string
  p2?: string
  p3?: string
  items?: string[]
  footer?: string
}

type ProsConsComparison = {
  shape: 'pros-cons'
  data: any
  leftKey: string
  rightKey: string
}

type FeatureMatrixComparison = {
  shape: 'feature-matrix'
  data: any
  highlightCol?: number
}

type CalculatorBundle = {
  config: any
  labels: Record<string, string>
}

const props = withDefaults(
  defineProps<{
    categoryId: 'sites' | 'apps' | 'optimization' | 'recruitment'
    subKey: string
    serviceNum: number

    content?: Record<string, ContentSection> | null
    detail?: string

    comparison?: ProsConsComparison | FeatureMatrixComparison | null
    calculator?: CalculatorBundle | null
    faqItems?: Array<{ q: string; a: string }>

    languagesShowMore?: boolean
    totalPostfix?: string
  }>(),
  {
    content: null,
    detail: '',
    comparison: null,
    calculator: null,
    faqItems: () => [],
    languagesShowMore: false,
    totalPostfix: ''
  }
)

const { t, localePath } = useAppI18n()

const breadcrumbItems = computed(() => [
  { label: t('breadcrumbs.home'), to: localePath('/') },
  { label: t('sections.servicesTitle'), to: localePath('/') + '#services' },
  { label: t(`servicesTree.${props.categoryId}.title`) },
  { label: t(`servicesTree.${props.categoryId}.sub.${props.subKey}`) }
])

// Italicize the first word for the editorial accent.
const titleParts = computed(() => {
  const raw = String(t(`servicesTree.${props.categoryId}.sub.${props.subKey}`)).replace(/\.$/, '')
  const words = raw.split(/\s+/)
  if (words.length === 1) return { italic: words[0], rest: '' }
  return { italic: words[0], rest: words.slice(1).join(' ') }
})

const contentSections = computed<ContentSection[]>(() => {
  const c = props.content
  if (!c || typeof c !== 'object') return []
  return Object.values(c)
})

const leadText = computed(() => {
  if (props.detail) return props.detail
  const first = contentSections.value[0]
  return first?.lead || first?.p1 || ''
})

// section numbering — only count sections that actually render
const sectionsList = computed(() => {
  const list: string[] = []
  if (contentSections.value.length || props.detail) list.push('content')
  if (props.comparison) list.push('comparison')
  if (props.calculator) list.push('calc')
  if (props.faqItems && props.faqItems.length) list.push('faq')
  return list
})

const totalSections = computed(() => String(sectionsList.value.length).padStart(2, '0'))

function sectionNum(key: string): string {
  const idx = sectionsList.value.indexOf(key)
  return String(idx + 1).padStart(2, '0')
}

// ── Calculator ──
const calcConfig = computed(() => props.calculator?.config ?? null)
const calcLabels = computed<Record<string, string>>(() => props.calculator?.labels ?? {})

const LANGUAGES_VISIBLE = 4
const showMoreLangs = ref(false)
const languagesGroup = computed(() => calcConfig.value?.groups?.find((g: any) => g.id === 'languages'))
const visibleLanguageOptions = computed(() => (languagesGroup.value ? languagesGroup.value.options.slice(0, LANGUAGES_VISIBLE) : []))
const moreLanguageOptions = computed(() => (languagesGroup.value ? languagesGroup.value.options.slice(LANGUAGES_VISIBLE) : []))

function getInitialCalcState() {
  const state: Record<string, string | string[]> = {}
  if (!calcConfig.value) return state
  for (const group of calcConfig.value.groups) {
    state[group.id] = group.type === 'radio' ? (group.options[0]?.value ?? '') : []
  }
  return state
}

const calc = reactive<Record<string, string | string[]>>(getInitialCalcState())

// rebuild state when calculator config changes
watch(
  () => calcConfig.value,
  () => {
    const next = getInitialCalcState()
    for (const k of Object.keys(calc)) delete calc[k]
    Object.assign(calc, next)
  },
  { immediate: false }
)

function getOptionPrice(group: any, value: string): number {
  return group.options.find((o: any) => o.value === value)?.price ?? 0
}
function getOptionMultiplier(group: any, value: string): number {
  return group.options.find((o: any) => o.value === value)?.multiplier ?? 1
}

const total = computed(() => {
  if (!calcConfig.value) return 0
  let sum = calcConfig.value.basePrice
  let urgentPrice = 0
  let multiplier = 1
  for (const group of calcConfig.value.groups) {
    const selected = calc[group.id]
    if (group.type === 'radio' && typeof selected === 'string') {
      const m = getOptionMultiplier(group, selected)
      if (m !== 1) {
        urgentPrice = getOptionPrice(group, selected)
        multiplier = m
      } else {
        sum += getOptionPrice(group, selected)
      }
    } else if (group.type === 'checkbox' && Array.isArray(selected)) {
      for (const v of selected) sum += getOptionPrice(group, v)
    }
  }
  return Math.round(sum * multiplier + urgentPrice)
})

const totalFormatted = computed(() => {
  // If a postfix is supplied (e.g. " GEL") we render bare number; otherwise use Intl currency.
  if (props.totalPostfix || calcLabels.value.totalPostfix) {
    return new Intl.NumberFormat('ka-GE', { maximumFractionDigits: 0 }).format(total.value)
  }
  return new Intl.NumberFormat('ka-GE', { style: 'currency', currency: 'GEL', maximumFractionDigits: 0 }).format(total.value)
})

const pageTitle = computed(() => t(`servicesTree.${props.categoryId}.sub.${props.subKey}`) as string)

useHead({
  title: () => `${pageTitle.value} - N1B`,
  meta: [{ name: 'description', content: () => pageTitle.value }]
})
</script>

<style scoped>
.page {
  background: var(--bg);
  color: var(--ink);
}

/* ── breadcrumb band ── */
.page-crumb {
  border-bottom: var(--line-w) solid var(--ink);
  padding: 18px 0 14px;
}
.page-crumb :deep(.breadcrumbs) { margin-bottom: 0; }

/* ── article header ── */
.article-head {
  padding: clamp(48px, 6vw, 120px) 0 clamp(48px, 5vw, 100px);
  border-bottom: var(--line-w) solid var(--ink);
  position: relative;
  overflow: hidden;
}

.article-head-inner {
  max-width: 1320px;
  margin: 0 auto;
  position: relative;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: clamp(28px, 3vw, 56px);
  font-family: "JetBrains Mono", monospace;
  font-size: clamp(0.78rem, 0.86vw, 0.92rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.back-link {
  color: var(--ink);
  border-bottom: 1.5px solid transparent;
  transition: border-color 0.18s, color 0.18s;
}
.back-link:hover {
  border-bottom-color: var(--accent);
  color: var(--accent);
}

.article-svc { color: var(--muted); }

.article-icon {
  display: inline-flex;
  align-items: center;
  color: var(--ink);
  margin-left: auto;
}

.article-title {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: clamp(2.6rem, 8.6vw, 11rem);
  line-height: 0.9;
  letter-spacing: -0.045em;
  color: var(--ink);
  margin: 0;
  max-width: 16ch;
}

.article-title em {
  font-style: italic;
  font-weight: 600;
  color: var(--accent);
}

.article-lead {
  margin-top: clamp(24px, 2.4vw, 40px);
  font-size: clamp(1.1rem, 1.18vw, 1.32rem);
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 56ch;
}

.article-lead::first-letter {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: 3.2em;
  float: left;
  line-height: 0.85;
  margin: 0.1em 0.14em 0 0;
  color: var(--accent);
}

/* ── article body ── */
.article-body {
  padding: clamp(48px, 6vw, 120px) 0;
  border-bottom: var(--line-w) solid var(--ink);
}

.content-section {
  display: grid;
  grid-template-columns: clamp(80px, 8vw, 140px) 1fr;
  gap: clamp(20px, 2vw, 40px);
  padding: clamp(28px, 3vw, 56px) 0;
  border-bottom: var(--line-w) dashed var(--ink);
}
.content-section:last-of-type { border-bottom: none; padding-bottom: 0; }
.content-section:first-of-type { padding-top: 0; }

.content-marker {
  font-size: clamp(0.86rem, 1vw, 1.1rem);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 500;
  padding-top: 0.4em;
}

.content-body { max-width: 64ch; }

.content-title {
  font-family: "Fraunces", serif;
  font-weight: 800;
  font-size: clamp(1.5rem, 2.6vw, 2.6rem);
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0 0 1rem;
  color: var(--ink);
}

.content-lead,
.content-p,
.content-footer {
  margin: 0 0 1rem;
  font-size: clamp(1rem, 1.05vw, 1.18rem);
  line-height: 1.65;
  color: var(--ink-2);
}

.content-lead {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-weight: 500;
  font-size: clamp(1.15rem, 1.3vw, 1.5rem);
  color: var(--ink);
}

.content-footer {
  font-weight: 600;
  color: var(--ink);
}

.content-list {
  list-style: none;
  margin: 0 0 1rem;
  padding: 0;
}
.content-list li {
  position: relative;
  padding: 0.4rem 0 0.4rem 1.6rem;
  font-size: clamp(1rem, 1.05vw, 1.15rem);
  line-height: 1.55;
  color: var(--ink-2);
  border-bottom: 1px dotted var(--line-2, #cfccc1);
}
.content-list li:last-child { border-bottom: none; }
.content-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  top: 0.5rem;
  color: var(--accent);
  font-weight: 700;
}

/* ── shared section heads ── */
.ed-section-head {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 24px;
  margin-bottom: clamp(36px, 4vw, 72px);
}
.ed-section-num {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: clamp(3rem, 6vw, 7rem);
  line-height: 0.85;
  letter-spacing: -0.045em;
  margin-bottom: 10px;
  color: var(--ink);
}
.ed-slash { color: var(--accent); }
.ed-section-title {
  font-family: "Fraunces", serif;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 4.4rem);
  letter-spacing: -0.035em;
  line-height: 0.98;
  color: var(--ink);
  margin: 0;
}
.ed-section-meta {
  font-size: clamp(0.78rem, 0.86vw, 0.92rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

/* ── pros/cons comparison ── */
.comparison-section {
  padding: clamp(64px, 7vw, 120px) 0;
  border-bottom: var(--line-w) solid var(--ink);
}

.comparison-subtitle {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: clamp(1.05rem, 1.2vw, 1.4rem);
  color: var(--ink-2);
  margin: -1.5rem 0 2rem;
  max-width: 60ch;
}

.comparison-grid {
  display: grid;
  border-top: var(--line-w) solid var(--ink);
  border-left: var(--line-w) solid var(--ink);
}

.comparison-grid.pros-cons {
  grid-template-columns: clamp(80px, 9vw, 160px) 1fr 1fr;
}

.comparison-col {
  border-right: var(--line-w) solid var(--ink);
  border-bottom: var(--line-w) solid var(--ink);
  padding: clamp(18px, 1.8vw, 32px) clamp(16px, 1.6vw, 28px);
  font-size: clamp(0.96rem, 1vw, 1.08rem);
  line-height: 1.55;
  color: var(--ink-2);
}

.comparison-col--head {
  background: var(--ink);
  color: var(--paper);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: clamp(14px, 1.4vw, 24px) clamp(16px, 1.6vw, 28px);
}
.comparison-col--head .serif {
  font-family: "Fraunces", serif;
  font-weight: 700;
  font-size: clamp(1.1rem, 1.4vw, 1.6rem);
  letter-spacing: -0.015em;
}
.comparison-col--head .mono {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--hi);
}

.comparison-col--label {
  background: var(--paper);
  display: flex;
  align-items: flex-start;
  padding-top: clamp(20px, 2vw, 36px);
}
.comparison-col--label .mono {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}

.comparison-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.comparison-list li {
  position: relative;
  padding: 0.4rem 0 0.4rem 1.5rem;
  border-bottom: 1px dotted var(--line-2, #cfccc1);
}
.comparison-list li:last-child { border-bottom: none; }
.comparison-list li::before {
  position: absolute;
  left: 0;
  top: 0.55rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.86rem;
  font-weight: 700;
}
.comparison-list--pros li::before {
  content: "+";
  color: var(--accent);
}
.comparison-list--cons li::before {
  content: "−";
  color: var(--muted);
}

/* ── feature matrix comparison ── */
.matrix-grid {
  display: grid;
  grid-template-columns: minmax(160px, 1.4fr) repeat(calc(var(--matrix-cols) - 1), 1fr);
  border-top: var(--line-w) solid var(--ink);
  border-left: var(--line-w) solid var(--ink);
}

.matrix-col {
  border-right: var(--line-w) solid var(--ink);
  border-bottom: var(--line-w) solid var(--ink);
  padding: clamp(14px, 1.4vw, 24px) clamp(14px, 1.4vw, 24px);
  display: flex;
  align-items: center;
  font-size: clamp(0.94rem, 1vw, 1.08rem);
  color: var(--ink-2);
  min-height: clamp(54px, 4vw, 72px);
}

.matrix-col--head {
  background: var(--ink);
  color: var(--paper);
  font-weight: 600;
}
.matrix-col--head .serif {
  font-family: "Fraunces", serif;
  font-weight: 700;
  font-size: clamp(1rem, 1.2vw, 1.4rem);
  letter-spacing: -0.015em;
}
.matrix-col--head .mono {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--hi);
}

.matrix-col--feat { font-weight: 600; }

.matrix-col--label {
  background: var(--paper);
  font-weight: 500;
  color: var(--ink);
}

.matrix-col--val {
  justify-content: center;
}

.matrix-col.is-highlight {
  background: var(--hi);
  color: var(--ink);
}
.matrix-col.is-highlight.matrix-col--head { color: var(--ink); }

.matrix-mark {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.4rem;
  font-weight: 700;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid currentColor;
  border-radius: 50%;
}
.matrix-mark--yes {
  color: var(--accent);
}
.matrix-mark--no {
  color: var(--muted);
}

/* ── calculator ── */
.calculator-section {
  padding: clamp(64px, 7vw, 120px) 0;
  border-bottom: var(--line-w) solid var(--ink);
}

.calc-shell {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0;
  border: var(--line-w) solid var(--ink);
  background: var(--paper);
}

.calc-form {
  padding: clamp(28px, 2.8vw, 52px) clamp(24px, 2.4vw, 44px);
  border-right: var(--line-w) solid var(--ink);
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 2vw, 36px);
}

.calc-group { display: flex; flex-direction: column; gap: 10px; }

.calc-group-label {
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
  margin: 0;
  padding-bottom: 6px;
  border-bottom: var(--line-w) dashed var(--ink);
}

.calc-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
}
.calc-options--check { flex-direction: column; gap: 8px; }

.calc-option {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px;
  font-size: 0.96rem;
  color: var(--ink-2);
  cursor: pointer;
  transition: color 0.15s;
  background: transparent;
}

.calc-option input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.calc-option-mark {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--ink);
  background: var(--bg);
  flex-shrink: 0;
  position: relative;
  transition: background 0.15s, border-color 0.15s;
}

.calc-option:hover { color: var(--ink); }
.calc-option:hover .calc-option-mark { border-color: var(--accent); }

.calc-option:has(input:checked) {
  color: var(--ink);
  font-weight: 600;
}
.calc-option:has(input:checked) .calc-option-mark {
  background: var(--accent);
  border-color: var(--accent);
}
.calc-option:has(input:checked) .calc-option-mark::after {
  content: "";
  position: absolute;
  inset: 3px;
  background: var(--paper);
}

.calc-option-text { line-height: 1.4; }

.calc-more-btn {
  margin-top: 4px;
  align-self: flex-start;
  background: transparent;
  border: 1.5px solid var(--ink);
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  padding: 7px 12px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.calc-more-btn:hover {
  background: var(--ink);
  color: var(--bg);
}

.calc-tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--muted);
  border-radius: 50%;
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: 0.78rem;
  color: var(--muted);
  cursor: help;
  flex-shrink: 0;
}
.calc-tooltip-icon { line-height: 1; }
.calc-tooltip-text {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  left: 50%;
  bottom: 130%;
  transform: translateX(-50%);
  background: var(--ink);
  color: var(--paper);
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-size: 0.78rem;
  font-weight: 400;
  line-height: 1.45;
  padding: 8px 10px;
  border: 1.5px solid var(--ink);
  width: max-content;
  max-width: 220px;
  z-index: 10;
  box-shadow: 4px 4px 0 var(--accent);
  transition: opacity 0.15s, visibility 0.15s;
  text-transform: none;
  letter-spacing: 0;
}
.calc-tooltip:hover .calc-tooltip-text,
.calc-tooltip:focus .calc-tooltip-text,
.calc-tooltip:focus-visible .calc-tooltip-text {
  visibility: visible;
  opacity: 1;
}

.calc-total {
  background: var(--ink);
  color: var(--paper);
  padding: clamp(28px, 2.8vw, 52px) clamp(24px, 2.4vw, 44px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}

.calc-total-label {
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hi);
  font-weight: 500;
}

.calc-total-value {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: clamp(2.6rem, 5vw, 4.6rem);
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--paper);
  font-feature-settings: "tnum";
}

.calc-total-note {
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--color-stats-muted, #b3a791);
  margin-bottom: 10px;
}

.calc-cta {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding: 12px 18px;
  background: var(--accent);
  color: var(--bg);
  border: 1.5px solid var(--accent);
  font-weight: 600;
  font-size: 0.96rem;
  font-family: "Inter", sans-serif;
  transition: transform 0.15s, box-shadow 0.15s;
}
.calc-cta:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--hi);
  color: var(--bg);
}
.calc-cta-arrow { font-family: "Fraunces", serif; font-size: 1.2rem; }

/* ── FAQ section ── */
.page-faq-section {
  padding: clamp(64px, 7vw, 120px) 0;
  border-bottom: var(--line-w) solid var(--ink);
}
.page-faq-section :deep(.app-faq) { margin-top: 0; }
.page-faq-section :deep(.app-faq-title) { display: none; }

/* ── final CTA ── */
.page-cta {
  padding: clamp(80px, 8vw, 160px) 0;
  background: var(--accent);
  color: var(--ink);
}
[data-theme="dark"] .page-cta { color: #1a0e08; }

.cta-pre {
  font-size: 0.86rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 0 1.4rem;
  color: var(--ink);
}

.cta-h {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: clamp(2.2rem, 6vw, 6.4rem);
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin: 0 0 2rem;
  max-width: 22ch;
}
.cta-h em {
  font-style: italic;
  font-weight: 700;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  background: var(--ink);
  color: var(--bg);
  border: 1.5px solid var(--ink);
  font-weight: 600;
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  transition: transform 0.15s, box-shadow 0.15s;
}
.cta-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--paper);
  color: var(--bg);
}

/* ── responsive ── */
@media (max-width: 980px) {
  .article-meta { gap: 14px; }
  .article-icon { margin-left: 0; }
  .content-section {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .content-marker { padding-top: 0; }
  .comparison-grid.pros-cons { grid-template-columns: 1fr; }
  .comparison-col { border-right: none; }
  .comparison-col--head:first-child { display: none; }
  .matrix-grid {
    grid-template-columns: minmax(140px, 1.2fr) repeat(calc(var(--matrix-cols) - 1), 1fr);
    font-size: 0.86rem;
  }
  .matrix-col { padding: 10px 8px; min-height: 48px; }
  .calc-shell { grid-template-columns: 1fr; }
  .calc-form { border-right: none; border-bottom: var(--line-w) solid var(--ink); }
}
</style>
