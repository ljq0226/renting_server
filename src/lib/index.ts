export * from './Error';
export function getPreviousMonths(dateStr) {
  const [year, month] = dateStr.split('-').map(Number);
  const result = [];

  for (let i = 0; i < 12; i++) {
    const currentMonth = month - i;
    if (currentMonth > 0) {
      result.push(`${year}-${String(currentMonth).padStart(2, '0')}`);
    } else {
      const previousYear = year - 1;
      const previousMonth = 12 + currentMonth;
      result.push(`${previousYear}-${String(previousMonth).padStart(2, '0')}`);
    }
  }

  return result.reverse();
}
