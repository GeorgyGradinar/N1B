<template>
  <div>
    <!-- ═══════════════════ HERO ═══════════════════ -->
    <section class="hero">
      <div class="hero-grid-bg" aria-hidden="true"></div>
      <div class="hero-glow" aria-hidden="true"></div>

      <div class="hero-content">
        <!-- Left: text -->
        <div class="hero-left">
          <div class="hero-badge">
            <span class="hero-badge-dot" aria-hidden="true"></span>
            {{ t('hero.decorativeBadge') }}
          </div>
          <h1 class="hero-title">{{ t('hero.title') }}</h1>
          <p class="hero-subtitle">{{ t('hero.subtitle') }}</p>
          <div class="hero-actions">
            <a href="#services" class="btn-primary">{{ t('hero.cta') }}</a>
            <a href="#experience" class="btn-ghost">{{ t('sections.experienceTitle') }} →</a>
          </div>
          <div class="hero-stack" aria-label="Tech stack">
            <span v-for="tag in techStack" :key="tag" class="stack-tag">{{ tag }}</span>
          </div>
        </div>

        <!-- Right: floating card (decorative, desktop only) -->
        <div class="hero-right" aria-hidden="true">
          <div class="hero-card">
            <div class="hero-card-status">
              <span class="status-dot"></span>
              <span class="status-text">{{ t('hero.cardStatus') }}</span>
            </div>
            <div class="hero-card-metrics">
              <div class="hero-metric">
                <span class="hero-metric-value">3+</span>
                <span class="hero-metric-label">{{ t('experience.statYears') }}</span>
              </div>
              <div class="hero-metric-sep"></div>
              <div class="hero-metric">
                <span class="hero-metric-value">50+</span>
                <span class="hero-metric-label">{{ t('experience.statProjects') }}</span>
              </div>
              <div class="hero-metric-sep"></div>
              <div class="hero-metric">
                <span class="hero-metric-value">30+</span>
                <span class="hero-metric-label">{{ t('experience.statClients') }}</span>
              </div>
            </div>
            <ul class="hero-card-features">
              <li v-for="(feat, i) in heroCardFeatures" :key="i">
                <span class="feat-check" aria-hidden="true">✓</span> {{ feat }}
              </li>
            </ul>
            <div class="hero-card-stack">
              <span v-for="t2 in ['Vue', 'React', 'Node', 'Flutter', 'AWS']" :key="t2" class="hero-card-tag">{{ t2 }}</span>
            </div>
          </div>

          <!-- Floating decorative blobs behind card -->
          <div class="hero-blob hero-blob--1" aria-hidden="true"></div>
          <div class="hero-blob hero-blob--2" aria-hidden="true"></div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ SERVICES ═══════════════════ -->
    <section id="services" class="section section-services">
      <div class="section-header animate-up">
        <div class="section-label">{{ t('sections.servicesTitle') }}</div>
        <h2 class="section-title">{{ t('sections.servicesTitle') }}</h2>
        <p class="section-subtitle">{{ t('hero.subtitle') }}</p>
      </div>

      <div class="services-tabs animate-up" style="--delay: 0.1s">
        <!-- Left: category tabs -->
        <div class="services-tabs-nav" role="tablist">
          <button
            v-for="(cat, i) in SERVICES_TREE"
            :key="cat.id"
            type="button"
            role="tab"
            :aria-selected="activeTabId === cat.id"
            class="services-tab-btn"
            :class="{ 'services-tab-btn--active': activeTabId === cat.id }"
            :style="{ '--delay': `${i * 0.07}s` }"
            @click="activeTabId = cat.id"
          >
            <span class="services-tab-icon" aria-hidden="true">{{ cat.icon }}</span>
            <span class="services-tab-label">{{ t(`servicesTree.${cat.id}.title`) }}</span>
            <span class="services-tab-count">{{ cat.subKeys.length }}</span>
          </button>
        </div>

        <!-- Right: panel -->
        <div class="services-tabs-panel" role="tabpanel">
          <Transition name="tab-panel" mode="out-in">
            <div :key="activeTabId" class="services-panel-inner">
              <div class="services-panel-hero">
                <div class="services-panel-icon-wrap">
                  <span aria-hidden="true">{{ activeTabCategory?.icon }}</span>
                </div>
                <div class="services-panel-info">
                  <h3 class="services-panel-title">
                    {{ activeTabCategory && t(`servicesTree.${activeTabCategory.id}.title`) }}
                  </h3>
                  <p class="services-panel-desc">
                    {{ activeTabCategory && t(`servicesTree.${activeTabCategory.id}.shortDesc`) }}
                  </p>
                </div>
              </div>

              <ul class="services-panel-list" role="list">
                <li
                  v-for="(subKey, idx) in (activeTabCategory?.subKeys ?? [])"
                  :key="subKey"
                  class="panel-item"
                  :style="{ '--item-idx': idx }"
                >
                  <NuxtLink
                    :to="localePath(`/services/${activeTabCategory!.id}/${subKey}`)"
                    class="panel-item-link"
                  >
                    <span class="panel-item-num">{{ String(idx + 1).padStart(2, '0') }}</span>
                    <span class="panel-item-text">{{ t(`servicesTree.${activeTabCategory!.id}.sub.${subKey}`) }}</span>
                    <svg class="panel-item-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ STATS / EXPERIENCE ═══════════════════ -->
    <div id="experience" class="stats-outer">
      <div class="stats-grid-bg" aria-hidden="true"></div>
      <div class="section section-experience">
        <div class="section-label light animate-up">{{ t('sections.experienceTitle') }}</div>
        <h2 class="section-title light animate-up" style="--delay: 0.08s">{{ t('sections.experienceTitle') }}</h2>
        <p class="experience-lead animate-up" style="--delay: 0.15s">
          {{ t('experience.lead', { years: t('experience.years') }) }}
        </p>

        <div class="stats-row">
          <div class="stat-card animate-up" style="--delay: 0.05s">
            <span class="stat-value">{{ displayStats.years }}<span class="stat-plus">+</span></span>
            <span class="stat-label">{{ t('experience.statYears') }}</span>
          </div>
          <div class="stat-divider animate-up" style="--delay: 0.1s" aria-hidden="true"></div>
          <div class="stat-card animate-up" style="--delay: 0.15s">
            <span class="stat-value">{{ displayStats.projects }}<span class="stat-plus">+</span></span>
            <span class="stat-label">{{ t('experience.statProjects') }}</span>
          </div>
          <div class="stat-divider animate-up" style="--delay: 0.2s" aria-hidden="true"></div>
          <div class="stat-card animate-up" style="--delay: 0.25s">
            <span class="stat-value">{{ displayStats.clients }}<span class="stat-plus">+</span></span>
            <span class="stat-label">{{ t('experience.statClients') }}</span>
          </div>
        </div>

        <p class="experience-text animate-up" style="--delay: 0.1s">{{ t('experience.text') }}</p>
      </div>
    </div>

    <!-- ═══════════════════ FAQ ═══════════════════ -->
    <section id="faq" class="section section-faq">
      <div class="section-header animate-up">
        <div class="section-label">FAQ</div>
        <h2 class="section-title">{{ t('sections.faqTitle') }}</h2>
      </div>

      <div class="faq-list">
        <div
          v-for="(item, index) in faq"
          :key="index"
          class="faq-item"
          :class="{ 'faq-item--open': openFaq === index }"
        >
          <button
            type="button"
            class="faq-question"
            :aria-expanded="openFaq === index"
            @click="openFaq = openFaq === index ? -1 : index"
          >
            <span class="faq-num" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="faq-question-text">{{ item.q }}</span>
            <span class="faq-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4.5 6.75 9 11.25l4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">
              <p>{{ item.a }}</p>
            </div>
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

