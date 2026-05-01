<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs-list">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="breadcrumbs-item"
      >
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="breadcrumbs-link"
        >{{ item.label }}</NuxtLink>
        <span
          v-else
          class="breadcrumbs-current"
          :aria-current="i === items.length - 1 ? 'page' : undefined"
        >{{ item.label }}</span>
        <span v-if="i < items.length - 1" class="breadcrumbs-sep" aria-hidden="true">{{ separator }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to?: string
}

withDefaults(
  defineProps<{
    items: BreadcrumbItem[]
    separator?: string
  }>(),
  { separator: '/' }
)
</script>

<style scoped>
.breadcrumbs {
  margin-bottom: 1.5rem;
}

.breadcrumbs-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.breadcrumbs-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.breadcrumbs-link {
  color: var(--muted);
  border-bottom: 1.5px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.breadcrumbs-link:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.breadcrumbs-sep {
  color: var(--accent);
  user-select: none;
  font-weight: 600;
}

.breadcrumbs-current {
  color: var(--ink);
  font-weight: 500;
}
</style>
