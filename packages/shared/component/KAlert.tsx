import React, {
  useState,
  useEffect,
  useRef,
  CSSProperties,
  ComponentType,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../state/action';
import { MODAL_ANIMATION_DURATION } from '../style/variable';
import { KeyboardKeyType } from '../type';
import {
  IKAlertButtonSet,
  IKAlertCommon,
  IKAlertOneConfirm,
  IKAlertTwoConfirm,
} from '../type/alert';
import { getKeyboardKeyType } from '../util/common';
import { getLocalStorageBool, setLocalStorageBool } from '../util/localStorage';
import Modal, { FULL_OVERLAY_STYLE } from './Modal';
import { getSharedStore, sharedModalZIndex } from './SharedContainer';

export interface IProps {
  AlertContentComponent: ComponentType<IAlertContentProps>;
}

export type IAlertContentProps = IKAlertOneConfirm | IKAlertTwoConfirm;

export function KAlertComponent({ AlertContentComponent }: IProps) {
  const dispatch = useDispatch();
  const alert = useSelector(state =>
    state.shared.kAlerts.length > 0 ? state.shared.kAlerts[0] : undefined,
  );
  const initialKAlertState: IAlertState = alert ? 'open' : 'closed';
  const [kAlertState, setKAlertState] =
    useState<IAlertState>(initialKAlertState);

  const callbackRef = useRef<Function>();
  useEffect(() => {
    if (alert) {
      callbackRef.current = undefined;
      setKAlertState('open');
    }
  }, [alert]);
  useEffect(() => {
    if (kAlertState !== 'closing') {
      return;
    }
    const timerId = setTimeout(() => {
      setKAlertState('closed');
      dispatch(actions.removeAlert());
      callbackRef.current && callbackRef.current();
    }, MODAL_ANIMATION_DURATION);
    return () => clearTimeout(timerId);
  }, [dispatch, kAlertState]);

  if (!alert) {
    return null;
  }
  const onRequestClose = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (
      e &&
      'key' in e &&
      getKeyboardKeyType(e) === KeyboardKeyType.Escape &&
      alert.isForced
    ) {
      return;
    }
    if (alert.onRequestClose) {
      callbackRef.current = () => alert.onRequestClose?.();
    }
    setKAlertState('closing');
  };
  const callback = () => {
    if (alert.callback) {
      callbackRef.current = alert.callback;
      setKAlertState('closing');
    } else {
      onRequestClose();
    }
  };
  const callbackSecond = () => {
    if (alert.callbackSecond) {
      callbackRef.current = alert.callbackSecond;
    }
    setKAlertState('closing');
  };

  return (
    <Modal
      isOpen={kAlertState === 'open'}
      zIndex={sharedModalZIndex + 1}
      onRequestClose={onRequestClose}
      contentStyle={MODAL_STYLE}
      overlayStyle={OVERLAY_STYLE}
      shouldCloseOnOverlayClick={!alert.isForced}
      className={{
        base: 'AlertModal__Content',
        afterOpen: 'AlertModal__Content--after-open',
        beforeClose: 'AlertModal__Content--before-close',
      }}
    >
      <AlertContentComponent
        {...alert}
        callback={callback}
        callbackSecond={callbackSecond}
        onRequestClose={onRequestClose}
      />
    </Modal>
  );
}

const MODAL_STYLE: CSSProperties = {
  left: 0,
  right: 0,
  top: 'none',
  bottom: 0,
  padding: 0,
  /**
   * ??????????????? ???????????? ??????
   * pointer-events??? none?????? ???????????? ??????(??????), ??????(hover ???), ?????? ????????? ???????????? ???
   * modal??? open??? ???????????? touchMove ???????????? ???????????? body??? pointer-events: none??? ?????????
   * pointer-events??? ?????? ????????? ???????????? ????????? react-modal?????? ??? ???????????? ???????????? ??????(??????)??? ????????? ????????? ??????.
   * react-modal ?????? ???????????? ?????? ??????????????? pointerEvents ????????? auto??? ???????????? ??????????????? ?????????????????? ????????????.
   * https://css-tricks.com/almanac/properties/p/pointer-events/
   */
  pointerEvents: 'auto',
  backgroundColor: '#1c1c1c',
  border: 'none',
  borderRadius: 'none',
  width: '100%',
};

const OVERLAY_STYLE: CSSProperties = {
  ...FULL_OVERLAY_STYLE,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
};

type OmitProps = 'onRequestClose' | 'callback' | 'callbackSecond';
interface IKAlertAsyncOneConfirm extends Omit<IKAlertOneConfirm, OmitProps> {}
interface IKAlertAsyncTwoConfirm extends Omit<IKAlertTwoConfirm, OmitProps> {}
export type IKAlertParam = IKAlertAsyncOneConfirm | IKAlertAsyncTwoConfirm;
export interface IKAlertReturnValue {
  firstClicked?: boolean;
  secondClicked?: boolean;
  okClicked?: boolean;
  closeClicked: boolean;
}
export async function kAlert(
  params: IKAlertParam,
): Promise<IKAlertReturnValue> {
  const { buttonSet, desc } = params;
  let okClicked: boolean = false;
  let firstClicked: boolean = false;
  let secondClicked: boolean = false;
  let closeClicked: boolean = false;
  await new Promise<void>(resolve => {
    getSharedStore().dispatch(
      actions.addAlert({
        ...params,
        desc:
          typeof desc === 'string' ? replaceToNewLineFromEscaped(desc) : desc,
        onRequestClose: () => {
          closeClicked = true;
          resolve();
        },
        callback: () => {
          firstClicked = true;
          resolve();
        },
        callbackSecond: () => {
          secondClicked = true;
          resolve();
        },
      }),
    );
  });
  if (buttonSet && TwoConfirmButtonSetList.includes(buttonSet)) {
    return { firstClicked, secondClicked, closeClicked };
  } else {
    okClicked = firstClicked;
    return { okClicked, closeClicked };
  }
}

interface IKAlertWithNotAgain extends Pick<IKAlertCommon, 'title' | 'desc'> {
  storageKey: string;
}

export async function KAlertWithNotAgain({
  storageKey,
  title,
  desc,
}: IKAlertWithNotAgain) {
  const disabled = getLocalStorageBool(storageKey);
  if (!disabled) {
    const { secondClicked } = await kAlert({
      title,
      desc,
      buttonSet: 'twoConfirm',
      labelConfirm: '??????',
      labelSecondConfirm: '?????? ?????? ??????',
      isForced: true,
    });
    if (secondClicked) {
      setLocalStorageBool({
        key: storageKey,
        value: true,
      });
    }
  }
}

const TwoConfirmButtonSetList: IKAlertButtonSet[] = [
  'twoConfirm',
  'cancelAndTwoConfirm',
];

function replaceToNewLineFromEscaped(source: string) {
  return source.replace('\\n', String.fromCharCode(13, 10));
}

type IAlertState = 'open' | 'closing' | 'closed';
