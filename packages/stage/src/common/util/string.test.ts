import { maskingEmail, removeWhitespace } from 'common/util/string';

describe('removeWhitespace', () => {
  it('has spaces', () => {
    const input = '공 백포 함-  문자열';
    const output = '공백포함-문자열';
    expect(removeWhitespace(input)).toEqual(output);
  });
  it('start with space', () => {
    const input = ' 공 백포 함-  문자열';
    const output = '공백포함-문자열';
    expect(removeWhitespace(input)).toEqual(output);
  });
  it('end with space', () => {
    const input = '공 백포 함-  문자열 ';
    const output = '공백포함-문자열';
    expect(removeWhitespace(input)).toEqual(output);
  });
});

describe('maskingEmail', () => {
  it('kiwi.bok@kakaoent.com', () => {
    const input = 'kiwi.bok@kakaoent.com';
    const output = 'kiw*****@k***********';
    expect(maskingEmail(input)).toEqual(output);
  });
  it('kiwi@k.com', () => {
    const input = 'kiwi@k.com';
    const output = 'ki**@k****';
    expect(maskingEmail(input)).toEqual(output);
  });
});
