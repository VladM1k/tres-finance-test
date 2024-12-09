<template>
  <div class="select-wrapper text-secondary text-sm" @click="selectStatusHandler()">
    <p class="font-bold leading-4">{{ selectedOptionToDisplay }}</p>
    <IconArrowRight :width="6" :height="11" class="rotate-90" />
    <Transition name="fade">
      <div v-if="selectStatus" class="options-block duration-200" :class="top ? 'top' : 'bottom'">
        <p v-for="item in options" :key="item" @click="setSelectedOption(item)">
          {{ item }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import IconArrowRight from '@/components/icons/IconArrowRight.vue'

defineProps<{
  options: number[] | string[]
  empty?: boolean
  top?: boolean
  bottom?: boolean
}>()

const selectedOption = defineModel()

const valueForEmpty = '--- select an option ---'

const selectStatus = ref(false)

const selectedOptionToDisplay = computed(() => selectedOption.value || valueForEmpty)

const setSelectedOption = (option: number | string) => {
  selectedOption.value = option
}
const selectStatusHandler = (status?: boolean) => {
  selectStatus.value = status ?? !selectStatus.value
}
</script>

<style lang="postcss" scoped>
.select-wrapper {
  @apply flex p-2 gap-2 cursor-pointer items-center border border-light-grey-200 bg-white rounded relative;
}
.select-wrapper .options-block {
  @apply absolute left-0 border border-light-grey-200 rounded min-w-full bg-white z-50;
}
.options-block p {
  @apply cursor-pointer px-2 py-1 hover:bg-light-grey-100;
}
</style>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.top {
  bottom: calc(100% + 5px);
}
.bottom {
  top: calc(100% + 5px);
}
</style>
