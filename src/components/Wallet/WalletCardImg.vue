<template>
  <div class="flex flex-col sm:flex-row mr-4 flex-shrink-0">
    <img src="@/assets/images/wallet.png" alt="wallet icon" class="w-[24px] h-[24px]" />
    <div
      v-if="numberOfUniqueNetworks > 1"
      class="ml-0 sm:-ml-[9px] flex flex-col sm:flex-row -mt-[9px] sm:mt-0"
    >
      <img src="@/assets/images/wallet.png" alt="wallet icon" />
      <div v-if="numberOfUniqueNetworks > 2" class="network-number">
        <p class="text-xs">+{{ numberOfUniqueNetworks - 2 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  networksCount: string[]
}>()

const numberOfUniqueNetworks = computed<number>(() => {
  return new Set(props.networksCount).size
})
</script>

<style lang="postcss" scoped>
.network-number {
  @apply w-6 h-6 inline-flex border border-light-blue-200 rounded-full ml-0 sm:-ml-[9px] -mt-[9px] sm:mt-0 bg-white justify-center items-center;
}
</style>
