<template>
  <div class="layout">
    <header class="ed-header" :class="{ 'ed-header--scrolled': scrolled }">
      <div class="ed-header-inner">
        <NuxtLink :to="localePath('/')" class="ed-brand">
          <span class="ed-brand-mark" aria-hidden="true">N</span>
          <span class="ed-brand-text">N1B</span>
          <span class="ed-brand-slash">/ studio</span>
        </NuxtLink>

        <nav class="ed-nav" aria-label="Main navigation">
          <NuxtLink :to="localePath('/') + '#services'" class="ed-nav-link">{{ t('nav.services') }}</NuxtLink>
          <NuxtLink :to="localePath('/') + '#experience'" class="ed-nav-link">{{ t('nav.experience') }}</NuxtLink>
          <NuxtLink :to="localePath('/') + '#faq'" class="ed-nav-link">{{ t('nav.faq') }}</NuxtLink>
        </nav>

        <div class="ed-header-actions">
          <!-- Language dropdown -->
          <div ref="langDropdownRef" class="ed-lang">
            <button
              type="button"
              class="ed-lang-trigger"
              :class="{ 'is-open': langOpen }"
              :aria-expanded="langOpen"
              aria-haspopup="listbox"
              @click.stop="langOpen = !langOpen"
            >
              <span>{{ String(locale).toUpperCase() }}</span>
              <svg :class="{ 'is-open': langOpen }" width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M2 4l3.5 3.5L9 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
            </button>

            <Transition name="ed-dropdown">
              <div v-if="langOpen" class="ed-lang-menu" role="listbox">
                <NuxtLink
                  v-for="loc in availableLocales"
                  :key="loc.code"
                  :to="switchLocalePath(loc.code)"
                  class="ed-lang-item"
                  :class="{ active: locale === loc.code }"
                  role="option"
                  :aria-selected="locale === loc.code"
                  @click="langOpen = false"
                >
                  {{ loc.name }}
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Theme toggle -->
          <button
            type="button"
            class="ed-theme"
            :aria-label="isDark ? t('theme.light') : t('theme.dark')"
            :aria-pressed="isDark"
            @click="toggle"
          >
            <span v-if="isDark" aria-hidden="true">☀</span>
            <span v-else aria-hidden="true">☾</span>
          </button>

          <NuxtLink :to="localePath('/') + '#services'" class="ed-btn ed-cta-btn">
            {{ t('hero.cta') }} <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Ticker bar -->
    <div class="ed-ticker" aria-hidden="true">
      <div class="ed-ticker-track">
        <span v-for="(item, i) in tickerLoop" :key="i" class="ed-ticker-item">
          <b>★</b> {{ item }}
        </span>
      </div>
    </div>

    <main class="ed-main">
      <slot />
    </main>

    <footer class="ed-foot">
      <div class="ed-foot-inner">
        <h2 class="ed-foot-h">
          <template v-if="t('footer.wordmarkPre')">{{ t('footer.wordmarkPre') + ' ' }}</template><em>{{ t('footer.wordmarkAccent') }}</em>{{ ' ' + t('footer.wordmarkPost') }}
        </h2>

        <div class="ed-foot-grid">
          <div class="ed-foot-col">
            <h4>Studio</h4>
            <p class="ed-foot-tagline">{{ t('footer.tagline') }}</p>
          </div>
          <div class="ed-foot-col">
            <h4>{{ t('nav.services') }}</h4>
            <ul>
              <li><NuxtLink :to="localePath('/') + '#services'">{{ t('nav.services') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/') + '#experience'">{{ t('nav.experience') }}</NuxtLink></li>
              <li><NuxtLink :to="localePath('/') + '#faq'">{{ t('nav.faq') }}</NuxtLink></li>
            </ul>
          </div>
          <div class="ed-foot-col">
            <h4>Languages</h4>
            <ul>
              <li v-for="loc in availableLocales" :key="loc.code">
                <NuxtLink :to="switchLocalePath(loc.code)">{{ loc.name }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="ed-foot-bot">
          <span>{{ t('footer.copy', { year: new Date().getFullYear() }) }}</span>
          <span>Issue 042 · Vol. III · Made by hand</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()
const { t, get, locale, localePath, switchLocalePath, availableLocales } = useAppI18n()

const scrolled = ref(false)
const langOpen = ref(false)
const langDropdownRef = ref<HTMLElement | null>(null)

const tickerItems = computed(() => {
  const raw = get<unknown>('ticker.items')
  return Array.isArray(raw) ? (raw as string[]) : []
})
const tickerLoop = computed(() => [...tickerItems.value, ...tickerItems.value])

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 20 }
  window.addEventListener('scroll', onScroll, { passive: true })

  const handleClickOutside = (e: MouseEvent) => {
    if (langDropdownRef.value && !langDropdownRef.value.contains(e.target as Node)) {
      langOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.ed-header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: var(--bg);
  border-bottom: var(--line-w) solid var(--ink);
  transition: box-shadow 0.25s;
}

.ed-header--scrolled {
  box-shadow: 0 4px 0 -2px rgba(11, 11, 11, 0.06);
}

.ed-header-inner {
  width: 100%;
  padding: 14px var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* ── Brand ── */
.ed-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Inter", sans-serif;
  font-weight: 900;
  font-size: 1.4rem;
  letter-spacing: -0.02em;
  color: var(--ink);
  flex-shrink: 0;
}

.ed-brand-mark {
  width: 34px;
  height: 34px;
  background: var(--ink);
  color: var(--bg);
  display: grid;
  place-items: center;
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: 1.1rem;
  transform: rotate(-4deg);
  flex-shrink: 0;
}

.ed-brand-slash {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-weight: 500;
  color: var(--muted);
  font-size: 0.95rem;
  margin-left: 4px;
}

.ed-brand:hover { color: var(--ink); }

/* ── Nav ── */
.ed-nav {
  display: flex;
  gap: 28px;
  flex: 1;
  justify-content: center;
  font-family: "Inter", sans-serif;
}

.ed-nav-link {
  position: relative;
  padding: 6px 0;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--ink);
}

.ed-nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.ed-nav-link:hover {
  color: var(--accent);
}

.ed-nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* ── Header actions ── */
.ed-header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

/* ── Language dropdown ── */
.ed-lang {
  position: relative;
}

.ed-lang-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 11px;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--ink);
  background: transparent;
  border: var(--line-w) solid var(--ink);
  cursor: pointer;
}

