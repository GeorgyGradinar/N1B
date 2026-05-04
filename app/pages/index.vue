<template>
  <div>
    <!-- ═══════════════════ HERO ═══════════════════ -->
    <section class="ed-hero">
      <div class="ed-issue" aria-hidden="true">N1B</div>

      <div class="ed-wrap ed-hero-inner">
        <div class="ed-eyebrow">
          <span class="ed-eyebrow-dot" aria-hidden="true"></span>
          <span class="mono">{{ t('hero.decorativeBadge') }} / Vol. 03</span>
        </div>

        <div class="ed-hero-grid">
          <div class="ed-hero-left">
            <h1 class="ed-h1">
              <span class="ed-h1-line">{{ heroLines[0] }}</span>
              <span class="ed-h1-line ed-h1-italic">{{ heroLines[1] }}</span>
              <span class="ed-h1-line ed-h1-mark">{{ heroLines[2] }}</span>
            </h1>

            <p class="ed-lead">{{ t('hero.subtitle') }}</p>

            <div class="ed-hero-cta">
              <a href="#services" class="ed-btn">{{ t('hero.cta') }} →</a>
              <a href="#experience" class="ed-btn ghost">{{ t('sections.experienceTitle') }} →</a>
            </div>

            <div class="ed-stack-line">
              <span class="ed-chip alt">Stack —</span>
              <span v-for="tag in techStack" :key="tag" class="ed-chip">{{ tag }}</span>
            </div>
          </div>

          <aside class="ed-hero-meta" aria-hidden="true">
            <div class="ed-stamp ed-stamp--accent">
              <small>{{ t('experience.statYears') }}</small>
              <b>3<span class="ed-stamp-plus">+</span></b>
            </div>
            <div class="ed-stamp ed-stamp--blue">
              <small>{{ t('experience.statProjects') }}</small>
              <b>50<span class="ed-stamp-plus">+</span></b>
            </div>
            <div class="ed-stamp ed-stamp--ink">
              <small>{{ t('experience.statClients') }}</small>
              <b>30<span class="ed-stamp-plus">+</span></b>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ SERVICES ═══════════════════ -->
    <section id="services" class="ed-section">
      <div class="ed-wrap">
        <div class="ed-section-head animate-up">
          <div>
            <div class="ed-section-num">01<span class="ed-slash">/</span>03</div>
            <h2 class="ed-section-title serif">{{ t('sections.servicesTitle') }}</h2>
          </div>
          <div class="ed-section-meta mono">{{ totalSubsLabel }}</div>
        </div>

        <div class="ed-svc-grid">
          <article
            v-for="(card, ci) in serviceCards"
            :key="card.cat.id"
            class="ed-svc-card"
            :class="card.layoutClass"
            :style="{ '--delay': `${ci * 0.06}s` }"
          >
            <div class="ed-svc-link">
              <div class="ed-svc-num-row">
                <span class="ed-svc-num mono">SVC.{{ String(ci + 1).padStart(3, '0') }}</span>
                <span class="ed-svc-num-sep mono" aria-hidden="true">·</span>
                <span class="ed-svc-icon" aria-hidden="true">
                  <svg v-if="card.cat.id === 'sites'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter">
                    <rect x="2" y="4" width="20" height="16"/>
                    <line x1="2" y1="9" x2="22" y2="9"/>
                  </svg>
                  <svg v-else-if="card.cat.id === 'apps'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter">
                    <rect x="7" y="2" width="10" height="20"/>
                    <line x1="10" y1="18" x2="14" y2="18"/>
                  </svg>
                  <svg v-else-if="card.cat.id === 'optimization'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter">
                    <path d="M14 2 L5 13 L11 13 L10 22 L19 11 L13 11 Z"/>
                  </svg>
                  <svg v-else-if="card.cat.id === 'recruitment'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 22 C 4 17, 8 14, 12 14 C 16 14, 20 17, 20 22"/>
                  </svg>
                </span>
              </div>
              <h3 class="ed-svc-title serif">{{ t(`servicesTree.${card.cat.id}.title`) }}</h3>
              <p class="ed-svc-desc">{{ t(`servicesTree.${card.cat.id}.shortDesc`) }}</p>
              <ul class="ed-svc-list">
                <li v-for="(subKey, idx) in card.cat.subKeys" :key="subKey">
                  <NuxtLink
                    :to="localePath(`/services/${card.cat.id}/${subKey}`)"
                    class="ed-svc-list-link"
                  >
                    <span class="ed-svc-list-text">{{ t(`servicesTree.${card.cat.id}.sub.${subKey}`) }}</span>
                    <small class="ed-svc-list-num">{{ String(idx + 1).padStart(2, '0') }}</small>
                    <span class="ed-svc-list-arrow" aria-hidden="true">→</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ STATS / EXPERIENCE ═══════════════════ -->
    <section id="experience" class="ed-stats-section">
      <div class="ed-wrap">
        <div class="ed-section-head animate-up">
          <div>
            <div class="ed-section-num light">02<span class="ed-slash hi">/</span>03</div>
            <h2 class="ed-section-title light serif">
              {{ t('sections.experienceTitle') }}<br/>
              <em>{{ statsTitleSuffix }}</em>
            </h2>
          </div>
          <div class="ed-section-meta mono light">— {{ new Date().getFullYear() }} · {{ t('experience.years') }}</div>
        </div>

        <div class="ed-stats-row">
          <div class="ed-stat animate-up" style="--delay: 0.05s">
            <div class="ed-stat-num serif">{{ displayStats.years }}<span class="ed-stat-plus">+</span></div>
            <div class="ed-stat-label mono">{{ t('experience.statYears') }}</div>
            <p class="ed-stat-note">{{ t('experience.lead', { years: t('experience.years') }) }}</p>
          </div>
          <div class="ed-stat animate-up" style="--delay: 0.15s">
            <div class="ed-stat-num serif">{{ displayStats.projects }}<span class="ed-stat-plus">+</span></div>
            <div class="ed-stat-label mono">{{ t('experience.statProjects') }}</div>
            <p class="ed-stat-note">{{ t('experience.text') }}</p>
          </div>
          <div class="ed-stat animate-up" style="--delay: 0.25s">
            <div class="ed-stat-num serif">{{ displayStats.clients }}<span class="ed-stat-plus">+</span></div>
            <div class="ed-stat-label mono">{{ t('experience.statClients') }}</div>
            <p class="ed-stat-note">{{ t('experience.text') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ FAQ ═══════════════════ -->
    <section id="faq" class="ed-section">
      <div class="ed-wrap">
        <div class="ed-section-head animate-up">
          <div>
            <div class="ed-section-num">03<span class="ed-slash">/</span>03</div>
            <h2 class="ed-section-title serif">{{ t('sections.faqTitle') }}</h2>
          </div>
          <div class="ed-section-meta mono">— {{ faq.length }}</div>
        </div>

        <div class="ed-faq-list">
          <article
            v-for="(item, index) in faq"
            :key="index"
            class="ed-faq-item"
            :class="{ 'is-open': openFaq === index }"
            @click="openFaq = openFaq === index ? -1 : index"
          >
            <div class="ed-faq-num mono">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="ed-faq-body">
              <div class="ed-faq-q serif">{{ item.q }}</div>
              <div class="ed-faq-a">{{ item.a }}</div>
            </div>
            <div class="ed-faq-toggle serif" aria-hidden="true">{{ openFaq === index ? '−' : '+' }}</div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ServiceCategoryId } from '~/utils/services'
import { SERVICES_TREE } from '~/utils/services'

const { t, get, locale, localePath } = useAppI18n()

const techStack = ['Vue', 'React', 'Node.js', 'Flutter', 'AWS', 'Python', 'AI / ML']

// ── Hero headline split into 3 lines for editorial typography ──
const heroLines = computed(() => {
  // Localized 3-line split for editorial headline
  const map: Record<string, [string, string, string]> = {
    en: ['N1B —', 'Full-Cycle', 'IT Solutions.'],
    ru: ['N1B —', 'Полный цикл', 'IT-решений.'],
    ka: ['N1B —', 'სრული ციკლი', 'IT-გადაწყვეტილებების.']
  }
  return map[String(locale.value)] ?? map.en
})

const statsTitleSuffix = computed(() => {
  const map: Record<string, string> = {
    en: 'numbers on record.',
    ru: 'цифры под запись.',
    ka: 'ციფრები ჩანაწერისთვის.'
  }
  return map[String(locale.value)] ?? map.en
})

// ── Services cards ──
// Layout pattern adapts to count so the 12-column grid always fills cleanly.
type ServiceCard = {
  cat: typeof SERVICES_TREE[number]
  layoutClass: string
}

const SVC_LAYOUTS: Record<number, string[]> = {
  1: ['ed-svc-card--span-12'],
  2: ['ed-svc-card--span-7', 'ed-svc-card--span-5'],
  3: ['ed-svc-card--span-4', 'ed-svc-card--span-4', 'ed-svc-card--span-4'],
  4: ['ed-svc-card--span-8', 'ed-svc-card--span-4', 'ed-svc-card--span-4', 'ed-svc-card--span-8'],
  5: ['ed-svc-card--span-8', 'ed-svc-card--span-4', 'ed-svc-card--span-4', 'ed-svc-card--span-4', 'ed-svc-card--span-4'],
  6: ['ed-svc-card--span-4', 'ed-svc-card--span-4', 'ed-svc-card--span-4', 'ed-svc-card--span-4', 'ed-svc-card--span-4', 'ed-svc-card--span-4']
}

const serviceCards = computed<ServiceCard[]>(() => {
  const layouts = SVC_LAYOUTS[SERVICES_TREE.length] ?? SERVICES_TREE.map(() => 'ed-svc-card--span-4')
  return SERVICES_TREE.map((cat, i) => ({
    cat,
    layoutClass: layouts[i] ?? 'ed-svc-card--span-4'
  }))
})

const totalSubsLabel = computed(() => {
  const total = SERVICES_TREE.reduce((acc, c) => acc + c.subKeys.length, 0)
  return `— ${SERVICES_TREE.length} categories · ${total} services`
})

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
  // Activate the hide-until-revealed styles only after JS is running.
  // Without this gate, a JS error would leave content invisible forever.
  document.documentElement.classList.add('js-ready')

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
.ed-hero {
  padding: clamp(48px, 5vw, 96px) 0 clamp(80px, 8vw, 160px);
  border-bottom: var(--line-w) solid var(--ink);
  position: relative;
  overflow: hidden;
}

.ed-issue {
  position: absolute;
  right: -40px;
  top: 80px;
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: clamp(16rem, 32vw, 42rem);
  line-height: 0.8;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--ink);
  opacity: 0.08;
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.06em;
}

