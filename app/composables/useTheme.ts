const THEME_KEY = 'n1b-theme'
const theme = ref<'light' | 'dark'>('light')

function applyTheme(value: 'light' | 'dark') {
  if (import.meta.client && document.documentElement) {
    document.documentElement.setAttribute('data-theme', value)
  }
}

function initTheme() {
  if (import.meta.client) {
    const stored = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored ?? (prefersDark ? 'dark' : 'light')
    theme.value = initial
    applyTheme(initial)
  }
}

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function toggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    applyTheme(theme.value)
    if (import.meta.client) {
      localStorage.setItem(THEME_KEY, theme.value)
    }
  }

  onMounted(() => initTheme())

  return { isDark, theme, toggle }
}
