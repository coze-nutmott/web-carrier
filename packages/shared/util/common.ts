import { KeyboardKeyType } from '../type';

export function callIfFunc(funcVal: any, ...param: any[]) {
  return typeof funcVal === 'function' ? funcVal(...param) : funcVal;
}

export const getKeys: <T>(obj: T) => Array<keyof T> = Object.keys;

export function getKeyboardKeyType(e: KeyboardEventObject) {
  /**
   * key 는 크롬 하위 버전에서 지원이 안되기 때문에 keyCode 도 같이 봐야한다
   * keyCode 만 봐도 되겠지만 deprecated 된 속성값이라 key 랑 같이 보는게 좋다
   */
  const key = e.key || e.keyCode;
  switch (key) {
    case 'ArrowLeft':
    case 'Left':
    case 37:
      return KeyboardKeyType.ArrowLeft;
    case 'ArrowRight':
    case 'Right':
    case 39:
      return KeyboardKeyType.ArrowRight;
    case 'ArrowUp':
    case 'Up':
    case 38:
      return KeyboardKeyType.ArrowUp;
    case 'ArrowDown':
    case 'Down':
    case 40:
      return KeyboardKeyType.ArrowDown;
    case ' ':
    case 'Spacebar':
    case 32:
      return KeyboardKeyType.Space;
    case 'Escape':
    case 'Esc':
    case 27:
      return KeyboardKeyType.Escape;
    case 'Enter':
    case 13:
      return KeyboardKeyType.Enter;
    case 33:
      return KeyboardKeyType.PageUp;
    case 34:
      return KeyboardKeyType.PageDown;
    default:
      return KeyboardKeyType.None;
  }
}

export function assert(value: any, errorMsg: string): asserts value {
  if (!value) throw new Error(errorMsg);
}
