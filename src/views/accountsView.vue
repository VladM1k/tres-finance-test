<template>
  <div class="px-6 py-4 border-b border-b-light-blue-200">
    <h1 class="text-base font-bold">Accounts</h1>
  </div>
  <div class="px-6 py-4 flex items-center gap-2">
    <p>Sort by:</p>
    <SelectInput v-model="sortBy" :options="sortByOptions" empty />
    <button class="reset-sort" @click="resetSort">Reset</button>
  </div>
  <div class="px-6 mt-4">
    <template v-if="walletsListLength">
      <div class="text-grey flex items-center justify-between w-full">
        <button class="flex items-center cursor-pointer" @click="expandAllHandler">
          <IconArrowRight
            :width="10"
            :height="18"
            class="ml-[7.5px] mr-3 duration-100"
            :class="{ 'rotate-90': isExpandAll }"
          />
          <p class="text-sm">Expand all</p>
        </button>
        <p class="text-xs">{{ walletsListLengthMessage }}</p>
      </div>
      <div class="mt-4 flex flex-col gap-2">
        <WalletCard
          v-for="wallet in walletsList"
          :key="wallet.id"
          :wallet="wallet"
          ref="walletCard"
        />
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col items-center justify-center mt-10">
        <IconEmptyList :width="50" :height="50" class="mb-4" />
        <p class="text-grey">No wallets</p>
      </div>
    </template>
  </div>
  <PaginationSection
    v-if="walletsListLength"
    v-model:page="activePage"
    v-model:itemsPerPage="itemsPerPage"
    :elementsQuantity="wallets.length"
    class="mt-9 px-6 pb-8"
  />
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef, nextTick, watch } from 'vue'

import WalletCard from '@/components/Wallet/WalletCard.vue'
import PaginationSection from '@/components/PaginationSection.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconEmptyList from '@/components/icons/IconEmptyList.vue'
import SelectInput from '@/components/UI/SelectInput.vue'

import wallets from '@/content/mock-api-wallets.json'

import type { Wallet } from '@/types'

const walletCard = useTemplateRef('walletCard')

const isExpandAll = ref(false)
const activePage = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref('')
const sortByOptions = ref(['name', 'balance'])

const walletsList = computed(() => {
  const sortedWallets: Wallet[] = sortWallets(sortBy.value)

  return sortedWallets.slice(
    (activePage.value - 1) * itemsPerPage.value,
    activePage.value * itemsPerPage.value,
  )
})
const walletsListLength = computed(() => walletsList.value.length)
const walletsListLengthMessage = computed(
  () => `${walletsListLength.value} Wallet${walletsListLength.value === 1 ? '' : 's'}`,
)

watch(activePage, () => {
  nextTick(() => {
    expandAll()
    scrollTo({ top: 0 })
  })
})
watch(itemsPerPage, () => {
  nextTick(() => {
    activePage.value = 1
    expandAll()
  })
})

const expandAll = () => {
  walletCard.value?.forEach((card) => {
    card?.tableDisplayStatusHandler(isExpandAll.value)
  })
}
const expandAllHandler = () => {
  isExpandAll.value = !isExpandAll.value

  expandAll()
}
const sortWallets = (sortBy: string) => {
  if (!sortBy) return wallets

  return sortBy === 'name'
    ? wallets.slice().sort((a, b) => a.name.localeCompare(b.name))
    : wallets.slice().sort((a, b) => b.totalUsdValue - a.totalUsdValue)
}
const resetSort = () => {
  sortBy.value = ''
}
</script>

<style lang="postcss" scoped>
.reset-sort {
  @apply border border-light-blue-200 p-2 text-sm rounded leading-4 bg-light-blue-200 ml-2 hover:bg-light-blue-100 duration-100;
}
</style>
