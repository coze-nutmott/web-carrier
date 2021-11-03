import { IKAlert } from './alert';

export interface IStateShared {
  kAlerts: IKAlert[];
  toasts: IToast[];
  isAppMounted: boolean;
}

export interface IStateDefault {
  shared: IStateShared;
}

declare module 'react-redux' {
  interface DefaultRootState extends IStateDefault {}
}
declare module 'next/router' {
  const __setMockQuery: (query: object) => void;
}

export interface IToast {
  toastId?: string | number;
  title?: string;
  desc: string;
  showingDuration?: number;
  img?: string;
  imgSize?: string;
}

export enum KeyboardKeyType {
  None,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Space,
  Escape,
  Enter,
  PageUp,
  PageDown,
}
