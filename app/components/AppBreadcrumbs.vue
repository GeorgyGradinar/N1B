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
  { separator: '›' }
)
</script>

<style scoped>
.breadcrumbs {
  margin-bottom: 1rem;
}

.breadcrumbs-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.breadcrumbs-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.breadcrumbs-link {
  color: var(--color-text-muted);
  text-decoration: none;
}

.breadcrumbs-link:hover {
  color: var(--color-accent);
}

.breadcrumbs-sep {
  color: var(--color-text-muted);
  opacity: 0.7;
  user-select: none;
}

.breadcrumbs-current {
  color: var(--color-text);
  font-weight: 500;
}
</style>
