import React, { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { Router } from 'next/router';

import { actions } from '../state/action';
import { IStateDefault } from '../type';
import { sharedKRouter } from '../util/sharedKRouter';
import { KAlertComponent, IProps as IKAlertProps } from './KAlert';
import KToast from './toast/KToast';
import 'shared/style/index.scss';
import 'tailwindcss/tailwind.css';

interface IProps<TextVariant = string> {
  children: ReactNode;
  router: Router;
  toastTextVariant: TextVariant;
  toastZIndex: number;
  modalZIndex: number;
  getStore: () => Store<IStateDefault>;
  uiTestParams: {
    buttonVariant: string;
    activeButtonVariant: string;
    buttonTextVariant: string;
    labelTextVariant: string;
    checkBoxTextVariant: string;
    inputZIndex: number;
  };
  AlertContentComponent: IKAlertProps['AlertContentComponent'];
}

const queryClient = new QueryClient();

function SharedContainer<TextVariant extends string>({
  children,
  router,
  toastTextVariant,
  toastZIndex,
  modalZIndex,
  getStore,
  uiTestParams,
  AlertContentComponent,
}: IProps<TextVariant>) {
  getSharedStore = getStore;
  UI_TEST_PARAMS = uiTestParams;
  sharedModalZIndex = modalZIndex;

  useEffect(() => {
    getSharedStore().dispatch(actions.setValue('isAppMounted', true));
    router.beforePopState(
      sharedKRouter.processBeforePopState.bind(sharedKRouter),
    );
  }, [router]);
  return (
    <Provider store={getSharedStore()}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <KToast<TextVariant>
        textVariant={toastTextVariant}
        zIndex={toastZIndex}
      />
      <KAlertComponent AlertContentComponent={AlertContentComponent} />
    </Provider>
  );
}

export let getSharedStore: IProps['getStore'];
export let UI_TEST_PARAMS: IProps['uiTestParams'];
export let sharedModalZIndex: number;

export default SharedContainer;
