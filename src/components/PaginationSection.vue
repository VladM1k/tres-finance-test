<template>
  <div class="flex justify-between">
    <div class="flex gap-2 items-center text-sm text-secondary">
      <p>View</p>
      <SelectInput v-model="itemsPerPage" :options="itemsPerPageOptions" top />
      <p>per page</p>
    </div>
    <div class="flex items-center gap-2">
      <p class="text-sm text-secondary mr-4 hidden sm:block">
        Showing {{ itemsPerPage }} out of {{ elementsQuantity }} results
      </p>
      <button class="arrow" :class="{ disabled: currentPage === 1 }">
        <IconArrowRight :width="6" :height="10" class="rotate-180" @click="prevPage" />
      </button>
      <div class="flex">
        <template v-for="page in displayedPages" :key="page">
          <button
            v-if="typeof page === 'number'"
            class="page"
            :class="{ active: currentPage === page, 'cursor-pointer': typeof page === 'number' }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <span v-else class="page">
            {{ page }}
          </span>
        </template>
      </div>
      <button class="arrow" :class="{ disabled: currentPage === totalPages }">
        <IconArrowRight :width="6" :height="10" @click="nextPage" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import SelectInput from './UI/SelectInput.vue'

const props = defineProps<{ elementsQuantity: number }>()

const currentPage = defineModel('page', { type: Number, required: true })
const itemsPerPage = defineModel('itemsPerPage', { type: Number, required: true })

const itemsPerPageOptions = [10, 20, 50]

const totalPages = computed(() =>
  props.elementsQuantity === 0 ? 1 : Math.ceil(props.elementsQuantity / itemsPerPage.value),
)
const displayedPages = computed((): Array<string | number> => {
  const pages = []

  if (totalPages.value < 7) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else if (currentPage.value < 5) {
    pages.push(1, 2, 3, 4, 5, '...', totalPages.value)
  } else if (totalPages.value - currentPage.value < 3) {
    pages.push(
      1,
      '...',
      totalPages.value - 3,
      totalPages.value - 2,
      totalPages.value - 1,
      totalPages.value,
    )
  } else {
    pages.push(
      1,
      '...',
      currentPage.value - 1,
      currentPage.value,
      currentPage.value + 1,
      '...',
      totalPages.value,
    )
  }

  return pages
})

const changePage = (page: number | string) => {
  if (typeof page === 'string') return

  currentPage.value = page
}
const prevPage = () => {
  if (currentPage.value === 1) return
  currentPage.value -= 1
}
const nextPage = () => {
  if (currentPage.value === totalPages.value) return
  currentPage.value += 1
}
</script>

<style lang="postcss" scoped>
.page {
  @apply text-grey text-sm hover:text-dark-blue duration-75 px-[6px] py-1;
}
.page.active {
  @apply text-dark-blue;
}
.arrow {
  @apply cursor-pointer px-[6px] py-1;
}
.arrow.disabled {
  @apply pointer-events-none;
}
</style>