.ed-hero-inner {
  position: relative;
  z-index: 1;
}

.ed-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: clamp(28px, 3vw, 56px);
}

.ed-eyebrow-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px rgba(var(--accent-rgb), 0.18);
  animation: ed-pulse 2s ease-in-out infinite;
}

@keyframes ed-pulse {
  0%, 100% { box-shadow: 0 0 0 4px rgba(var(--accent-rgb), 0.18); }
  50%      { box-shadow: 0 0 0 8px rgba(var(--accent-rgb), 0.06); }
}

.ed-hero-grid {
  display: grid;
  grid-template-columns: 1.5fr 0.7fr;
  gap: clamp(36px, 4vw, 80px);
  align-items: end;
}

.ed-h1 {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: clamp(2.6rem, 9.4vw, 12rem);
  line-height: 0.9;
  letter-spacing: -0.045em;
  color: var(--ink);
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.04em;
}

.ed-h1-italic {
  font-style: italic;
  font-weight: 600;
  color: var(--accent);
}

.ed-h1-mark {
  background: var(--hi);
  padding: 0 0.12em;
  align-self: flex-start;
  color: var(--ink);
  display: inline-block;
  width: fit-content;
  max-width: 100%;
}

[data-theme="dark"] .ed-h1-mark {
  color: #0b0b0b;
}

