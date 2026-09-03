export function formatCurrency(value: number, decimals: number = 0): string {
  if (value === 0) return '$0';
  const isNegative = value < 0;
  const absVal = Math.abs(value);
  const formatted = absVal.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return isNegative ? `($${formatted})` : `$${formatted}`;
}

export function formatNumber(value: number, decimals: number = 0): string {
  if (value === 0) return '0';
  const isNegative = value < 0;
  const absVal = Math.abs(value);
  const formatted = absVal.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return isNegative ? `-${formatted}` : formatted;
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatFTE(value: number): string {
  return `${value.toFixed(1)} FTE`;
}
