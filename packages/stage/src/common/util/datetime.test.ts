import {
  afterOneMonth,
  afterWeeks,
  dateToTimestamp,
  isAfterDay,
  isBefore,
  timeAgoInDays,
  timeAgoInWords,
  timestampToFormattedString,
} from 'common/util/datetime';
import { addDays, subDays, subMonths, subYears } from 'date-fns';
import { parseDate } from 'shared/util/date';

describe('timestampToFormattedString', () => {
  it('timestampToFormattedString', () => {
    const input = '2020-09-01T12:00:00';
    const output = '2020.09.01';
    expect(timestampToFormattedString(input)).toEqual(output);
  });
  it('timestampToFormattedString with time', () => {
    const input = '2020-09-01T12:00:00';
    const output = '2020.09.01 12:00';
    const option = { withTime: true };
    expect(timestampToFormattedString(input, option)).toEqual(output);
  });
  it('timestampToFormattedString is empty', () => {
    const output = '';
    expect(timestampToFormattedString()).toEqual(output);
  });
});

describe('timeAgoInWords', () => {
  it('1분 미만 전', () => {
    const input = parseDate().toISOString();
    const output = '1분 미만 전';
    expect(timeAgoInWords(input)).toEqual(output);
  });
  it('2일 전', () => {
    const input = subDays(parseDate(), 2).toISOString();
    const output = '2일 전';
    expect(timeAgoInWords(input)).toEqual(output);
  });
  it('2개월 전', () => {
    const input = subMonths(parseDate(), 2).toISOString();
    const output = '2개월 전';
    expect(timeAgoInWords(input)).toEqual(output);
  });
  it('약 2년 전', () => {
    const input = subYears(parseDate(), 2).toISOString();
    const output = '약 2년 전';
    expect(timeAgoInWords(input)).toEqual(output);
  });
  it('empty input', () => {
    const output = '';
    expect(timeAgoInWords()).toEqual(output);
  });
});

describe('timeAgoInDays', () => {
  it('timeAgoInDays now', () => {
    const input = parseDate().toString();
    const output = 0;
    expect(timeAgoInDays(input)).toEqual(output);
  });
  it('timeAgoInDays some days ago', () => {
    const howManyDays = 2;
    const input = subDays(parseDate(), howManyDays).toISOString();
    const output = howManyDays;
    expect(timeAgoInDays(input)).toEqual(output);
  });
});

describe('dateToTimestamp', () => {
  it('dateToTimestamp', () => {
    const input = parseDate();
    const output = 'yyyy-MM-ddTHH:mm:ss'.length;
    expect(dateToTimestamp(input)).toHaveLength(output);
  });
  it('dateToTimestamp empty value', () => {
    const output = undefined;
    expect(dateToTimestamp()).toEqual(output);
  });
});

describe('after', () => {
  it('afterOneMonth', () => {
    const input = '2020-12-28T12:00:00';
    const output = '2021-01-28T12:00:00';
    expect(afterOneMonth(input)).toEqual(output);
  });
  it('afterWeeks', () => {
    const input = '2020-12-28T12:00:00';
    const output = '2021-01-04T12:00:00';
    expect(afterWeeks(input)).toEqual(output);
  });
  it('isAfterDay', () => {
    const input1 = '2020-12-28T12:00:00';
    const output1 = false;
    expect(isAfterDay(input1)).toEqual(output1);

    const input2 = '3333-12-28T12:00:00';
    const output2 = true;
    expect(isAfterDay(input2)).toEqual(output2);
  });
});

describe('before', () => {
  it('isBefore false', () => {
    const input1 = '2020-12-28T12:00:00';
    const output1 = false;
    expect(isBefore(input1, input1)).toEqual(output1);

    const input2 = ['2020-12-28T12:00:00', '2020-12-25T12:00:00'];
    const output2 = false;
    expect(isBefore(input2[0], input2[1])).toEqual(output2);

    const input3 = '2020-12-28T12:00:00';
    const output3 = false;
    expect(isBefore(undefined, input3)).toEqual(output3);
  });

  it('isBefore true', () => {
    const input1 = ['2019-12-28T12:00:00', '2020-12-28T12:00:00'];
    const output1 = true;
    expect(isBefore(input1[0], input1[1])).toEqual(output1);
  });
});