.ed-lead {
  font-size: clamp(1.05rem, 1.18vw, 1.32rem);
  line-height: 1.5;
  color: var(--ink-2);
  max-width: 42ch;
  margin: clamp(28px, 2.6vw, 44px) 0 0;
}

.ed-lead::first-letter {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: 3.2em;
  float: left;
  line-height: 0.85;
  margin: 0.1em 0.14em 0 0;
  color: var(--accent);
}

.ed-hero-cta {
  display: flex;
  gap: 12px;
  margin-top: clamp(28px, 3vw, 48px);
  flex-wrap: wrap;
}

.ed-stack-line {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: clamp(28px, 3vw, 48px);
  padding-top: clamp(20px, 2vw, 32px);
  border-top: var(--line-w) dashed var(--ink);
}

/* hero meta column (stamps) */
.ed-hero-meta {
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 1.4vw, 22px);
  align-items: flex-end;
  justify-self: end;
  width: 100%;
  max-width: 380px;
}

.ed-stamp {
  border: var(--line-w) solid var(--ink);
  padding: clamp(14px, 1.4vw, 22px) clamp(18px, 1.8vw, 28px);
  background: var(--paper);
  width: 100%;
  text-align: right;
}

.ed-stamp small {
  font-family: "JetBrains Mono", monospace;
  text-transform: uppercase;
  font-size: clamp(0.7rem, 0.78vw, 0.84rem);
  letter-spacing: 0.16em;
  color: var(--muted);
  display: block;
  margin-bottom: 8px;
}

