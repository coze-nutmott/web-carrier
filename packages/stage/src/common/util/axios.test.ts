import {
  getStatusCode,
  isAxiosError,
  isNotSignedUpError,
} from 'common/util/axios';

describe('isAxiosError', () => {
  it('isAxiosError is true', () => {
    const input = { response: { data: { stageErrorMessage: 'error' } } };
    const output = true;
    expect(isAxiosError(input)).toEqual(output);
  });
  it('isAxiosError is false', () => {
    const input1 = {};
    const input2 = { response: { data: {} } };
    const output = false;
    expect(isAxiosError(input1)).toEqual(output);
    expect(isAxiosError(input2)).toEqual(output);
  });
});

describe('getStatusCode', () => {
  it('getStatusCode is 500', () => {
    const input = {
      response: { data: { stageErrorMessage: 'error' }, status: 500 },
    };
    const output = 500;
    expect(getStatusCode(input)).toEqual(output);
  });
  it('getStatusCode is undefined', () => {
    const input1 = {};
    const input2 = { response: { data: {}, status: 500 } };
    const output = undefined;
    expect(getStatusCode(input1)).toEqual(output);
    expect(getStatusCode(input2)).toEqual(output);
  });

  describe('isNotSignedUpError', () => {
    it('isNotSignedUpError is true', () => {
      const input = {
        response: {
          data: { stageErrorMessage: 'error', stageErrorCode: 'ACCOUNT_107' },
          status: 403,
        },
      };
      const output = true;
      expect(isNotSignedUpError(input)).toEqual(output);
    });
    it('isNotSignedUpError is false', () => {
      const input1 = {};
      const input2 = { response: { data: {}, status: 500 } };
      const input3 = {
        response: {
          data: { stageErrorMessage: 'error', stageErrorCode: 'ACCOUNT_109' },
          status: 403,
        },
      };
      const input4 = {
        response: {
          data: { stageErrorMessage: 'error', stageErrorCode: 'ACCOUNT_107' },
          status: 503,
        },
      };
      const output = false;
      expect(isNotSignedUpError(input1)).toEqual(output);
      expect(isNotSignedUpError(input2)).toEqual(output);
      expect(isNotSignedUpError(input3)).toEqual(output);
      expect(isNotSignedUpError(input4)).toEqual(output);
    });
  });
});
