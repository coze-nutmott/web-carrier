import type { AppProps } from 'next/app';
import { ITextVariant } from 'common/style';
import React from 'react';
import { ZIndex } from 'common/style/variable';
import SharedContainer from 'shared/component/SharedContainer';
import 'common/component/shared';
import { getStore } from 'common/store';
import AlertContent from 'common/component/AlertContent';
import Layout from 'common/component/layout';
import 'common/style/base.scss';
import ModalLayer from 'common/component/Modals/ModalLayer';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SharedContainer<ITextVariant>
      router={router}
      toastTextVariant="s16_normal_white"
      toastZIndex={ZIndex.Toast}
      modalZIndex={ZIndex.Modal}
      getStore={getStore}
      uiTestParams={{
        buttonVariant: 'btn_gray',
        activeButtonVariant: 'btn_transparent_yellow',
        buttonTextVariant: 's16_normal_black',
        labelTextVariant: 's16_normal_black',
        checkBoxTextVariant: 's16_normal_black',
        inputZIndex: ZIndex.Modal - 1,
      }}
      AlertContentComponent={AlertContent}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ModalLayer />
    </SharedContainer>
  );
}
export default MyApp;
