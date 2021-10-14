import { getSharedStore } from '../../common';
import Toast, {
  IRenderProps1,
  IRenderProps2,
} from '../../component/toast/Toast';
import useEffectAfterTrue from '../../hook/useEffectAfterTrue';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../state/action';
import { IToast } from '../../type';
import styles from './KToast.module.scss';

type IProps<T extends string> = (IRenderProps1 | IRenderProps2<T>) & {
  zIndex: number;
};

type IToastState = 'open' | 'closing' | 'closed';

export default function KToast<T extends string>({
  zIndex,
  ...rest
}: IProps<T>) {
  const toast = useSelector(state =>
    state.shared.toasts.length ? state.shared.toasts[0] : undefined,
  );
  const [toastState, setToastState] = useState<IToastState>(
    toast ? 'open' : 'closed',
  );

  useEffectAfterTrue(
    () => setToastState('open'),
    toastState === 'closed' && !!toast,
  );

  useEffect(() => {
    if (toastState !== 'open') {
      return;
    }
    const id = setTimeout(() => {
      setToastState('closing');
    }, DEFAULT_DURATION);
    return () => clearTimeout(id);
  }, [toastState, toast]);

  const dispatch = useDispatch();
  useEffectAfterTrue(() => {
    const id = setTimeout(() => {
      setToastState('closed');
      dispatch(actions.removeToast());
    }, 200);
    return () => clearTimeout(id);
  }, toastState === 'closing');

  return !toast ? null : (
    <div className={cn(styles.kToast, 'w-full', 'px-20')} style={{ zIndex }}>
      <Toast
        title={toast.title}
        desc={toast.desc}
        isClosing={toastState === 'closing'}
        img={toast.img}
        {...rest}
      />
    </div>
  );
}

interface IKToastParam extends Omit<IToast, 'title' | 'desc'> {
  title?: string;
  desc: string;
}
export function kToast(params: IKToastParam | string) {
  const pStore = getSharedStore();
  if (typeof params === 'string') {
    pStore.dispatch(
      actions.addToast({
        desc: params,
      }),
    );
  } else {
    pStore.dispatch(actions.addToast(params));
  }
}

const DEFAULT_DURATION = 2000;
