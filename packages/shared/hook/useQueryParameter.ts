import { useRouter } from 'next/router';
import { useEffect } from 'react';
import snakeCase from 'lodash/snakeCase';

export default function useQueryParameter<Q extends { [key: string]: any }>(
  items: Array<{ name: keyof Q & string; getter: (value?: string) => any }>,
  option?: { isNoAutoInvalidHandling?: boolean },
): { query: Q; isValid: true } | { query: Partial<Q>; isValid: false } {
  const router = useRouter();
  const query: { [key: string]: any } = {};
  let isValid = true;
  for (const item of items) {
    let value: string | string[] | undefined =
      router.query[snakeCase(item.name)];
    if (typeof value === 'object') {
      isValid = false;
    } else {
      try {
        query[item.name] = item.getter(value);
      } catch {
        isValid = false;
      }
    }
  }
  useEffect(() => {
    if (!option?.isNoAutoInvalidHandling && !isValid) {
      router.replace('/');
    }
  });
  return isValid
    ? { query: query as Q, isValid }
    : { query: query as Partial<Q>, isValid };
}

export function getNumberRequired(value?: string) {
  if (value === undefined) {
    throw new Error('query value === undefined');
  }
  return getNumberOptional(value);
}
export function getNumberOptional(value?: string) {
  if (value === undefined) {
    return undefined;
  }
  const result = Number(value);
  if (Number.isNaN(result)) {
    throw new Error('query value is isNaN');
  }
  return result;
}
export function getStringRequired(value?: string) {
  if (value === undefined) {
    throw new Error('query value === undefined');
  }
  return getStringOptional(value);
}
export function getStringOptional(value?: string) {
  return value;
}
