import { Currency } from '../types';

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1.0, flag: '🇺🇸', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', rate: 0.92, flag: '🇪🇺', name: 'Euro' },
  { code: 'GBP', symbol: '£', rate: 0.79, flag: '🇬🇧', name: 'British Pound' },
  { code: 'KES', symbol: 'KSh ', rate: 129.0, flag: '🇰🇪', name: 'Kenyan Shilling' },
  { code: 'NGN', symbol: '₦', rate: 1480.0, flag: '🇳🇬', name: 'Nigerian Naira' },
  { code: 'ZAR', symbol: 'R ', rate: 18.2, flag: '🇿🇦', name: 'South African Rand' },
  { code: 'AED', symbol: 'AED ', rate: 3.67, flag: '🇦🇪', name: 'UAE Dirham' },
  { code: 'CAD', symbol: 'CA$', rate: 1.38, flag: '🇨🇦', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'AU$', rate: 1.52, flag: '🇦🇺', name: 'Australian Dollar' },
];

export function formatPrice(priceInUSD: number, currency: Currency): string {
  const converted = priceInUSD * currency.rate;
  if (currency.code === 'KES' || currency.code === 'NGN') {
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${currency.symbol}${converted.toFixed(2)}`;
}
