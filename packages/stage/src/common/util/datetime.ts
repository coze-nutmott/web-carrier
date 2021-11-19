import { ITimestamp } from 'common/type';

import {
  formatDistance,
  lightFormat,
  differenceInDays,
  isFuture as _isFuture,
  isPast as _isPast,
  isBefore as _isBefore,
  subMonths,
  subDays,
  addMonths,
  addHours,
  addWeeks,
  startOfToday,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { parseDate } from 'shared/util/date';

/**
 * `Timestamp`를 format string으로 변환
 *
 * ## 예
 * - 2020-09-01T12:00:00 -> 2020.09.01
 * - 2020-09-01T12:00:00 -> 2020.09.01 12:00 // withTime: true
 */
interface IFormatOption {
  withTime?: boolean;
}
export function timestampToFormattedString(
  timestamp?: ITimestamp,
  options?: IFormatOption,
): string {
  if (!timestamp) return '';

  try {
    const formatting = options?.withTime ? 'yyyy.MM.dd HH:mm' : 'yyyy.MM.dd';
    return lightFormat(parseDate(timestamp), formatting);
  } catch {
    return timestamp;
  }
}

/**
 * `Timestamp`와 현재 시간 차이를 `x 전` 문자열로 변환
 */
export function timeAgoInWords(timestamp?: ITimestamp): string {
  if (!timestamp) return '';

  try {
    const time = parseDate(timestamp);
    const now = parseDate();

    return `${formatDistance(time, now, { locale: ko })} 전`;
  } catch {
    return timestamp;
  }
}

/**
 * `Timestamp`와 현재 시간의 날짜 차이를 출력
 */
export function timeAgoInDays(timestamp?: ITimestamp): number {
  if (!timestamp) return 0;

  try {
    const time = parseDate(timestamp);
    const now = parseDate();
    return differenceInDays(now, time);
  } catch {
    return 0;
  }
}

export function dateToTimestamp(value?: Date): ITimestamp | undefined {
  if (!value) return undefined;
  return lightFormat(value, "yyyy-MM-dd'T'HH:mm:ss");
}

/**
 * `Timestamp`가 현재 시간보다 미래이면 `true`
 */
export function isFuture(timestamp?: ITimestamp): boolean {
  if (!timestamp) return false;
  try {
    return _isFuture(parseDate(timestamp));
  } catch {
    return false;
  }
}

/**
 * `Timestamp`가 현재 시간보다 과거이면 `true`
 */
export function isPast(timestamp?: ITimestamp): boolean {
  if (!timestamp) return false;
  try {
    return _isPast(parseDate(timestamp));
  } catch {
    return false;
  }
}

/**
 * 현재 날짜의 amount 뒤의 날짜를 string으로 리턴
 *
 * @param amount months to substract
 * @param format 날짜 포맷 (기본 yyyy년 M월)
 */
export function getPreviousMonthAsFormattedString(
  amount = 0,
  format = 'yyyy년 M월',
): string {
  return lightFormat(subMonths(parseDate(), amount), format);
}

export function getPreviousDateAsFormattedString(
  amount = 0,
  format = 'yyyy년 M월 dd일',
): string {
  return lightFormat(subDays(parseDate(), amount), format);
}

export function getNextMonthAsFormattedString(
  timestamp?: ITimestamp,
  format = 'yyyy년 MM월 dd일 HH:mm',
): string {
  if (!timestamp) return '';
  return lightFormat(parseDate(timestamp), format);
}

/**
 * 지난 30일간 날짜를 'Timestamp' 포맷으로 반환
 */

export function getPreviousDatesAsTimestamp(amount = 0): ITimestamp[] {
  const dates = [...Array(amount)].map(
    (_, i) =>
      dateToTimestamp(subDays(startOfToday(), amount - i)) as ITimestamp,
  );

  return dates;
}

export function afterOneMonth(timestamp?: ITimestamp): ITimestamp | undefined {
  if (!timestamp) return '';
  const afterMonth = addMonths(parseDate(timestamp), 1);
  return dateToTimestamp(afterMonth);
}

export function afterWeeks(timestamp?: ITimestamp): ITimestamp | undefined {
  if (!timestamp) return '';
  const afterMonth = addWeeks(parseDate(timestamp), 1);
  return dateToTimestamp(afterMonth);
}

export function isAfterDay(timestamp?: ITimestamp): boolean {
  if (!timestamp) return false;
  const afterDay = addHours(parseDate(timestamp), 24);
  return isFuture(dateToTimestamp(afterDay));
}

export function isBefore(
  timestamp: ITimestamp | undefined,
  timestampToCompare: ITimestamp,
): boolean {
  if (!timestamp) return false;
  return _isBefore(parseDate(timestamp), parseDate(timestampToCompare));
}