.ed-stamp b {
  display: block;
  font-family: "Fraunces", serif;
  font-size: clamp(2.4rem, 3.4vw, 4rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.ed-stamp-plus {
  color: var(--accent);
  font-style: italic;
}

.ed-stamp--accent { transform: rotate(2deg); box-shadow: 6px 6px 0 var(--accent); }
.ed-stamp--blue   { transform: rotate(-3deg); box-shadow: 6px 6px 0 var(--accent-2); }
.ed-stamp--ink    { transform: rotate(1deg); box-shadow: 6px 6px 0 var(--ink); }

/* ═══════════════ SHARED SECTION ═══════════════ */
.ed-section {
  padding: clamp(64px, 6vw, 120px) 0;
  border-bottom: var(--line-w) solid var(--ink);
}

.ed-section-head {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 24px;
  margin-bottom: clamp(48px, 5vw, 96px);
}

.ed-section-num {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: clamp(4rem, 7.6vw, 10rem);
  line-height: 0.85;
  letter-spacing: -0.045em;
  color: var(--ink);
  margin-bottom: 14px;
}

.ed-section-num.light { color: var(--color-stats-text); }
.ed-slash { color: var(--accent); }
.ed-slash.hi { color: var(--hi); }

.ed-section-title {
  font-family: "Fraunces", serif;
  font-weight: 800;
  font-size: clamp(2rem, 5.4vw, 7rem);
  letter-spacing: -0.035em;
  line-height: 0.98;
  color: var(--ink);
  margin: 0;
}

.ed-section-title em {
  font-style: italic;
  font-weight: 500;
  color: var(--accent);
}

.ed-section-title.light { color: var(--color-stats-text); }
.ed-section-title.light em { color: var(--accent); }

.ed-section-meta {
  font-family: "JetBrains Mono", monospace;
  font-size: clamp(0.78rem, 0.88vw, 0.94rem);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--muted);
  align-self: end;
}

.ed-section-meta.light { color: var(--color-stats-muted); }

/* ═══════════════ SERVICES ═══════════════ */
.ed-svc-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0;
  border-top: var(--line-w) solid var(--ink);
  border-left: var(--line-w) solid var(--ink);
}

