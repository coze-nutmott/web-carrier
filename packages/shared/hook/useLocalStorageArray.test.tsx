import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorageArray from './useLocalStorageArray';
import { deleteLocalStorage } from '../util/localStorage';

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
      result.current[1]([333, 444]);
    });
    expect(result.current[0]).toEqual([111, 222, 333, 444]);
  });
});
