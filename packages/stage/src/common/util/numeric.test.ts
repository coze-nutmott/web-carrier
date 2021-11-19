import { numberToHuman, numberWithDelimiter } from 'common/util/numeric';

describe('numberToHuman', () => {
  it('undefined', () => {
    let input;
    const output = '0';
    expect(numberToHuman(input)).toEqual(output);
  });
  it('123', () => {
    const input = 123;
    const output = '123';
    expect(numberToHuman(input)).toEqual(output);
  });
  // it('1.2천', () => {
  //   const input = 1234;
  //   // const output = '1.2천';
  //   const output = '1234';
  //   expect(numberToHuman(input)).toEqual(output);
  // });
  it('12.3만', () => {
    const input = 123456;
    const output = '12.3만';
    expect(numberToHuman(input)).toEqual(output);
  });
  it('1234.6만 반올림', () => {
    const input = 12345678;
    const output = '1234.6만';
    const option = { isNeedRound: true };
    expect(numberToHuman(input, option)).toEqual(output);
  });
});

describe('numberWithDelimiter', () => {
  it('undefined', () => {
    let input;
    const output = '0';
    expect(numberWithDelimiter(input)).toEqual(output);
  });
  it('1,000', () => {
    const input = 1_000;
    const output = '1,000';
    expect(numberWithDelimiter(input)).toEqual(output);
  });
  it('1,000,000', () => {
    const input = 1_000_000;
    const output = '1,000,000';
    expect(numberWithDelimiter(input)).toEqual(output);
  });
});
