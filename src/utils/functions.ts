export const filterFormatCurrency = (
  value: number,
  showCurrencySign = true,
) => {
  if (isNaN(value)) return "";
  if (showCurrencySign) {
    return new Intl.NumberFormat("en-IN", {
      currency: "USD",
      style: "currency",
    }).format(value);
  }
  return new Intl.NumberFormat("en-IN", {
    style: "decimal",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
};