.ed-svc-card {
  grid-column: span 4;
  border-right: var(--line-w) solid var(--ink);
  border-bottom: var(--line-w) solid var(--ink);
  background: var(--bg);
  position: relative;
  transition: background 0.2s ease, color 0.2s ease;
  display: flex;
  min-height: clamp(280px, 22vw, 420px);
}

.ed-svc-card--span-4  { grid-column: span 4; }
.ed-svc-card--span-5  { grid-column: span 5; }
.ed-svc-card--span-6  { grid-column: span 6; }
.ed-svc-card--span-7  { grid-column: span 7; }
.ed-svc-card--span-8  { grid-column: span 8; }
.ed-svc-card--span-12 { grid-column: span 12; }

.ed-svc-link {
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 1.4vw, 22px);
  padding: clamp(28px, 2.8vw, 52px) clamp(24px, 2.4vw, 44px);
  width: 100%;
  height: 100%;
  color: var(--ink);
  position: relative;
}

.ed-svc-card:hover {
  background: var(--ink);
}
.ed-svc-card:hover .ed-svc-link { color: var(--bg); }
.ed-svc-card:hover .ed-svc-num,
.ed-svc-card:hover .ed-svc-desc { color: var(--hi); }

.ed-svc-num-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
}

.ed-svc-num {
  font-size: clamp(0.78rem, 0.84vw, 0.9rem);
  letter-spacing: 0.18em;
  color: var(--muted);
  text-transform: uppercase;
}

.ed-svc-num-sep {
  font-size: clamp(0.78rem, 0.84vw, 0.9rem);
  color: var(--muted);
  opacity: 0.6;
}

.ed-svc-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ink);
  transition: color 0.2s ease;
}

.ed-svc-icon svg {
  display: block;
}

.ed-svc-card:hover .ed-svc-icon { color: var(--hi); }

.ed-svc-title {
  font-family: "Fraunces", serif;
  font-weight: 800;
  font-size: clamp(2.2rem, 2.8vw, 3.6rem);
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0;
}

.ed-svc-desc {
  font-size: clamp(0.96rem, 1.04vw, 1.15rem);
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 52ch;
  margin: 0;
}

.ed-svc-card:hover .ed-svc-desc { color: var(--hi); opacity: 0.85; }

.ed-svc-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: auto 0 0;
  padding: 18px 0 0;
  border-top: var(--line-w) dashed currentColor;
  font-size: clamp(0.95rem, 1.02vw, 1.12rem);
}

.ed-svc-list li {
  border-bottom: 1px dashed currentColor;
}
.ed-svc-list li:last-child { border-bottom: none; }

.ed-svc-list-link {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: baseline;
  gap: 12px;
  padding: 10px 0;
  color: inherit;
  text-decoration: none;
  position: relative;
  transition: color 0.15s ease, padding 0.18s ease;
}

.ed-svc-list-link:hover {
  color: var(--accent);
  padding-left: 6px;
  padding-right: 6px;
}

.ed-svc-card:hover .ed-svc-list-link:hover { color: var(--hi); }

.ed-svc-list-num {
  font-family: "JetBrains Mono", monospace;
  font-size: clamp(0.7rem, 0.76vw, 0.82rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.6;
}

.ed-svc-list-arrow {
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 0.95rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.ed-svc-list-link:hover .ed-svc-list-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ═══════════════ STATS / EXPERIENCE ═══════════════ */
.ed-stats-section {
  background: var(--color-stats-bg);
  color: var(--color-stats-text);
  padding: clamp(80px, 8vw, 160px) 0;
  border-bottom: var(--line-w) solid var(--ink);
  position: relative;
  overflow: hidden;
}

.ed-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: var(--line-w) solid var(--color-stats-text);
}

.ed-stat {
  padding: clamp(40px, 4vw, 80px) clamp(28px, 2.8vw, 56px);
  border-right: var(--line-w) solid var(--color-stats-text);
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 1.4vw, 24px);
}

