<template>
  <div class="border border-b-light-blue-200 cursor-pointer" @click="tableDisplayStatusHandler()">
    <div class="p-4">
      <div class="flex items-start sm:items-center justify-between flex-col sm:flex-row">
        <div class="flex items-center">
          <!-- <div class="flex flex-col sm:flex-row mr-4 flex-shrink-0">
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
          </div> -->
          <WalletCardImg :networksCount="networksCount" />
          <div>
            <p class="text-md sm:text-lg font-bold">{{ wallet.name }}</p>
            <p
              v-tooltip.copy="wallet.identifier"
              class="text-sm font-normal text-secondary leading-5 inline pt-[5px]"
            >
              <IconHash class="inline" />
              {{ formattedIdentifier }}
            </p>
          </div>
        </div>
        <p
          v-tooltip.copy="
            `${currencyFormatter(+props.wallet.totalUsdValue, { maximumFractionDigits: 10 })} USD`
          "
          class="text-md sm:text-lg font-bold pt-[5px] ml-[40px] sm:ml-0 mt-2 sm:mt-0"
        >
          <span class="inline sm:hidden font-bold">Balance: </span>
          {{ parsedTotalUsdValue }} USD
        </p>
      </div>
    </div>
    <hr class="pb-4 mx-4 border-b-light-blue-200" />
    <div class="px-4 flex items-center gap-3 mb-4">
      <p class="text-sm">Added: {{ formattedDate }}</p>
      <div class="h-5 w-[1px] bg-light-blue-200"></div>
      <WalletChip :message="assetsQuantityMessage" />
    </div>
    <div v-if="tableDisplayStatus" class="overflow-scroll md:overflow-auto">
      <WalletTable :assets="wallet.assets || []" :assetsQuantityMessage="assetsQuantityMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import WalletChip from './WalletChip.vue'
import WalletTable from './WalletTable.vue'
import WalletCardImg from './WalletCardImg.vue'
import IconHash from '../icons/IconHash.vue'

import { dateFormatter } from '@/utils/dateUtils'
import { currencyFormatter } from '@/utils/currencyUtils'

import { vTooltip } from '@/directives'

import type { Wallet } from '@/types'

const props = defineProps<{ wallet: Wallet }>()

const tableDisplayStatus = ref(false)

const assetsQuantity = computed<number>(() => {
  return props.wallet.assets.length
})
const assetsQuantityMessage = computed<string>(() => {
  return `${assetsQuantity.value} ${assetsQuantity.value === 1 ? 'Asset' : 'Assets'}`
})
const parsedTotalUsdValue = computed<string>(() => {
  return currencyFormatter(+props.wallet.totalUsdValue, { maximumFractionDigits: 0 })
})
const formattedDate = computed<string>(() => {
  return dateFormatter(props.wallet.createdAt)
})
const formattedIdentifier = computed<string>(() => {
  let formatted = props.wallet.identifier

  if (formatted.length > 30) {
    formatted = `${formatted.slice(0, 6)}...${formatted.slice(-6)}`
  }

  return formatted
})
const networksCount = computed(() => props.wallet.assets.map((asset) => asset.asset.network))

const tableDisplayStatusHandler = (status?: boolean) => {
  tableDisplayStatus.value = status ?? !tableDisplayStatus.value
}

defineExpose({
  tableDisplayStatusHandler,
})
</script>