const heroCardFeatures = computed(() => {
  const raw = get<unknown>('hero.cardFeatures')
  return Array.isArray(raw) ? (raw as string[]) : []
})

const techStack = ['Vue', 'React', 'Node.js', 'Flutter', 'AWS', 'Python', 'AI / ML']

// ── Services tabs ──
const activeTabId = ref<ServiceCategoryId>(SERVICES_TREE[0].id)
const activeTabCategory = computed(() =>
  SERVICES_TREE.find((c) => c.id === activeTabId.value) ?? null
)

// ── FAQ ──
const faq = computed(() => get<Array<{ q: string; a: string }>>('faq'))
const openFaq = ref(0)

// ── Animated counters ──
const displayStats = reactive({ years: 0, projects: 0, clients: 0 })

function animateValue(key: keyof typeof displayStats, target: number, duration = 1800) {
  const start = performance.now()
  function tick(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayStats[key] = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// ── Scroll-reveal + counter trigger ──
onMounted(() => {
  // Generic scroll reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.animate-up').forEach((el) => revealObserver.observe(el))

  // Counter animation when stats section is in view
  const statsEl = document.getElementById('experience')
  if (statsEl) {
    let animated = false
    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          animated = true
          animateValue('years', 3, 1400)
          animateValue('projects', 50, 1800)
          animateValue('clients', 30, 1600)
        }
      },
      { threshold: 0.25 }
    )
    statsObserver.observe(statsEl)
  }
})
</script>

