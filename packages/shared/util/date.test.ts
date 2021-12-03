import format from 'date-fns/format';

import {
  getDateDifference,
  parseDate,
  formatTime,
  formatFromServerDate,
  getIsRecent,
  getIsBetween,
  _getTimestampForRegionFromUtcDate,
} from './date';

describe('parseDate', () => {
  it('빈 문자열을 넣으면 현재 시각 Date 객체가 나옴', () => {
    const range = 1000;
    expect(parseDate('').getTime()).toBeGreaterThanOrEqual(Date.now() - range);
    expect(parseDate('').getTime()).toBeLessThanOrEqual(Date.now() + range);
  });
  it('undefined를 넣으면 현재 시각 Date 객체가 나옴', () => {
    const range = 1000;
    expect(parseDate().getTime()).toBeGreaterThanOrEqual(Date.now() - range);
    expect(parseDate().getTime()).toBeLessThanOrEqual(Date.now() + range);
  });
  it('yyyy-MM-dd 포맷', () => {
    const dateStr = '2018-11-01';
    expect(format(parseDate(dateStr), 'yyyy-MM-dd')).toBe(dateStr);
  });
  it('yyyy-MM-dd HH:mm:ss 포맷', () => {
    expect(
      format(parseDate('2018-11-01T10:30:59Z'), 'yyyy-MM-dd HH:mm:ss'),
    ).toBe('2018-11-01 10:30:59');
  });
  it('숫자 타입', () => {
    expect(format(parseDate(1542962959101), 'yyyy-MM-dd HH:mm:ss')).toBe(
      '2018-11-23 08:49:19',
    );
  });
});

describe('getDateDifference', () => {
  it('좌변의 시간값이 더 작을때', () => {
    expect(
      getDateDifference('2018-01-02T00:00:00Z', '2018-01-03T00:00:00Z'),
    ).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      totalDays: 0,
    });
  });
  it('우변의 시간값이 더 작을때', () => {
    expect(
      getDateDifference('2019-02-03T20:20:20Z', '2018-01-01T19:18:17Z'),
    ).toEqual({
      years: 1,
      months: 1,
      days: 8,
      hours: 1,
      minutes: 2,
      seconds: 3,
      totalSeconds: 34390923,
      totalDays: 398,
    });
  });
});

describe('formatTime', () => {
  it('< 1 hour', () => {
    expect(formatTime(123)).toEqual('02:03');
  });
  it('>= 1 hour', () => {
    expect(formatTime(3661)).toEqual('01:01:01');
  });
});

describe('formatFromServerDate', () => {
  it('pass', () => {
    expect(formatFromServerDate('2019-05-15T00:01:02Z')).toEqual(
      '2019.05.15 09:01:02',
    );
  });
});

describe('getIsRecent', () => {
  const HOUR = 60 * 60 * 1000;
  it('date 숫자 true', () => {
    expect(getIsRecent(Date.now() - HOUR, 2)).toBe(true);
  });
  it('date 숫자 false', () => {
    expect(getIsRecent(Date.now() - HOUR * 3, 2)).toBe(false);
  });
  it('date 문자 true', () => {
    const param = format(Date.now() - HOUR, 'yyyy-MM-dd HH:mm:ss');
    expect(getIsRecent(param, 2)).toBe(true);
  });
  it('date 문자 false', () => {
    const param = format(Date.now() - HOUR * 3, 'yyyy-MM-dd HH:mm:ss');
    expect(getIsRecent(param, 2)).toBe(false);
  });
});

describe('getIsBetween', () => {
  const HOUR = 60 * 60 * 1000;

  it('date 문자 true', () => {
    const fromDate = format(Date.now() - HOUR, 'yyyy-MM-dd HH:mm:ss');
    const toDate = format(Date.now() + HOUR, 'yyyy-MM-dd HH:mm:ss');
    expect(getIsBetween(fromDate, toDate)).toBe(true);
  });
  it('date 문자 false', () => {
    const fromDate = format(Date.now() - HOUR * 4, 'yyyy-MM-dd HH:mm:ss');
    const toDate = format(Date.now() - HOUR * 3, 'yyyy-MM-dd HH:mm:ss');
    expect(getIsBetween(fromDate, toDate)).toBe(false);
  });
});

describe('_getTimestampForRegionFromUtcDate', () => {
  it('date 숫자인 경우', () => {
    // 2020-01-10 09:00:00 (UTC)
    const ts = _getTimestampForRegionFromUtcDate(1578646800000);
    expect(format(ts, 'yyyy-MM-dd HH:mm:ss')).toBe('2020-01-10 18:00:00');
  });
  it('date 문자열 yyyy-MM-dd 포맷', () => {
    const ts = _getTimestampForRegionFromUtcDate('2020-01-10');
    expect(format(ts, 'yyyy-MM-dd HH:mm:ss')).toBe('2020-01-10 09:00:00');
  });
  it('date 문자열 yyyy-MM-dd HH:mm:ss 포맷', () => {
    const ts = _getTimestampForRegionFromUtcDate('2020-01-10 04:00:00');
    expect(format(ts, 'yyyy-MM-dd HH:mm:ss')).toBe('2020-01-10 13:00:00');
  });
});
