export const dateFormatter = (date: string) => {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString('en-US', {
    month: 'short',
    year: '2-digit',
    day: 'numeric',
  })
  return month
}
