import { useI18n as useVueI18n } from 'vue-i18n'

export function useAppI18n() {
  const i18n = useVueI18n()
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()

  function resolve(val: unknown): unknown {
    if (val == null) return val
    if (typeof val === 'string') return val
    if (typeof val === 'number' || typeof val === 'boolean') return val
    if (typeof val === 'function' || (typeof val === 'object' && 'type' in (val as any) && 'body' in (val as any))) {
      return i18n.rt(val as any)
    }
    if (Array.isArray(val)) return val.map(resolve)
    if (typeof val === 'object') {
      const out: Record<string, unknown> = {}
      for (const k of Object.keys(val as Record<string, unknown>)) {
        out[k] = resolve((val as Record<string, unknown>)[k])
      }
      return out
    }
    return val
  }

  function get<T = unknown>(key: string): T {
    return resolve(i18n.tm(key)) as T
  }

  return {
    t: i18n.t,
    get,
    locale: i18n.locale,
    localePath,
    switchLocalePath,
    availableLocales: [
      { code: 'ru' as const, name: 'RU' },
      { code: 'en' as const, name: 'EN' },
      { code: 'ka' as const, name: 'KA' }
    ]
  }
}
