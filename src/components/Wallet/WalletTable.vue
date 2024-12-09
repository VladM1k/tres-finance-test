<template>
  <table v-if="assets?.length" class="w-full table-fixed min-w-[720px] md:min-w-0">
    <thead>
      <tr class="uppercase text-left text-sm text-secondary px-4 py-[14px]">
        <th class="cell w-1/3">Assets</th>
        <th class="cell w-1/3">Network</th>
        <th class="cell w-1/3">
          <div class="flex items-center">
            <p class="mr-2">Current balance</p>
            <IconInfoCircle />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="asset in mappedAssets" :key="asset.id">
        <td class="cell font-bold break-words">
          {{ asset.name }}
        </td>
        <td class="cell">
          <div class="flex items-center">
            <img
              src="@/assets/images/wallet.png"
              alt="wallet icon"
              class="mr-2 w-[16px] h-[16px]"
            />
            <p
              v-tooltip.copy="`Contract: ${asset.asset.identifier}`"
              class="font-bold text-lg pt-[5px]"
            >
              {{ asset.asset.network }}
            </p>
          </div>
        </td>
        <td class="cell">
          <p class="text-sm leading-8">{{ asset.formattedAssetAmount }} {{ asset.asset.symbol }}</p>
          <div class="flex items-center gap-1 text-sm text-secondary">
            <IconUSD v-if="asset.formattedAssetUsdValue" color="#8E8F98" />
            <p v-if="asset.formattedAssetUsdValue">{{ asset.formattedAssetUsdValue }} USD</p>
            <p v-else>Not defined</p>
          </div>
        </td>
      </tr>
      <tr class="bg-row summary">
        <td class="cell">
          <div class="flex items-center">
            {{ assetsQuantityMessage }}
            <WalletChip message="Summary" isSummary class="ml-2" />
          </div>
        </td>
        <td class="cell">
          <img src="@/assets/images/wallet.png" alt="wallet icon" class="mr-2 w-[16px] h-[16px]" />
        </td>
        <td class="cell">
          <div class="flex items-center gap-3">
            <IconUSD color="#1F1F1F" />
            <p class="leading-4 text-sm font-bold">{{ balanceSummary }} USD</p>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else class="border-t border-light-blue-200 flex justify-center px-4 py-8">
    <div class="flex justify-center items-center">
      <IconEmptyList class="mr-3" />
      <p class="text-grey text-sm">No assets</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import WalletChip from './WalletChip.vue'
import { currencyFormatter } from '@/utils/currencyUtils'

import IconUSD from '../icons/IconUSD.vue'
import IconInfoCircle from '../icons/IconInfoCircle.vue'
import IconEmptyList from '@/components/icons/IconEmptyList.vue'

import { vTooltip } from '@/directives'

import type { Asset } from '@/types'

const props = defineProps<{ assets: Asset[]; assetsQuantityMessage: string }>()

const mappedAssets = computed(() => {
  return props.assets.map((asset: Asset) => {
    return {
      ...asset,
      formattedAssetUsdValue: asset.assetUsdValue
        ? currencyFormatter(asset.assetUsdValue.value, { maximumFractionDigits: 0 })
        : null,
      formattedAssetAmount: currencyFormatter(asset.assetAmount, { maximumFractionDigits: 0 }),
    }
  })
})
const balanceSummary = computed(() => {
  const summary = mappedAssets.value.reduce((acc, asset) => {
    if (asset.assetUsdValue) {
      acc += asset.assetUsdValue.value
    }

    return acc
  }, 0)

  return currencyFormatter(summary, { maximumFractionDigits: 0 })
})
</script>

<style lang="postcss" scoped>
.cell {
  @apply px-4 py-3 border border-light-blue-200;
}
.cell:first-child {
  @apply border-l-0;
}
.cell:last-child {
  @apply border-r-0;
}
tr.summary td:nth-child(2) {
  @apply border-r-0;
}
tr.summary td:last-child {
  @apply border-l-0;
}
</style>
