import { fxRates } from "./fxRates";

// Currency converter utility
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  const rateKey = `${fromCurrency}_${toCurrency}`;
  const rate = fxRates[rateKey] || 1;
  return amount * rate;
};

// Currency symbols
export const currencySymbols = {
  KES: 'KSh',
  USD: '$',
  NGN: '₦'
};

// Format currency helper
export const formatCurrency = (amount, currency) => {
  return `${currencySymbols[currency]} ${amount.toLocaleString()}`;
};
