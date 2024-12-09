export const currencyFormatter = (currency: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-US', options).format(currency)
}
