import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorageMap from './useLocalStorageMap';
import {
  deleteLocalStorage,
  getLocalStorageObject,
  setLocalStorageObject,
} from '../util/localStorage';

describe('useLocalStorageMap', () => {
  const STORAGE_KEY = 'test-key';
  beforeEach(() => {
    deleteLocalStorage(STORAGE_KEY);
    deleteLocalStorage(`${STORAGE_KEY}-keys`);
  });
  it('initialValue', () => {
    const { result } = renderHook(
      () =>
        useLocalStorageMap({
          key: STORAGE_KEY,
          initialValue: { key1: 111 },
        }),
      { wrapper: global.getWrapperWithRedux() },
    );
    expect(result.current[0]).toEqual({ key1: 111 });
  });
  it('generate keys if not exist', () => {
    setLocalStorageObject({
      key: STORAGE_KEY,
      value: { key1: 111, key2: 222 },
    });
    renderHook(
      () =>
        useLocalStorageMap<number>({
          key: STORAGE_KEY,
          initialValue: { key1: 111 },
        }),
      { wrapper: global.getWrapperWithRedux() },
    );
    const keys = getLocalStorageObject(`${STORAGE_KEY}-keys`);
    expect(keys).toEqual(['key1', 'key2']);
  });
  it('maxLength', () => {
    const { result } = renderHook(
      () =>
        useLocalStorageMap<number>({
          key: STORAGE_KEY,
          maxLength: 1,
          initialValue: { key1: 111 },
        }),
      { wrapper: global.getWrapperWithRedux() },
    );
    act(() => {
      result.current[1]({ key2: 222 });
    });
    // 이전 값을 삭제하고 가장 최신 데이터를 저장한다
    expect(result.current[0]).toEqual({ key2: 222 });
  });
  it('multiple set', () => {
    const { result } = renderHook(
      () =>
        useLocalStorageMap<number>({
          key: STORAGE_KEY,
          initialValue: { key1: 111, key2: 222 },
        }),
      { wrapper: global.getWrapperWithRedux() },
    );
    act(() => {
      result.current[1]({ key1: 1, key3: 333 });
    });
    expect(result.current[0]).toEqual({ key1: 1, key2: 222, key3: 333 });
  });
});
