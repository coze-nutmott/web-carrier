import SEO from 'common/component/SEO';
import useMedia from 'common/hook/useMedia';
import { IRoute } from 'common/type';
import GenreHeader from 'genre/component/GenreHeader';
import GenreDesktop from 'genre/container/GenreDesktop';
import GenreMobile from 'genre/container/GenreMobile';
import useLayout from 'genre/hook/useLayout';
import usePreferredGenre from 'genre/hook/usePreferredGenre';

interface IProps {
  genre: IRoute;
}
export default function GenreContainer({ genre }: IProps) {
  const isDesktop = useMedia('desktop');
  const { setPreferredGenre } = usePreferredGenre();
  setPreferredGenre(genre.url);

  useLayout({ header: GenreHeader, activeGenre: genre.url });

  return (
    <>
      <SEO title={`홈 - ${genre.text}`}>
        <meta name="tiara-pageName" content={`대장르홈_${genre.text}`} />
        <meta name="tiara-pageSection" content={genre.text} />
      </SEO>
      {isDesktop ? (
        <GenreDesktop genre={genre} />
      ) : (
        <GenreMobile genre={genre} />
      )}
    </>
  );
}
