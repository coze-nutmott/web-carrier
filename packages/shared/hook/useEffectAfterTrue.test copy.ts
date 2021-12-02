import { renderHook } from '@testing-library/react-hooks';

import useEffectAfterTrue from '../hook/useEffectAfterTrue';

describe('useEffectAfterTrue', () => {
  it('false => true', () => {
    const callback = jest.fn();
    let param = false;
    const { rerender } = renderHook(() => useEffectAfterTrue(callback, param));
    expect(callback).not.toBeCalled();
    param = true;
    rerender();
    expect(callback).toBeCalled();
  });
  it('true => false', () => {
    const callback = jest.fn();
    let param = true;
    const { rerender } = renderHook(() => useEffectAfterTrue(callback, param));
    expect(callback).toBeCalled();
    callback.mockReset();
    param = false;
    rerender();
    expect(callback).not.toBeCalled();
  });
  it('처음부터 true이면 callback을 호출한다', () => {
    const callback = jest.fn();
    renderHook(() => useEffectAfterTrue(callback, true));
    expect(callback).toBeCalled();
  });
  it('callback이 반환하는 함수는 false가 될 때 호출되어야 한다', () => {
    const callbackReturn = jest.fn();
    const callback = jest.fn(() => callbackReturn);
    let isTrue = true;
    const { rerender } = renderHook(() => useEffectAfterTrue(callback, isTrue));
    rerender();
    expect(callbackReturn).not.toBeCalled();
    isTrue = false;
    rerender();
    expect(callbackReturn).toBeCalled();
  });
  it('callback이 반환하는 함수는 unmount 될 때 호출되어야 한다', () => {
    const callbackReturn = jest.fn();
    const callback = jest.fn(() => callbackReturn);
    const { unmount } = renderHook(() => useEffectAfterTrue(callback, true));
    unmount();
    expect(callbackReturn).toBeCalled();
  });
  it('callback은 갱신되어야 한다', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    let callback = callback1;
    let isTrue = false;
    const { rerender } = renderHook(() => useEffectAfterTrue(callback, isTrue));
    callback = callback2;
    rerender();
    isTrue = true;
    rerender();
    expect(callback1).not.toBeCalled();
    expect(callback2).toBeCalled();
  });
});
