import { errorMessage, ERROR_MESSAGES } from 'common/util/errorMessage';

describe('errorMessage', () => {
  it('errorMessage', () => {
    const message = 'test error message';
    const input = { response: { data: { stageErrorMessage: message } } };
    const output = message;
    expect(errorMessage(input)).toEqual(output);
  });
  it('default errorMessage', () => {
    const input = {};
    const output = ERROR_MESSAGES.DEFAULT;
    expect(errorMessage(input)).toEqual(output);
  });
  it('custom default errorMessage', () => {
    const message = 'test error message';
    expect(errorMessage({}, message)).toEqual(message);
  });
});
