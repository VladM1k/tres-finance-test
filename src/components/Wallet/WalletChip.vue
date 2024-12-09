<template>
  <div :class="['general', isSummary ? 'bg-light-blue-200' : 'bg-light-grey-100']">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
  isSummary?: boolean
}>()
</script>

<style lang="postcss" scoped>
.general {
  @apply text-xs rounded px-2 py-1;
}
</style>
