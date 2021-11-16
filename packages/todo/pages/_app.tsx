import React from 'react';

import 'common/component/shared';
import AlertContent from 'common/component/AlertContent';
import { getStore } from 'common/store';
import { ITextVariant } from 'common/style';
import { ZIndex } from 'common/style/variable';

import SharedContainer from 'shared/component/SharedContainer';

import type { AppProps } from 'next/app';

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
      <Component {...pageProps} />
    </SharedContainer>
  );
}
export default MyApp;
