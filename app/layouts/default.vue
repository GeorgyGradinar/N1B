<template>
  <div class="layout">
    <header class="header" :class="{ 'header--scrolled': scrolled }">
      <div class="header-inner">
        <NuxtLink :to="localePath('/')" class="logo">
          <span class="logo-mark">N1B</span>
          <span class="logo-dot" aria-hidden="true"></span>
        </NuxtLink>

        <nav class="nav" aria-label="Main navigation">
          <NuxtLink :to="localePath('/') + '#services'" class="nav-link">{{ t('nav.services') }}</NuxtLink>
          <NuxtLink :to="localePath('/') + '#experience'" class="nav-link">{{ t('nav.experience') }}</NuxtLink>
          <NuxtLink :to="localePath('/') + '#faq'" class="nav-link">{{ t('nav.faq') }}</NuxtLink>
        </nav>

        <div class="header-actions">
          <!-- Language dropdown -->
          <div ref="langDropdownRef" class="lang-dropdown">
            <button
              type="button"
              class="lang-trigger"
              :class="{ 'is-open': langOpen }"
              :aria-expanded="langOpen"
              aria-haspopup="listbox"
              @click.stop="langOpen = !langOpen"
            >
              <svg class="lang-globe" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" stroke-width="1.2"/>
                <path d="M6.5 1C4.7 3 4.7 10 6.5 12M6.5 1C8.3 3 8.3 10 6.5 12M1 6.5h11" stroke="currentColor" stroke-width="1.2"/>
              </svg>
              <span class="lang-current">{{ String(locale).toUpperCase() }}</span>
              <svg
                class="lang-chevron"
                :class="{ 'is-open': langOpen }"
                width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"
              >
                <path d="M2 4l3.5 3.5L9 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              </svg>
            </button>

            <Transition name="dropdown">
              <div v-if="langOpen" class="lang-menu" role="listbox">
                <NuxtLink
                  v-for="loc in availableLocales"
                  :key="loc.code"
                  :to="switchLocalePath(loc.code)"
                  class="lang-menu-item"
                  :class="{ active: locale === loc.code }"
                  role="option"
                  :aria-selected="locale === loc.code"
                  @click="langOpen = false"
                >
                  {{ loc.name }}
                  <svg v-if="locale === loc.code" class="lang-check" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Theme toggle -->
          <button
            type="button"
            class="theme-toggle"
            :aria-label="isDark ? t('theme.light') : t('theme.dark')"
            :aria-pressed="isDark"
            @click="toggle"
          >
            <span v-if="isDark" aria-hidden="true">☀️</span>
            <span v-else aria-hidden="true">🌙</span>
          </button>
        </div>
      </div>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo-wrap">
            <span class="footer-logo">N1B</span>
            <span class="footer-logo-dot" aria-hidden="true"></span>
          </div>
          <p class="footer-tagline">Full-Cycle IT Solutions</p>
        </div>

        <nav class="footer-links" aria-label="Footer navigation">
          <NuxtLink :to="localePath('/') + '#services'" class="footer-link">{{ t('nav.services') }}</NuxtLink>
          <NuxtLink :to="localePath('/') + '#experience'" class="footer-link">{{ t('nav.experience') }}</NuxtLink>
          <NuxtLink :to="localePath('/') + '#faq'" class="footer-link">{{ t('nav.faq') }}</NuxtLink>
        </nav>

        <p class="footer-copy">{{ t('footer.copy', { year: '2023' }) }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()
const { t, locale, localePath, switchLocalePath, availableLocales } = useAppI18n()

const scrolled = ref(false)
const langOpen = ref(false)
const langDropdownRef = ref<HTMLElement | null>(null)

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
.header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: var(--color-header-bg);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.header--scrolled {
  border-bottom-color: var(--color-card-border);
  box-shadow: 0 2px 24px rgba(0, 0, 0, 0.07);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* ── Logo ── */
.logo {
  display: flex;
  align-items: center;
  gap: 3px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-mark {
  font-size: 1.45rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--color-text);
  transition: color 0.2s;
}

.logo-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-accent);
  margin-bottom: 12px;
  flex-shrink: 0;
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.75); }
}

.logo:hover .logo-mark {
  color: var(--color-accent);
  text-decoration: none;
}

/* ── Nav ── */
.nav {
  display: flex;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  padding: 0.4rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover {
  color: var(--color-text);
  background: var(--color-tag-bg);
  text-decoration: none;
}

/* ── Header Actions ── */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

/* ── Language dropdown ── */
.lang-dropdown {
  position: relative;
}

.lang-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--color-text-muted);
  background: var(--color-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, border-color 0.2s;
  white-space: nowrap;
}

.lang-trigger:hover,
.lang-trigger.is-open {
  color: var(--color-text);
  background: var(--color-tag-bg);
  border-color: rgba(var(--color-accent-rgb), 0.35);
}

.lang-globe {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.lang-current {
  font-size: 0.78rem;
  letter-spacing: 0.05em;
}

.lang-chevron {
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: transform 0.25s ease;
}

.lang-chevron.is-open {
  transform: rotate(180deg);
}

.lang-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 100px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  padding: 0.35rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 300;
}

.lang-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.lang-menu-item:hover {
  color: var(--color-text);
  background: var(--color-tag-bg);
  text-decoration: none;
}

.lang-menu-item.active {
  color: var(--color-accent);
  background: var(--color-tag-bg);
}

.lang-check {
  color: var(--color-accent);
  flex-shrink: 0;
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}

/* ── Theme Toggle ── */
.theme-toggle {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.theme-toggle:hover {
  background: var(--color-tag-bg);
  border-color: rgba(var(--color-accent-rgb), 0.35);
}

/* ── Main ── */
.main {
  flex: 1;
}

/* ── Footer ── */
.footer {
  background: var(--color-footer-bg);
  border-top: 1px solid var(--color-footer-border);
  padding: 3rem 2rem;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 2rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.footer-logo-wrap {
  display: flex;
  align-items: center;
  gap: 3px;
}

.footer-logo {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--color-footer-logo);
}

.footer-logo-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  margin-bottom: 10px;
}

.footer-tagline {
  margin: 0;
  font-size: 0.78rem;
  color: var(--color-footer-text);
  letter-spacing: 0.03em;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  font-size: 0.85rem;
  color: var(--color-footer-text);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--color-footer-link-hover);
  text-decoration: none;
}

.footer-copy {
  margin: 0;
  font-size: 0.78rem;
  color: var(--color-footer-text);
  text-align: right;
}

@media (max-width: 768px) {
  .header-inner {
    padding: 0 1.25rem;
    gap: 1rem;
  }

  .nav {
    display: none;
  }

  .footer-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }

  .footer-copy {
    text-align: center;
  }
}
</style>
