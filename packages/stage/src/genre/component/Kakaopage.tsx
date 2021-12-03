import HorizontalScroll from 'common/component/HorizontalScroll';
import SectionHeading from 'common/component/SectionHeading';
import { IRoute } from 'common/type';
import NovelCard from 'genre/component/NovelCard';
import useKakaopage from 'genre/hook/useKakaopage';

const MAX_LENGTH = 9;

interface IProps {
  genre: IRoute;
}

export default function Kakaopage({ genre }: IProps) {
  const { data } = useKakaopage({
    genreId: genre.id,
    size: MAX_LENGTH,
  });

  const novels = data?.content.slice(0, MAX_LENGTH);

  if (!novels || novels.length < 1) return null;

  return (
    <section className="col-1/-1">
      <SectionHeading
        className="mb-20"
        href={`${genre.url}/kakaopage`}
        title="카카오페이지 웹소설"
      />
      <HorizontalScroll
        className="desktop:grid desktop:grid-cols-9 gap-x-12 desktop:gap-x-20 mx-[-18] desktop:mx-0 mb-[-16] pb-16"
        space="12px"
      >
        {novels?.map(novel => (
          <NovelCard novel={novel} key={novel.stageSeriesNumber} />
        ))}
      </HorizontalScroll>
    </section>
  );
}