.ed-stat:last-child { border-right: none; }

.ed-stat-num {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: clamp(5rem, 14vw, 17rem);
  line-height: 0.84;
  letter-spacing: -0.055em;
  color: var(--color-stats-text);
  display: flex;
  align-items: baseline;
}

.ed-stat-plus {
  color: var(--accent);
  font-style: italic;
  font-weight: 600;
}

.ed-stat-label {
  font-size: clamp(0.86rem, 0.94vw, 1rem);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--hi);
}

.ed-stat-note {
  font-size: clamp(1rem, 1.06vw, 1.18rem);
  line-height: 1.5;
  color: var(--color-stats-muted);
  max-width: 38ch;
  margin: 0;
}

/* ═══════════════ FAQ ═══════════════ */
.ed-faq-list {
  border-top: var(--line-w) solid var(--ink);
}

.ed-faq-item {
  display: grid;
  grid-template-columns: clamp(80px, 8vw, 140px) 1fr auto;
  gap: clamp(20px, 2vw, 36px);
  padding: clamp(24px, 2.4vw, 40px) 0;
  border-bottom: var(--line-w) solid var(--ink);
  align-items: start;
  cursor: pointer;
  transition: background 0.2s ease;
}

.ed-faq-item:hover { background: var(--paper); }

.ed-faq-num {
  font-size: clamp(0.92rem, 1vw, 1.06rem);
  letter-spacing: 0.18em;
  color: var(--accent);
}

.ed-faq-q {
  font-family: "Fraunces", serif;
  font-weight: 700;
  font-size: clamp(1.4rem, 2.6vw, 3.4rem);
  letter-spacing: -0.025em;
  line-height: 1.08;
  color: var(--ink);
}

.ed-faq-a {
  color: var(--ink-2);
  font-size: clamp(1rem, 1.08vw, 1.2rem);
  line-height: 1.55;
  max-width: 64ch;
  display: none;
  margin-top: 14px;
}

.ed-faq-item.is-open .ed-faq-a { display: block; }

.ed-faq-toggle {
  font-weight: 600;
  font-size: clamp(1.6rem, 2vw, 2.4rem);
  align-self: center;
  color: var(--ink);
  font-family: "Fraunces", serif;
}

/* ═══════════════ RESPONSIVE ═══════════════ */
@media (max-width: 1280px) {
  .ed-svc-card,
  .ed-svc-card--span-4,
  .ed-svc-card--span-5,
  .ed-svc-card--span-6,
  .ed-svc-card--span-7,
  .ed-svc-card--span-8,
  .ed-svc-card--span-12 { grid-column: span 6; }
}

@media (max-width: 980px) {
  .ed-hero-grid { grid-template-columns: 1fr; }
  .ed-issue { display: none; }
  .ed-hero-meta {
    align-items: stretch;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: none;
    justify-self: stretch;
  }
  .ed-stamp {
    flex: 1 1 200px;
    text-align: left;
  }
  .ed-svc-card,
  .ed-svc-card--span-4,
  .ed-svc-card--span-5,
  .ed-svc-card--span-6,
  .ed-svc-card--span-7,
  .ed-svc-card--span-8,
  .ed-svc-card--span-12 {
    grid-column: span 12;
    min-height: auto;
  }
  .ed-stats-row { grid-template-columns: 1fr; }
  .ed-stat {
    border-right: none;
    border-bottom: var(--line-w) solid var(--color-stats-text);
  }
  .ed-stat:last-child { border-bottom: none; }
  .ed-section-head { grid-template-columns: 1fr; }
  .ed-section-num { font-size: 4rem; }
  .ed-faq-item { grid-template-columns: 48px 1fr auto; gap: 14px; }
}
</style>
