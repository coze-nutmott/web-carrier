import { useCallback, useEffect, useRef } from 'react';

import { assert } from '../util/common';
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from '../util/localStorage';
import useLocalStorage from './useLocalStorage';

type IKey = string | number;
type IMap<V> = { [k in IKey]: V };

export default function useLocalStorageMap<
  V extends string | number | boolean,
>({
  initialValue = {},
  maxLength = 100,
  key,
  ...rest
}: {
  key: string;
  initialValue?: IMap<V>;
  needDebounce?: boolean;
  maxLength?: number;
}): [IMap<V>, (partial: IMap<V>) => void, boolean] {
  const [map, setMap, isFromLocalStorage] = useLocalStorage({
    initialValue,
    key,
    ...rest,
  });
  const [keys, setKeys, isFromLocalStorage2] = useLocalStorage<string[]>({
    initialValue: Object.keys(initialValue),
    key: getKeyForKeys(key),
    ...rest,
  });

  // 키 정보가 존재하지 않으면 생성해준다
  // useLocalStorage를 사용해서 object를 관리하다가 useLocalStorageMap로 변경한 경우에 필요함
  const isCheckedNoKeysRef = useRef(false);
  useEffect(() => {
    if (
      isFromLocalStorage &&
      isFromLocalStorage2 &&
      !isCheckedNoKeysRef.current
    ) {
      isCheckedNoKeysRef.current = true;
      const mapKeys = Object.keys(map);
      const storageKeys = getLocalStorageObject(getKeyForKeys(key));
      if (mapKeys.length > 0 && !storageKeys) {
        setKeys(mapKeys);
      }
    }
  }, [isFromLocalStorage, isFromLocalStorage2, keys, setKeys, map, key]);

  const merge = useCallback(
    (partial: IMap<V>) => {
      const partialKeys = Object.keys(partial);
      assert(
        partialKeys.length <= maxLength,
        'partialKeys must be less or equal than maxLength',
      );
      const notPartialKeys = keys.filter(item => partial[item] === undefined);
      if (notPartialKeys.length + partialKeys.length > maxLength) {
        const newMap = { ...partial };
        const selectedKeys: string[] = [];
        for (let i = notPartialKeys.length - 1; i >= 0; i--) {
          if (partialKeys.length + selectedKeys.length >= maxLength) {
            break;
          }
          const k = keys[i];
          newMap[k] = map[k];
          selectedKeys.push(k);
        }
        setMap(newMap);
        setKeys([...selectedKeys.reverse(), ...partialKeys]);
      } else {
        setMap({ ...map, ...partial });
        setKeys([...notPartialKeys, ...partialKeys]);
      }
    },
    [map, setMap, maxLength, keys, setKeys],
  );
  // merge 매개변수는 partial object 이다. 즉, map과 머지된다
  return [map, merge, isFromLocalStorage];
}

function getKeyForKeys(prefix: string) {
  return `${prefix}-keys`;
}

function deleteLsMapKeys<K extends IKey>(
  key: string,
  getIsDeleteKey: (key: K) => boolean,
) {
  const storageKeys = getLocalStorageObject<K[]>(getKeyForKeys(key));
  if (!storageKeys) return;

  setLocalStorageObject({
    key: getKeyForKeys(key),
    value: storageKeys.filter(_key => !getIsDeleteKey(_key)),
  });
}

function deleteLsMapValues<K extends IKey>(
  key: string,
  getIsDeleteKey: (key: K) => boolean,
) {
  const valueMap = getLocalStorageObject<IMap<any>>(key);
  if (!valueMap) return;

  for (const key in valueMap) {
    if (getIsDeleteKey(key as K)) {
      delete valueMap[key];
    }
  }

  setLocalStorageObject({
    key,
    value: valueMap,
  });
}

export function deleteLsMap<K extends IKey>(
  key: string,
  getIsDeleteKey: (key: K) => boolean,
) {
  deleteLsMapValues(key, getIsDeleteKey);
  deleteLsMapKeys(key, getIsDeleteKey);
}

export function getIsExistKeyInLsMap<K extends IKey>(
  key: string,
  getIsExistKey: (key: K) => boolean,
): boolean {
  const storageKeys = getLocalStorageObject<K[]>(getKeyForKeys(key));
  return !!storageKeys?.find(getIsExistKey);
}
