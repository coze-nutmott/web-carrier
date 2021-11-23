/* eslint-disable @next/next/no-sync-scripts */
import Document, {
  DocumentContext,
  Html,
  Main,
  Head,
  NextScript,
} from 'next/document';

/**
 * TODO
 * tiara 추가
 */
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="ko">
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700&display=swap"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700&display=swap"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/images/icons/icon-192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/images/icons/icon-512.png"
          />
          <script src={process.env.KAKAO_JAVASCRIPT_SDK_URL} />
          <script async src="checkIE.js" />
          {/* <TrackerScripts /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
