<template>
  <div class="layout">
    <header class="header">
      <NuxtLink :to="localePath('/')" class="logo">N1B</NuxtLink>
      <nav class="nav" aria-label="Main navigation">
        <NuxtLink :to="localePath('/') + '#services'" class="nav-link">{{ t('nav.services') }}</NuxtLink>
        <NuxtLink :to="localePath('/') + '#experience'" class="nav-link">{{ t('nav.experience') }}</NuxtLink>
        <NuxtLink :to="localePath('/') + '#faq'" class="nav-link">{{ t('nav.faq') }}</NuxtLink>
      </nav>
      <div class="header-actions">
        <div class="lang-switcher" role="group" aria-label="Language">
          <NuxtLink
            v-for="loc in availableLocales"
            :key="loc.code"
            :to="switchLocalePath(loc.code)"
            class="lang-btn"
            :class="{ active: locale === loc.code }"
          >
            {{ loc.name }}
          </NuxtLink>
        </div>
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
    </header>
    <main class="main">
      <slot />
    </main>
    <footer class="footer">
      <div class="footer-inner">
        <p class="footer-copy">{{ t('footer.copy', { year: String(new Date().getFullYear()) }) }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()
const { t, locale, localePath, switchLocalePath, availableLocales } = useAppI18n()
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--color-header-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-card-border);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
}

.logo:hover {
  text-decoration: none;
  color: var(--color-accent);
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  color: var(--color-accent);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.lang-switcher {
  display: flex;
  gap: 0.25rem;
}

.lang-btn {
  display: inline-block;
  padding: 0.35rem 0.6rem;
  font-size: 0.85rem;
  font-weight: 500;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 6px;
  color: var(--color-text);
  cursor: pointer;
  text-decoration: none;
}

.lang-btn:hover {
  background: var(--color-bg-alt);
}

.lang-btn.active {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}

.theme-toggle {
  padding: 0.5rem 0.75rem;
  font-size: 1.25rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 8px;
  cursor: pointer;
  color: var(--color-text);
}

.theme-toggle:hover {
  background: var(--color-bg-alt);
}

.main {
  flex: 1;
}

.footer {
  padding: 2rem 1.5rem;
  background: var(--color-footer-bg);
  border-top: 1px solid var(--color-card-border);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.footer-copy {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .nav {
    gap: 1rem;
  }
  .nav-link {
    font-size: 0.9rem;
  }
}
</style>
