export const SERVICE_SLUGS = ['web', 'mobile', 'cloud', 'devops', 'support', 'consulting'] as const
export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export const SERVICE_ICONS: Record<ServiceSlug, string> = {
  web: '🌐',
  mobile: '📱',
  cloud: '☁️',
  devops: '⚙️',
  support: '🔧',
  consulting: '📋'
}

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return SERVICE_SLUGS.includes(slug as ServiceSlug)
}

// --- Иерархический блок «Наши услуги» на главной ---
export type ServiceCategoryId = 'sites' | 'apps' | 'optimization' | 'recruitment'

export const SERVICES_TREE: {
  id: ServiceCategoryId
  icon: string
  subKeys: readonly string[]
}[] = [
  {
    id: 'sites',
    icon: '🌐',
    subKeys: ['landing', 'corporate', 'webapp', 'redesign', 'speed'] as const
  },
  {
    id: 'apps',
    icon: '📱',
    subKeys: ['mobile', 'support'] as const
  },
  {
    id: 'optimization',
    icon: '⚡',
    subKeys: ['audit'] as const
  }
  // recruitment скрыт: { id: 'recruitment', icon: '👥', subKeys: ['frontend', 'devops', 'outstaff', 'project', 'assessment'] }
]

export function isServiceCategoryId(id: string): id is ServiceCategoryId {
  return SERVICES_TREE.some((c) => c.id === id)
}

export function getServiceCategory(id: ServiceCategoryId) {
  return SERVICES_TREE.find((c) => c.id === id) ?? null
}

export function isValidServiceSub(
  categoryId: string,
  subKey: string
): categoryId is ServiceCategoryId {
  const cat = getServiceCategory(categoryId as ServiceCategoryId)
  return !!cat && (cat.subKeys as readonly string[]).includes(subKey)
}
