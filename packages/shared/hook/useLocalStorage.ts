import { useState, useEffect, useRef, useCallback } from 'react';
import {
  getLocalStorageBool,
  setLocalStorageBool,
  getLocalStorageNumber,
  getLocalStorageString,
  setLocalStorageString,
  setLocalStorageNumber,
  getLocalStorageObject,
  setLocalStorageObject,
  ILocalStorageSetParam,
  subscribeStorage,
  unsubscribeStorage,
} from '../util/localStorage';
import debounce from 'lodash/debounce';
import { useSelector } from 'react-redux';

type IStorageValue = boolean | number | string | object;

export default function useLocalStorage<T extends IStorageValue>({
  key,
  initialValue,
  needDebounce = false,
}: {
  key: string;
  initialValue: T;
  needDebounce?: boolean;
}): [T, typeof setValue, boolean] {
  const isAppMounted = useSelector(state => state.shared.isAppMounted);
  const [isFromLocalStorage, setIsFromLocalStorage] = useState(isAppMounted);
  const typeName = typeof initialValue as
    | 'object'
    | 'number'
    | 'string'
    | 'boolean';
  // 모든 T는 initialValue를 기반으로 하므로 아래 코드에서 사용한 as는 안전하다
  const getter: IGetter<T> = getterMap[typeName] as IGetter<T>;
  const setter = useRef<ISetter<T>>(
    needDebounce
      ? (debounce(setterMap[typeName], 500) as ISetter<T>)
      : (setterMap[typeName] as ISetter<T>),
  );
  const [value, setInnerValue] = useState<T>(
    isAppMounted
      ? () => {
          const v = getter(key);
          return v === undefined ? initialValue : v;
        }
      : initialValue,
  );

  useEffect(() => {
    if (isAppMounted && !isFromLocalStorage) {
      const v = getter(key);
      const v2 = v === undefined ? initialValue : v;
      if (value !== v2) {
        setInnerValue(v2);
      }
      setIsFromLocalStorage(true);
    }
  }, [isAppMounted, isFromLocalStorage, getter, key, initialValue, value]);

  useEffect(() => {
    const observer = {
      key,
      callback: (v: T | undefined) =>
        setInnerValue(v === undefined ? initialValue : v),
    };
    subscribeStorage(observer);
    return () => unsubscribeStorage(observer);
  }, [key, initialValue]);

  const setValue = useCallback(
    (v: T): void => {
      // TODO: isFromLocalStorage false인 경우에 set하면 기존에 저장된 값을 덮어쓰는 문제가 있다.
      setInnerValue(v);
      setter.current({ key, value: v });
    },
    [key],
  );

  return [value, setValue, isFromLocalStorage];
}

type IGetter<T extends IStorageValue> = (key: string) => T | undefined;
type ISetter<T extends IStorageValue> = (
  param: ILocalStorageSetParam<T>,
) => boolean;

const getterMap = {
  object: getLocalStorageObject,
  number: getLocalStorageNumber,
  string: getLocalStorageString,
  boolean: getLocalStorageBool,
};
const setterMap = {
  object: setLocalStorageObject,
  number: setLocalStorageNumber,
  string: setLocalStorageString,
  boolean: setLocalStorageBool,
};
