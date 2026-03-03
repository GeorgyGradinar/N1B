const THEME_KEY = 'n1b-theme'

function applyTheme(value: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', value)
}

const stored = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const initial = stored ?? (prefersDark ? 'dark' : 'light')
applyTheme(initial)
