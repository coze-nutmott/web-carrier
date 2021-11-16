import { useCallback, useRef } from 'react';

import useLocalStorage from '../hook/useLocalStorage';

export default function useLocalStorageArray<T>({
  initialValue = [],
  maxLength = 100,
  isUnique = false,
  ...rest
}: {
  key: string;
  initialValue?: T[];
  needDebounce?: boolean;
  maxLength?: number;
  isUnique?: boolean;
}): [T[], (...values: T[]) => void, (values: T[]) => void, boolean] {
  const [value, setValue, isFromLocalStorage] = useLocalStorage({
    initialValue,
    ...rest,
  });
  const valueRef = useRef(value);
  valueRef.current = value;
  const push = useCallback(
    (...items: T[]) => {
      const notItems = isUnique
        ? valueRef.current.filter(v => !items.includes(v))
        : valueRef.current;
      const newValue = [...notItems, ...items].slice(-maxLength);
      setValue(newValue);
    },
    [setValue, maxLength, isUnique],
  );

  const replace = useCallback(
    (items: T[]) => {
      const notItems = isUnique
        ? items.filter((v, index) => {
            return index === items.findIndex(item => item === v);
          })
        : items;
      const newValue = notItems.slice(-maxLength);
      setValue(newValue);
    },
    [setValue, maxLength, isUnique],
  );

  return [value, push, replace, isFromLocalStorage];
}
