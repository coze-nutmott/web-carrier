import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { getStore } from 'common/store';
import { ITextVariant } from 'common/style';
import KToast from 'shared/component/toast/KToast';
import 'shared/style.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { ZIndex } from 'common/style/variable';
import 'common/component/shared';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={getStore()}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <KToast<ITextVariant>
          textVariant="s16_regular_white"
          zIndex={ZIndex.Toast}
        />
      </QueryClientProvider>
    </Provider>
  );
}
export default MyApp;