.ed-lang-trigger:hover,
.ed-lang-trigger.is-open {
  background: var(--hi);
  color: var(--ink);
}

.ed-lang-trigger svg {
  transition: transform 0.25s ease;
}

.ed-lang-trigger svg.is-open {
  transform: rotate(180deg);
}

.ed-lang-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 88px;
  background: var(--paper);
  border: var(--line-w) solid var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
  z-index: 300;
  display: flex;
  flex-direction: column;
}

.ed-lang-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 14px;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--ink);
  border-bottom: 1px solid var(--ink);
}

.ed-lang-item:last-child { border-bottom: none; }

.ed-lang-item:hover {
  background: var(--hi);
  color: var(--ink);
}

.ed-lang-item.active {
  background: var(--ink);
  color: var(--hi);
}

.ed-dropdown-enter-active,
.ed-dropdown-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.ed-dropdown-enter-from,
.ed-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Theme toggle ── */
.ed-theme {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  font-size: 1rem;
  background: transparent;
  color: var(--ink);
  border: var(--line-w) solid var(--ink);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  font-family: serif;
}

.ed-theme:hover {
  background: var(--ink);
  color: var(--hi);
}

/* ── CTA button ── */
.ed-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  font-family: "Inter", sans-serif;
  font-size: 0.86rem;
  font-weight: 600;
  background: var(--ink);
  color: var(--bg);
  border: var(--line-w) solid var(--ink);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.ed-cta-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--accent);
  color: var(--bg);
}

/* ── Ticker ── */
.ed-ticker {
  background: var(--ink);
  color: var(--bg);
  border-bottom: var(--line-w) solid var(--ink);
  padding: 10px 0;
  overflow: hidden;
}

.ed-ticker-track {
  display: flex;
  gap: 48px;
  white-space: nowrap;
  animation: ed-ticker 40s linear infinite;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.ed-ticker-item {
  flex-shrink: 0;
  opacity: 0.85;
}

.ed-ticker-item b {
  color: var(--hi);
  margin-right: 8px;
  font-weight: normal;
}

/* ── Main ── */
.ed-main {
  flex: 1;
}

/* ── Footer ── */
.ed-foot {
  background: var(--accent);
  color: var(--ink);
  padding: clamp(56px, 5vw, 96px) var(--gutter) clamp(24px, 2.4vw, 40px);
  position: relative;
  overflow: hidden;
  border-top: var(--line-w) solid var(--ink);
}

[data-theme="dark"] .ed-foot {
  color: #1a0e08;
}

.ed-foot-inner {
  width: 100%;
}

.ed-foot-h {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: clamp(2.6rem, 9vw, 11rem);
  line-height: 0.84;
  letter-spacing: -0.05em;
  word-spacing: 0.14em;
  margin: 0 0 clamp(48px, 5vw, 96px);
  max-width: 16ch;
}

.ed-foot-h em {
  font-style: italic;
  font-weight: 600;
  color: var(--paper);
}

.ed-foot-grid {
  display: grid;
  grid-template-columns: 1.6fr 0.8fr 0.8fr;
  gap: clamp(28px, 3vw, 64px);
  border-top: var(--line-w) solid var(--ink);
  padding-top: clamp(28px, 3vw, 48px);
}

.ed-foot-col h4 {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  margin: 0 0 14px;
}

.ed-foot-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ed-foot-col a {
  font-family: "Inter", sans-serif;
  font-size: 0.96rem;
  font-weight: 500;
  color: inherit;
}

.ed-foot-col a:hover {
  font-style: italic;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  color: inherit;
}

.ed-foot-tagline {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-weight: 500;
  font-size: 1.1rem;
  margin: 0;
  max-width: 24ch;
  line-height: 1.3;
}

.ed-foot-bot {
  margin-top: clamp(36px, 4vw, 64px);
  padding-top: 22px;
  border-top: var(--line-w) solid var(--ink);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 980px) {
  .ed-nav { display: none; }
  .ed-cta-btn { display: none; }
}

@media (max-width: 768px) {
  .ed-header-inner { padding: 12px 18px; gap: 12px; }
  .ed-brand-slash { display: none; }
  .ed-foot-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .ed-foot-bot { font-size: 0.7rem; }
}
</style>
