import { renderHook } from '@testing-library/react-hooks';
import { __setMockQuery } from 'next/router';

import useQueryParameter, {
  getNumberOptional,
  getNumberRequired,
  getStringOptional,
  getStringRequired,
} from '../hook/useQueryParameter';
// eslint-disable-next-line kakaoent-plugin/no-next-router

describe('query name', () => {
  it('snake_case to camelCase', () => {
    let param = [{ name: 'someValue', getter: getNumberRequired }];
    __setMockQuery({ some_value: 123 });

    const { rerender, result } = renderHook(() => useQueryParameter(param));
    rerender();
    expect(result.current.query).toEqual({ someValue: 123 });
    expect(result.current.isValid).toBeTruthy();
  });
});

describe('getter', () => {
  it('getNumberRequired', () => {
    let param = [{ name: 'id', getter: getNumberRequired }];
    __setMockQuery({ id: 123 });

    const { rerender, result } = renderHook(() => useQueryParameter(param));
    rerender();
    expect(result.current.query).toEqual({ id: 123 });
    expect(result.current.isValid).toBeTruthy();
  });
  it('getNumberRequired, 값 없는 경우', () => {
    let param = [{ name: 'id', getter: getNumberRequired }];
    __setMockQuery({});

    const { rerender, result } = renderHook(() => useQueryParameter(param));
    rerender();
    expect(result.current.isValid).toBeFalsy();
  });
  it('getNumberRequired, 숫자가 아닌 경우', () => {
    let param = [{ name: 'id', getter: getNumberRequired }];
    __setMockQuery({ id: 'abc' });

    const { rerender, result } = renderHook(() => useQueryParameter(param));
    rerender();
    expect(result.current.isValid).toBeFalsy();
  });
  it('getNumberOptional, 값 없는 경우', () => {
    let param = [{ name: 'id', getter: getNumberOptional }];
    __setMockQuery({});

    const { rerender, result } = renderHook(() => useQueryParameter(param));
    rerender();
    expect(result.current.isValid).toBeTruthy();
  });
  it('getNumberOptional, 숫자가 아닌 경우', () => {
    let param = [{ name: 'id', getter: getNumberOptional }];
    __setMockQuery({ id: 'abc' });

    const { rerender, result } = renderHook(() => useQueryParameter(param));
    rerender();
    expect(result.current.isValid).toBeFalsy();
  });
  it('getStringRequired', () => {
    let param = [{ name: 'id', getter: getStringRequired }];
    __setMockQuery({ id: '123' });

    const { rerender, result } = renderHook(() => useQueryParameter(param));
    rerender();
    expect(result.current.query).toEqual({ id: '123' });
    expect(result.current.isValid).toBeTruthy();
  });
  it('getStringRequired, 값 없는 경우', () => {
    let param = [{ name: 'id', getter: getStringRequired }];
    __setMockQuery({});

    const { rerender, result } = renderHook(() => useQueryParameter(param));
    rerender();
    expect(result.current.isValid).toBeFalsy();
  });
  it('getStringOptional, 값 없는 경우', () => {
    let param = [{ name: 'id', getter: getStringOptional }];
    __setMockQuery({});

    const { rerender, result } = renderHook(() => useQueryParameter(param));
    rerender();
    expect(result.current.isValid).toBeTruthy();
  });
});
