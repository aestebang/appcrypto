/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (value: number): string => {
  if (isNaN(value) || value === null || value === undefined) {
    return '$0.00';
  }
  
  // For very large numbers, use compact notation
  if (value >= 1_000_000_000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(value);
  }
  
  // For smaller values, show more precision
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  });
  
  return formatter.format(value);
};

/**
 * Format a percentage value
 */
export const formatPercentage = (value: number): string => {
  if (isNaN(value) || value === null || value === undefined) {
    return '0.00%';
  }
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

/**
 * Format a large number with commas (e.g., 1,234,567)
 */
export const formatNumber = (value: number): string => {
  if (isNaN(value) || value === null || value === undefined) {
    return '0';
  }
  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Format a large number with appropriate suffix (K, M, B, T)
 */
export const formatLargeNumber = (value: number): string => {
  if (isNaN(value) || value === null || value === undefined) {
    return '0';
  }
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format a date to a string
 */
export const formatDate = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};