<style scoped>
/* ═══════════════ HERO ═══════════════ */
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  padding: 5rem 2rem;
  overflow: hidden;
  background: linear-gradient(145deg, var(--color-hero-from) 0%, var(--color-hero-mid) 55%, var(--color-hero-to) 100%);
}

.hero-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(var(--color-accent-rgb), 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(var(--color-accent-rgb), 0.06) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%);
}

.hero-glow {
  position: absolute;
  top: -15%;
  left: 30%;
  transform: translateX(-50%);
  width: 800px;
  height: 600px;
  background: radial-gradient(ellipse, rgba(var(--color-accent-rgb), 0.1) 0%, transparent 65%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

/* ── Hero Left ── */
.hero-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-accent);
  background: var(--color-tag-bg);
  border: 1px solid var(--color-tag-border);
  border-radius: 100px;
  width: fit-content;
}

.hero-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.7); }
}

.hero-title {
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--color-hero-text);
}

.hero-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.65rem;
  background: var(--color-accent);
  color: #fff;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.93rem;
  text-decoration: none;
  transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
  box-shadow: 0 4px 18px rgba(var(--color-accent-rgb), 0.38);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  color: #fff;
  text-decoration: none;
  transform: translateY(-2px);
  box-shadow: 0 7px 28px rgba(var(--color-accent-rgb), 0.48);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.65rem;
  border: 1px solid var(--color-card-border);
  color: var(--color-text);
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.93rem;
  text-decoration: none;
  background: var(--color-card-bg);
  transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.18s;
}

.btn-ghost:hover {
  border-color: rgba(var(--color-accent-rgb), 0.5);
  color: var(--color-accent);
  text-decoration: none;
  background: var(--color-tag-bg);
  transform: translateY(-2px);
}

.hero-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.stack-tag {
  padding: 0.28rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 100px;
  color: var(--color-text-muted);
  transition: color 0.2s, border-color 0.2s;
}

.stack-tag:hover {
  color: var(--color-accent);
  border-color: rgba(var(--color-accent-rgb), 0.4);
}

/* ── Hero Right (floating card) ── */
.hero-right {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
}

.hero-blob--1 {
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, rgba(var(--color-accent-rgb), 0.15) 0%, transparent 70%);
  top: -40px;
  right: -40px;
  animation: blobFloat1 10s ease-in-out infinite;
}

.hero-blob--2 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(var(--color-accent-rgb), 0.08) 0%, transparent 70%);
  bottom: -20px;
  left: 10px;
  animation: blobFloat2 13s ease-in-out infinite;
}

@keyframes blobFloat1 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-15px, -20px); }
  66% { transform: translate(10px, -10px); }
}

@keyframes blobFloat2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -15px); }
}

.hero-card {
  position: relative;
  z-index: 1;
  background: var(--color-glass-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--color-glass-border);
  border-radius: 24px;
  padding: 1.75rem;
  width: 100%;
  max-width: 340px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.1),
    0 4px 16px rgba(var(--color-accent-rgb), 0.08);
  animation: cardFloat 8s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

@keyframes cardFloat {
  0%, 100% { transform: translateY(0px); }
  40% { transform: translateY(-10px); }
  70% { transform: translateY(-5px); }
}

.hero-card-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
  flex-shrink: 0;
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2); }
  50% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.08); }
}

.hero-card-metrics {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--color-bg);
  border-radius: 14px;
  padding: 1rem 0.5rem;
}

