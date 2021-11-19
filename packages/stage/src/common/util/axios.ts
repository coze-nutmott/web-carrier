import { AxiosError } from 'axios';
import { IErrorResponse } from 'common/type';

export function isAxiosError(
  value: unknown,
): value is AxiosError<IErrorResponse> {
  const castedValue = value as AxiosError<IErrorResponse>;

  return (
    castedValue.response !== undefined &&
    castedValue.response.data.stageErrorMessage !== undefined
  );
}

export function getStatusCode(error: unknown): number | undefined {
  if (!isAxiosError(error)) return undefined;

  return error.response?.status;
}

export function isNotSignedUpError(error: unknown): boolean {
  if (isAxiosError(error)) {
    return (
      error.response?.status === 403 &&
      error.response.data.stageErrorCode === 'ACCOUNT_107'
    );
  }

  return false;
}
