export default function formatCurrency(
  locale: string,
  currency: string,
  value: number,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}
