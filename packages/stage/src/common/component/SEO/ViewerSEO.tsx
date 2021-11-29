import { IEpisode, INovel } from 'common/type';
import SEO from 'common/component/SEO';
import { findGenreFromId } from 'common/util/genre';

interface IProps {
  novel?: INovel;
  episode?: IEpisode;
}

export default function ViewerSEO({ novel, episode }: IProps) {
  const genre = findGenreFromId(novel?.subGenre.genreId);

  return (
    <SEO title={novel?.title}>
      {novel && episode && (
        <>
          <meta
            property="og:title"
            content={`${novel?.title} | ${episode?.title}`}
            key="ogTitle"
          />
          <meta property="og:type" content="article" key="ogType" />
          <meta
            name="description"
            content={novel?.synopsis}
            key="description"
          />
          <meta
            property="og:description"
            content={novel?.synopsis}
            key="ogDescription"
          />
          <meta
            property="og:image"
            content={
              novel?.thumbnail?.url
                ? novel?.thumbnail?.url
                : '/images/logo@3x.png 3x'
            }
            key="ogImage"
          />
          <meta
            property="article:author"
            content={novel?.nickname.name}
            key="articleAuthor"
          />
          <meta
            property="article:section"
            content={novel?.subGenre.name}
            key="articleSection"
          />
          {/* NOTE Remove Keyword
          <meta property="article:tag" content={keywords} key="articleTag" /> 
          */}
          <meta
            name="twitter:card"
            content="summary_large_image"
            key="twitterCard"
          />
        </>
      )}
      <meta name="tiara-pageName" content="웹소설뷰어" />
      <meta name="tiara-pageMeta-id" content={episode?.id.toString()} />
      <meta name="tiara-pageMeta-type" content="episode" />
      <meta name="tiara-pageMeta-name" content={episode?.title} />
      <meta name="tiara-pageMeta-category" content={genre?.text} />
      <meta name="tiara-pageMeta-category_id" content={genre?.id.toString()} />
      <meta name="tiara-pageMeta-subcategory" content={novel?.subGenre.name} />
      <meta
        name="tiara-pageMeta-subcategory_id"
        content={novel?.subGenre.id.toString()}
      />
      <meta name="tiara-pageMeta-author" content={novel?.nickname.name} />
      <meta
        name="tiara-pageMeta-author_id"
        content={novel?.nickname.id.toString()}
      />
    </SEO>
  );
}
