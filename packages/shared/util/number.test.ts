import { getRange, round } from './number';

describe('getRange', () => {
  it('3에서 9까지 가져오기', () => {
    expect(getRange(3, 10)).toEqual([3, 4, 5, 6, 7, 8, 9]);
  });
  it('0에서 1까지 가져오기', () => {
    expect(getRange(0, 2)).toEqual([0, 1]);
  });
  it('10에서 7까지 가져오기, 빈 배열 리턴', () => {
    expect(getRange(10, 7)).toEqual([]);
  });
});

describe('round', () => {
  it('소수 첫째 자리에서 반올림(버림)', () => {
    expect(round(12.322, 1)).toEqual(12);
  });
  it('소수 첫째 자리에서 반올림(올림)', () => {
    expect(round(12.51, 1)).toEqual(13);
  });
  it('소수점 네번째 자리에서 반올림', () => {
    expect(round(0.123564123, 0.001)).toEqual(0.124);
  });
  it('세번째 자리에서 반올림', () => {
    expect(round(25252.12212, 1000)).toEqual(25000);
  });
});
