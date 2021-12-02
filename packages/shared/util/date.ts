import addSeconds from 'date-fns/addSeconds';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import format from 'date-fns/format';
import parseIOS from 'date-fns/parseISO';

export function getDateDifference(
  dateLeft: string | number,
  dateRight: string | number,
): {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  totalDays: number;
} {
  const left = typeof dateLeft === 'string' ? parseDate(dateLeft) : dateLeft;
  const right =
    typeof dateRight === 'string' ? parseDate(dateRight) : dateRight;
  const totalSeconds = differenceInSeconds(left, right);
  if (totalSeconds <= 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      totalDays: 0,
    };
  } else {
    return {
      years: Math.floor(totalSeconds / SECONDS_OF_AN_YEAR),
      months: Math.floor(
        (totalSeconds % SECONDS_OF_AN_YEAR) / SECONDS_OF_A_MONTH,
      ),
      days: Math.floor((totalSeconds % SECONDS_OF_A_MONTH) / SECONDS_OF_A_DAY),
      hours: Math.floor((totalSeconds % SECONDS_OF_A_DAY) / SECONDS_OF_AN_HOUR),
      minutes: Math.floor((totalSeconds % SECONDS_OF_AN_HOUR) / 60),
      seconds: totalSeconds % 60,
      totalSeconds,
      totalDays: Math.floor(totalSeconds / SECONDS_OF_A_DAY),
    };
  }
}

export const SECONDS_OF_AN_YEAR = 60 * 60 * 24 * 365;
export const SECONDS_OF_A_MONTH = 60 * 60 * 24 * 30;
export const SECONDS_OF_A_DAY = 60 * 60 * 24;
export const SECONDS_OF_AN_HOUR = 60 * 60 * 1;
export const SECONDS_OF_A_MINUTE = 60 * 1;
export const MINUTES_OF_A_DAY = 60 * 24;
export const MINUTES_OF_AN_HOUR = 60;

const REGEX_DATE = /^\d{4}-\d{2}-\d{2}$/;
const REGEX_DATETIME = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
function _convertDatetimeToUtcFormat(param: string) {
  if (REGEX_DATE.test(param)) {
    return `${param}T00:00:00Z`;
  } else if (REGEX_DATETIME.test(param)) {
    const parts = param.split(' ');
    return `${parts[0]}T${parts[1]}Z`;
  } else {
    return param;
  }
}
/**
 * param이 문자열인 경우 다음 포맷이라고 가정한다.
 * yyyy-MM-ddTHH:mm:ssZ
 * yyyy-MM-dd HH:mm:ss
 * yyyy-MM-dd
 * 모두 UTC로 처리한다
 */
export function parseDate(param: string | number = '') {
  if (typeof param === 'number') {
    // eslint-disable-next-line kakaoent-plugin/no-date
    return new Date(param);
  }
  // eslint-disable-next-line kakaoent-plugin/no-date
  const currentDate = new Date();
  const dateString = _convertDatetimeToUtcFormat(param);
  const parsedDate = parseIOS(dateString);
  return isNaN(parsedDate.getDate()) ? currentDate : parsedDate;
}

export const MAX_DATE = parseDate('2038-01-19T12:14:07Z');
const BASE_DATE = parseDate('1980-01-01T00:00:00Z');
export function formatTime(seconds: number) {
  const helperDate = addSeconds(BASE_DATE, seconds);
  const durationFormat = seconds >= SECONDS_OF_AN_HOUR ? 'HH:mm:ss' : 'mm:ss';
  return format(helperDate, durationFormat);
}

export function formatFromServerDate(
  date: string | number,
  _format: string = DEFAULT_DATETIME_FORMAT,
) {
  const timestamp = _getTimestampForRegionFromUtcDate(date);
  return format(timestamp, _format);
}

// eslint-disable-next-line kakaoent-plugin/no-date
const DATE_OBJECT = new Date();
export function _getTimestampForRegionFromUtcDate(
  date: number | string,
  targetOffset: number = 9 * 3600 * 1000, // 한국 기준
) {
  const timestamp = typeof date === 'number' ? date : getTimeStamp(date);
  // getTimezoneOffset는 minute를 반환한다
  const localOffset = DATE_OBJECT.getTimezoneOffset() * 60000;
  // localOffset을 더하면 Date 객체(또는 date-fns의 format)는 항상 UTC 시간의 문자열을 반환한다
  // 원하는 시간대로 변환하기 위해 targetOffset을 또 더한다
  return timestamp + localOffset + targetOffset;
}

export function getTimeStamp(date: string) {
  return parseDate(date).getTime();
}

export const DEFAULT_DATE_FORMAT = 'yyyy.MM.dd';
export const SHORT_DATE_FORMAT = 'yyyy.MM.dd';
export const DEFAULT_DATETIME_FORMAT = `${DEFAULT_DATE_FORMAT} HH:mm:ss`;
export const DEFAULT_SHORT_DATETIME_FORMAT = `${SHORT_DATE_FORMAT} HH:mm:ss`;

export function getIsRecent(date: string | number, hoursAgo: number) {
  const timestamp = parseDate(date).getTime();
  return Date.now() <= timestamp + hoursAgo * 60 * 60 * 1000;
}

export function getIsBetween(fromDate: string, toDate: string) {
  return (
    getTimeStamp(fromDate) <= Date.now() && getTimeStamp(toDate) >= Date.now()
  );
}

export function getNowIsoString() {
  // eslint-disable-next-line kakaoent-plugin/no-date
  return new Date().toISOString();
}
