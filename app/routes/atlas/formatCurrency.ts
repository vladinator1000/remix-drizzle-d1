export function formatCurrency(input: number) {
  return new Intl.NumberFormat('en-BG', {
    style: 'currency',
    currency: 'EUR',
  }).format(input)
}
