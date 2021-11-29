import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface IProps {
  title?: string;
  children?: ReactNode;
}

export default function SEO({ title, children }: IProps) {
  const router = useRouter();
  const urlPath = router.asPath.split('?')[0].toString();

  return (
    <Head>
      <title>{title} | 카카오페이지 스테이지</title>

      <meta property="og:url" content={urlPath} key="ogUrl" />
      <meta
        property="og:site_name"
        content="카카오페이지 스테이지"
        key="ogSiteName"
      />
      <meta property="og:title" content={title} key="ogTitle" />
      <meta property="og:type" content="website" key="ogType" />
      <meta
        property="og:image"
        content="/images/logo@3x.png 3x"
        key="ogImage"
      />
      <meta name="twitter:card" content="summary" key="twitterCard" />
      {children}
    </Head>
  );
}
