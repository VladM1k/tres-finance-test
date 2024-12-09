export interface Asset {
  id: string
  name: string
  asset: AssetInfo
  assetUsdValue: {
    value: number
  } | null
  assetAmount: number
}

export interface AssetInfo {
  identifier: string
  network: string
  symbol: string
}

export interface Wallet {
  id: string
  identifier: string
  name: string
  createdAt: string
  totalUsdValue: number
  assets: Asset[]
}