.hero-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 0.2rem;
}

.hero-metric-value {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--color-text);
  line-height: 1;
}

.hero-metric-label {
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
}

.hero-metric-sep {
  width: 1px;
  height: 32px;
  background: var(--color-card-border);
}

.hero-card-features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-text-muted);
}

.hero-card-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feat-check {
  color: #22c55e;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
}

.hero-card-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding-top: 0.25rem;
  border-top: 1px solid var(--color-card-border);
}

.hero-card-tag {
  padding: 0.22rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 600;
  background: var(--color-tag-bg);
  color: var(--color-accent);
  border: 1px solid var(--color-tag-border);
  border-radius: 6px;
}

/* ═══════════════ SERVICES ═══════════════ */
.section-services {
  background: var(--color-bg);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header .section-label {
  display: block;
  text-align: center;
}

.section-header .section-title {
  margin-bottom: 0.75rem;
}

.section-subtitle {
  font-size: 0.975rem;
  color: var(--color-text-muted);
  margin: 0 auto;
  max-width: 520px;
  line-height: 1.65;
}

/* ── Tabs layout ── */
.services-tabs {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* ── Nav (left column) ── */
.services-tabs-nav {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: sticky;
  top: 5rem;
}

.services-tab-btn {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  padding: 1rem 1.15rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 14px;
  cursor: pointer;
  text-align: left;
  transition:
    border-color 0.22s,
    background 0.22s,
    box-shadow 0.22s,
    color 0.18s;
  color: var(--color-text-muted);
  position: relative;
  overflow: hidden;
}

.services-tab-btn::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-accent);
  border-radius: 0 3px 3px 0;
  opacity: 0;
  transition: opacity 0.22s;
}

.services-tab-btn:hover {
  border-color: rgba(var(--color-accent-rgb), 0.35);
  background: var(--color-tag-bg);
  color: var(--color-text);
}

.services-tab-btn--active {
  border-color: rgba(var(--color-accent-rgb), 0.5);
  background: var(--color-tag-bg);
  color: var(--color-text);
  box-shadow: 0 4px 20px rgba(var(--color-accent-rgb), 0.1);
}

.services-tab-btn--active::before {
  opacity: 1;
}

.services-tab-icon {
  font-size: 1.25rem;
  line-height: 1;
  flex-shrink: 0;
  width: 2rem;
  text-align: center;
}

.services-tab-label {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.3;
}

.services-tab-count {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.12);
  border-radius: 100px;
  padding: 0.15rem 0.5rem;
  flex-shrink: 0;
}

/* ── Panel (right column) ── */
.services-tabs-panel {
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  min-height: 420px;
}

.services-panel-inner {
  padding: 2rem;
  height: 100%;
}

/* Panel hero row */
.services-panel-hero {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-card-border);
}

.services-panel-icon-wrap {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  background: var(--color-service-icon-bg);
  border-radius: 18px;
  flex-shrink: 0;
  border: 1px solid rgba(var(--color-accent-rgb), 0.12);
}

.services-panel-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.35rem;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.services-panel-desc {
  margin: 0;
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Panel list */
.services-panel-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.55rem;
}

.panel-item {
  animation: panelItemIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--item-idx, 0) * 0.05s);
}

@keyframes panelItemIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.panel-item-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.85rem 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  transition:
    border-color 0.2s,
    background 0.2s,
    color 0.2s,
    box-shadow 0.2s;
}

.panel-item-link:hover {
  border-color: rgba(var(--color-accent-rgb), 0.5);
  background: var(--color-tag-bg);
  color: var(--color-accent);
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(var(--color-accent-rgb), 0.1);
}

.panel-item-num {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-accent);
  opacity: 0.6;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  min-width: 1.5rem;
}

.panel-item-text {
  flex: 1;
  line-height: 1.35;
}

.panel-item-arrow {
  flex-shrink: 0;
  color: var(--color-text-muted);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.18s, transform 0.18s, color 0.18s;
}

.panel-item-link:hover .panel-item-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--color-accent);
}

