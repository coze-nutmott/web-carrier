import useLocalStorage from '../hook/useLocalStorage';
import { useCallback, useRef } from 'react';

export default function useLocalStorageArray<T extends string | number>({
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
}): [T[], (value: T | T[]) => void, boolean] {
  const [value, setValue, isFromLocalStorage] = useLocalStorage({
    initialValue,
    ...rest,
  });
  const valueRef = useRef(value);
  valueRef.current = value;
  const push = useCallback(
    (item: T | T[]) => {
      const items = typeof item === 'object' ? item : [item];
      if (items.length > 0) {
        const notItems = isUnique
          ? valueRef.current.filter(v => !items.includes(v))
          : valueRef.current;
        const newValue = [...notItems, ...items].slice(-maxLength);
        setValue(newValue);
      }
    },
    [setValue, maxLength, isUnique],
  );
  // push 매개변수는 단일 아이템도 가능하지만 배열로 입력하면 모두 value에 추가된다
  return [value, push, isFromLocalStorage];
}
