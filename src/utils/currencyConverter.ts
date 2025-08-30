/**
 * Currency conversion utilities for KES to SATS
 * Note: This uses approximate conversion rates for educational purposes
 */

// Approximate conversion rates (for educational purposes)
const CONVERSION_RATES = {
  KES_TO_USD: 0.007, // 1 KES ≈ 0.007 USD (approximate)
  USD_TO_SATS: 4000, // 1 USD ≈ 4000 sats (approximate)
  KES_TO_SATS: 28    // 1 KES ≈ 28 sats (approximate)
};

/**
 * Convert KES to SATS
 */
export function convertKESToSats(kes: number): number {
  return Math.floor(kes * CONVERSION_RATES.KES_TO_SATS);
}

/**
 * Convert SATS to KES
 */
export function convertSatsToKES(sats: number): number {
  return sats / CONVERSION_RATES.KES_TO_SATS;
}

/**
 * Convert KES to USD
 */
export function convertKESToUSD(kes: number): number {
  return kes * CONVERSION_RATES.KES_TO_USD;
}

/**
 * Convert USD to SATS
 */
export function convertUSDToSats(usd: number): number {
  return Math.floor(usd * CONVERSION_RATES.USD_TO_SATS);
}

export const formatCurrency = (amount: number, currency: string = 'KES'): string => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatKES = (amount: number): string => {
  return formatCurrency(amount, 'KES');
};

/**
 * Format large numbers with abbreviations
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Calculate daily savings target in sats
 */
export function calculateDailySatsTarget(monthlyKESGoal: number): number {
  const dailyKES = monthlyKESGoal / 30; // Assuming 30 days per month
  return convertKESToSats(dailyKES);
}

/**
 * Calculate weekly savings target in sats
 */
export function calculateWeeklySatsTarget(monthlyKESGoal: number): number {
  const weeklyKES = monthlyKESGoal / 4; // Assuming 4 weeks per month
  return convertKESToSats(weeklyKES);
}

/**
 * Get savings progress in both KES and SATS
 */
export function getSavingsProgress(
  currentKES: number,
  targetKES: number
): {
  kesProgress: number;
  satsProgress: number;
  kesRemaining: number;
  satsRemaining: number;
  percentage: number;
} {
  const kesProgress = currentKES;
  const satsProgress = convertKESToSats(currentKES);
  const kesRemaining = Math.max(0, targetKES - currentKES);
  const satsRemaining = convertKESToSats(kesRemaining);
  const percentage = targetKES > 0 ? (currentKES / targetKES) * 100 : 0;

  return {
    kesProgress,
    satsProgress,
    kesRemaining,
    satsRemaining,
    percentage: Math.min(100, Math.max(0, percentage))
  };
}

/**
 * Get conversion rate information
 */
export function getConversionInfo(): {
  kesToSats: number;
  satsToKes: number;
  lastUpdated: string;
} {
  return {
    kesToSats: CONVERSION_RATES.KES_TO_SATS,
    satsToKes: 1 / CONVERSION_RATES.KES_TO_SATS,
    lastUpdated: new Date().toISOString()
  };
}
