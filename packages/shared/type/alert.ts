import { ReactNode } from 'react';

export interface IKAlertCommon {
  // 같은 groupId가 존재하면 함수만 연결해주고, 나머지 속성은 무시한다
  groupId?: string;
  title: string | ReactNode | ReactNode[];
  desc?: string | ReactNode | ReactNode[];
  labelClose?: string;
  onRequestClose?: () => void;
  callback?: () => void;
  callbackSecond?: () => void;
  isForced?: boolean;
  isButtonVertical?: boolean;
}
export interface IKAlertOneConfirm extends IKAlertCommon {
  buttonSet?: 'cancelAndConfirm' | 'confirm' | 'cancel';
  labelConfirm?: string;
  labelSecondConfirm?: string;
}
export interface IKAlertTwoConfirm extends IKAlertCommon {
  buttonSet: 'cancelAndTwoConfirm' | 'twoConfirm';
  labelConfirm: string;
  labelSecondConfirm: string;
}
export type IKAlert = IKAlertOneConfirm | IKAlertTwoConfirm;
export type IKAlertButtonSet =
  | 'confirm'
  | 'cancel'
  | 'cancelAndConfirm'
  | 'twoConfirm'
  | 'cancelAndTwoConfirm';
