import { IS_CLIENT } from '../common/constant';
import { assert } from './common';
import { MAX_DATE, parseDate } from './date';

export interface ILocalStorageSetParam<T> {
  key: string;
  value: T;
  expireDate?: Date;
}

function getLocalStorage(key: string): string | undefined {
  assert(IS_CLIENT, '클라이언트에서 실행되어야합니다.');

  try {
    const expireDateStr = window.localStorage.getItem(
      `${EXPIRE_DATE_PREFIX}${key}`,
    );
    if (expireDateStr) {
      const expireDateNumber = Number(expireDateStr);
      if (isNaN(expireDateNumber)) {
        deleteLocalStorage(key);
        return undefined;
      }
      const expireDateTime = parseDate(expireDateNumber).getTime();
      const nowDateTime = Date.now();
      if (expireDateTime < nowDateTime) {
        deleteLocalStorage(key);
        return undefined;
      }
    }
    return window.localStorage.getItem(key) || undefined;
  } catch {
    // 사용자가 로컬 스토리지를 사용하지 않도록 설정할 수 있다.
    return undefined;
  }
}

function setLocalStorage(param: ILocalStorageSetParam<string>): boolean {
  assert(IS_CLIENT, '클라이언트에서 실행되어야합니다.');

  try {
    const { expireDate, value, key } = param;
    const expireDateTime = expireDate ? expireDate.getTime() : MAX_DATE_TIME;
    const nowDateTime = Date.now();
    if (expireDateTime < nowDateTime) {
      // 이미 expire date를 지난 값이므로 저장하지 않음
      return true;
    }
    window.localStorage.setItem(key, value);
    if (expireDateTime !== MAX_DATE_TIME) {
      window.localStorage.setItem(
        `${EXPIRE_DATE_PREFIX}${key}`,
        `${expireDateTime}`,
      );
    }
    return true;
  } catch {
    // 사용자가 로컬 스토리지를 사용하지 않도록 설정하거나 용량 부족 등으로 에러가 날 수 있다.
    return false;
  }
}

export function deleteLocalStorage(key: string) {
  assert(IS_CLIENT, '클라이언트에서 실행되어야합니다.');

  try {
    window.localStorage.removeItem(key);
    window.localStorage.removeItem(`${EXPIRE_DATE_PREFIX}${key}`);
    notify(key);
  } catch {
    // 사용자가 로컬 스토리지를 사용하지 않도록 설정할 수 있다.
  }
}

export function clearLocalStorage() {
  assert(IS_CLIENT, '클라이언트에서 실행되어야합니다.');

  try {
    window.localStorage.clear();
  } catch {
    // 사용자가 로컬 스토리지를 사용하지 않도록 설정할 수 있다.
  }
}

export function getLocalStorageBool(key: string) {
  switch (getLocalStorage(key)) {
    case 'Y':
      return true;
    case 'N':
      return false;
    default:
      return undefined;
  }
}
export function setLocalStorageBool(
  param: ILocalStorageSetParam<boolean>,
): boolean {
  const isSuccess = setLocalStorage({
    ...param,
    value: param.value ? 'Y' : 'N',
  });
  isSuccess && notify(param.key, param.value);
  return isSuccess;
}

export function getLocalStorageObject<T extends any[] | object>(
  key: string,
): T | undefined {
  const value = getLocalStorage(key);
  return value ? JSON.parse(value) : undefined;
}
export function setLocalStorageObject<T extends any[] | object>(
  param: ILocalStorageSetParam<T>,
): boolean {
  const isSuccess = setLocalStorage({
    ...param,
    value: JSON.stringify(param.value),
  });
  isSuccess && notify(param.key, param.value);
  return isSuccess;
}

export function getLocalStorageNumber(key: string): number | undefined {
  const value = getLocalStorage(key);
  return value ? Number(value) : undefined;
}
export function setLocalStorageNumber(
  param: ILocalStorageSetParam<number>,
): boolean {
  const isSuccess = setLocalStorage({ ...param, value: String(param.value) });
  isSuccess && notify(param.key, param.value);
  return isSuccess;
}

export function getLocalStorageString(key: string): string | undefined {
  const value = getLocalStorage(key);
  return value ? value : undefined;
}
export function setLocalStorageString(
  param: ILocalStorageSetParam<string>,
): boolean {
  const isSuccess = setLocalStorage({ ...param, value: param.value });
  isSuccess && notify(param.key, param.value);
  return isSuccess;
}

const MAX_DATE_TIME = MAX_DATE.getTime();
const EXPIRE_DATE_PREFIX = '__ED__';

interface IObserver {
  key: string;
  callback: (v: any) => void;
}
let observers: IObserver[] = [];
export function subscribeStorage(observer: IObserver) {
  observers.push(observer);
}
export function unsubscribeStorage(observer: IObserver) {
  observers = observers.filter(item => item !== observer);
}
function notify(key: string, value?: any) {
  for (const observer of observers) {
    if (observer.key === key) {
      observer.callback(value);
    }
  }
}
