export const filterFormatCurrency = (value: number) => {
  if (isNaN(value)) return "";
  return new Intl.NumberFormat("pt-BR", {
    currency: "USD",
    style: "currency",
    currencyDisplay: "narrowSymbol",
  }).format(value);
};