/* Tab panel transition */
.tab-panel-enter-active {
  transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.tab-panel-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.tab-panel-enter-from {
  opacity: 0;
  transform: translateX(14px);
}

.tab-panel-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* ═══════════════ STATS / EXPERIENCE ═══════════════ */
.stats-outer {
  position: relative;
  overflow: hidden;
  background: var(--color-stats-bg);
}

.stats-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(var(--color-accent-rgb), 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(var(--color-accent-rgb), 0.035) 1px, transparent 1px);
  background-size: 52px 52px;
}

.section-experience {
  position: relative;
  z-index: 1;
  text-align: center;
}

.section-experience .section-label {
  display: block;
  text-align: center;
}

.section-experience .section-title {
  color: var(--color-stats-text);
  margin-bottom: 1rem;
}

.experience-lead {
  font-size: 1.1rem;
  color: var(--color-stats-muted);
  margin: 0 auto 3.5rem;
  max-width: 520px;
  line-height: 1.68;
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 3.5rem;
}

.stat-value {
  font-size: clamp(2.8rem, 5.5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1;
  color: var(--color-stats-value);
  display: flex;
  align-items: flex-start;
}

.stat-plus {
  font-size: 55%;
  margin-top: 0.4em;
  margin-left: 0.05em;
  color: var(--color-accent);
}

.stat-label {
  margin-top: 0.65rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-stats-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.stat-divider {
  width: 1px;
  height: 64px;
  background: var(--color-stats-divider);
}

.experience-text {
  margin: 0 auto;
  max-width: 540px;
  color: var(--color-stats-muted);
  line-height: 1.72;
  font-size: 0.95rem;
}

/* ═══════════════ FAQ ═══════════════ */
.section-faq {
  background: var(--color-bg);
}

.section-faq .section-header {
  margin-bottom: 2.5rem;
}

.faq-list {
  max-width: 740px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.faq-item {
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.faq-item--open {
  border-color: rgba(var(--color-accent-rgb), 0.4);
  box-shadow: 0 4px 20px rgba(var(--color-accent-rgb), 0.07);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  font-size: 0.93rem;
  font-weight: 600;
  text-align: left;
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s;
}

.faq-question:hover {
  background: var(--color-tag-bg);
}

.faq-num {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-accent);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  letter-spacing: 0.05em;
  min-width: 1.5rem;
}

.faq-question-text {
  flex: 1;
  line-height: 1.4;
}

.faq-icon {
  flex-shrink: 0;
  color: var(--color-text-muted);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s;
  display: flex;
  align-items: center;
}

.faq-item--open .faq-icon {
  transform: rotate(180deg);
  color: var(--color-accent);
}

/* FAQ accordion - grid-template-rows trick (most reliable CSS height animation) */
.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.32s ease;
}

.faq-item--open .faq-answer {
  grid-template-rows: 1fr;
}

.faq-answer-inner {
  overflow: hidden;
  padding: 0 1.5rem 0 3.5rem;
  transition: padding 0.32s ease;
}

.faq-item--open .faq-answer-inner {
  padding: 0 1.5rem 1.35rem 3.5rem;
}

.faq-answer-inner p {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.72;
  font-size: 0.9rem;
}

/* ═══════════════ RESPONSIVE ═══════════════ */
@media (max-width: 960px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-left {
    align-items: center;
  }

  .hero-badge {
    align-self: center;
  }

  .hero-right {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 85vh;
    padding: 4rem 1.25rem;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }

  .btn-primary,
  .btn-ghost {
    justify-content: center;
    width: 100%;
  }

  .services-tabs {
    grid-template-columns: 1fr;
  }

  .services-tabs-nav {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .services-tab-btn {
    flex: 1 1 calc(50% - 0.2rem);
    min-width: 140px;
    padding: 0.75rem 0.85rem;
  }

  .services-tab-btn--active {
  }

  .services-panel-list {
    grid-template-columns: 1fr;
  }

  .stats-row {
    flex-direction: column;
    gap: 0;
  }

  .stat-card {
    padding: 1.25rem 2rem;
  }

  .stat-divider {
    width: 60px;
    height: 1px;
  }

  .faq-question {
    padding: 1rem 1.25rem;
  }

  .faq-answer {
    padding: 0 1.25rem 0 1.25rem;
  }

  .faq-item--open .faq-answer {
    padding: 0 1.25rem 1rem 1.25rem;
  }
}
</style>
