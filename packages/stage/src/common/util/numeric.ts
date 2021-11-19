/**
 * Convert number to human readable string.
 *
 * ex:
 * `undefined` -> 0
 * 123456 -> 12.3만
 * 1234   -> 1.2천
 * 123    -> 123
 */
export function numberToHuman(
  value?: number,
  { isNeedRound }: { isNeedRound: boolean } = { isNeedRound: false },
): string {
  if (!value) return '0';

  const DECIMAL_UNITS = [{ exponent: 4, unit: '만' }];
  const exponent = Math.floor(Math.log10(value));
  const unit = DECIMAL_UNITS.find(u => exponent >= u.exponent);
  if (!unit) return value.toString();

  const number = value / Math.pow(10, unit.exponent);
  const integer = Math.floor(number);
  const fraction = isNeedRound
    ? Math.round((number - integer) * 10)
    : Math.floor((number - integer) * 10);
  if (fraction === 0) {
    return `${integer}${unit?.unit}`;
  }
  return `${integer}.${fraction}${unit?.unit}`;
}

/**
 * number to delimited string
 *
 * 1000 -> "1,000"
 */
export function numberWithDelimiter(value?: number): string {
  if (!value) return '0';
  return value.toLocaleString();
}
