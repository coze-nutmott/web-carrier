import { IPages } from 'common/type';
import SEO from 'common/component/SEO';

interface IProps {
  pages?: IPages;
}

export default function PageSEO({ pages }: IProps) {
  const pagesImage = pages?.mobileImage;
  return (
    <SEO title={pages?.title}>
      <meta property="og:title" content={pages?.title} key="ogTitle" />
      <meta property="og:type" content="website" key="ogType" />
      <meta
        property="og:image"
        content={pagesImage ? pagesImage.image?.url : '/images/logo@3x.png 3x'}
        key="ogImage"
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitterCard"
      />

      <meta name="tiara-pageName" content="페이지" />

      <meta name="tiara-pageMeta-id" content={pages?.id.toString()} />
      <meta name="tiara-pageMeta-type" content="page" />
      <meta name="tiara-pageMeta-name" content={pages?.title} />
    </SEO>
  );
}
