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

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SharedContainer<ITextVariant>
      router={router}
      toastTextVariant="s16_regular_white"
      toastZIndex={ZIndex.Toast}
      modalZIndex={ZIndex.Modal}
      getStore={getStore}
      uiTestParams={{
        buttonVariant: 'btn_grey01',
        activeButtonVariant: 'btn_transparent_gold',
        buttonTextVariant: 's16_regular_black',
        labelTextVariant: 's16_regular_black',
        checkBoxTextVariant: 's16_regular_black',
        inputZIndex: ZIndex.Modal - 1,
      }}
      AlertContentComponent={AlertContent}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SharedContainer>
  );
}
export default MyApp;
