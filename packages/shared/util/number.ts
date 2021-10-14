export function getRange(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, k) => k + start);
}

/**
 * 소수 첫째 자리에서 반올림: position 1
 * 소수 둘째 자리에서 반올림: position 0.1
 * 정수 첫째 자리에서 반올림: position 10
 */
export function round(value: number, position: number = 1) {
  if (!position) {
    return value;
  }
  const x = 1 / position;
  return Math.round(value * x) / x;
}
