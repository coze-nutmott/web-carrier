import { renderHook, act } from '@testing-library/react-hooks';

import { deleteLocalStorage } from '../util/localStorage';
import useLocalStorageArray from './useLocalStorageArray';

describe('useLocalStorageArray', () => {
  const STORAGE_KEY = 'test-key';
  beforeEach(() => {
    deleteLocalStorage(STORAGE_KEY);
  });
  it('initialValue', () => {
    const { result } = renderHook(
      () =>
        useLocalStorageArray({
          key: STORAGE_KEY,
          initialValue: [111],
        }),
      { wrapper: global.getWrapperWithRedux() },
    );
    expect(result.current[0]).toEqual([111]);
  });
  it('maxLength', () => {
    const { result } = renderHook(
      () =>
        useLocalStorageArray<number>({
          key: STORAGE_KEY,
          maxLength: 2,
          initialValue: [111, 222],
        }),
      { wrapper: global.getWrapperWithRedux() },
    );
    act(() => {
      result.current[1](333);
    });
    expect(result.current[0]).toEqual([222, 333]);
  });
  it('isUnique', () => {
    const { result } = renderHook(
      () =>
        useLocalStorageArray<number>({
          key: STORAGE_KEY,
          initialValue: [111, 222],
          isUnique: true,
        }),
      { wrapper: global.getWrapperWithRedux() },
    );
    act(() => {
      result.current[1](111);
    });
    // 111 must be last
    expect(result.current[0]).toEqual([222, 111]);
  });
  it('multiple push', () => {
    const { result } = renderHook(
      () =>
        useLocalStorageArray<number>({
          key: STORAGE_KEY,
          initialValue: [111, 222],
        }),
      { wrapper: global.getWrapperWithRedux() },
    );
    act(() => {
      result.current[1](333, 444);
    });
    expect(result.current[0]).toEqual([111, 222, 333, 444]);
  });

  describe('setValue', () => {
    it('set new value', () => {
      const { result } = renderHook(
        () =>
          useLocalStorageArray<number>({
            key: STORAGE_KEY,
            initialValue: [111, 222],
          }),
        { wrapper: global.getWrapperWithRedux() },
      );
      act(() => {
        result.current[2]([333, 444]);
      });
      expect(result.current[0]).toEqual([333, 444]);
    });

    it('set new value without duplication', () => {
      const { result } = renderHook(
        () =>
          useLocalStorageArray<number>({
            key: STORAGE_KEY,
            initialValue: [111, 222],
            isUnique: true,
          }),
        { wrapper: global.getWrapperWithRedux() },
      );
      act(() => {
        result.current[2]([333, 333, 444, 555]);
      });
      expect(result.current[0]).toEqual([333, 444, 555]);
    });

    it('set new value up to max length', () => {
      const { result } = renderHook(
        () =>
          useLocalStorageArray<number>({
            key: STORAGE_KEY,
            initialValue: [111, 222],
            maxLength: 3,
          }),
        { wrapper: global.getWrapperWithRedux() },
      );
      act(() => {
        result.current[2]([333, 444, 555, 666]);
      });
      expect(result.current[0]).toEqual([444, 555, 666]);
    });
  });
});
