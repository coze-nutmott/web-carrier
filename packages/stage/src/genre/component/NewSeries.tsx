import StageIcon from '@icons/icons-stage.svg';
import { Column } from 'common/component/Flex';
import HorizontalScroll from 'common/component/HorizontalScroll';
import SectionHeading from 'common/component/SectionHeading';
import { IRoute } from 'common/type';
import NovelCard from 'genre/component/NovelCard';
import useNewSeries from 'genre/hook/useNewSeries';

interface IProps {
  genre: IRoute;
}

export default function NewSeries({ genre }: IProps) {
  const { data } = useNewSeries({
    genreId: genre.id,
    isRandom: true,
    size: MAX_LENGTH,
  });

  const novels = data?.content?.slice(0, MAX_LENGTH);
  const isEmpty = novels && novels?.length < 1;

  return (
    <section className="col-1/-1">
      <SectionHeading
        className="mb-20"
        href={`${genre.url}/new-series`}
        title="신규연재"
      />
      {isEmpty && (
        <Column className="bg-[#f6f6f6] items-center py-74 desktop:py-84 text-grayFont text-14">
          <div className="mb-8">
            <StageIcon />
          </div>
          조건에 맞는 작품이 없습니다.
        </Column>
      )}
      <HorizontalScroll
        className={`desktop:grid desktop:grid-cols-9 gap-x-12 desktop:gap-x-20 mx-[-18] desktop:mx-0 mb-[-16] pb-16`}
        space="12px"
      >
        {novels?.map(novel => (
          <NovelCard novel={novel} key={novel.stageSeriesNumber} />
        ))}
      </HorizontalScroll>
    </section>
  );
}

/**
 * MAX_LENGTH 변경할 때 <HorizontalScroll>의 className 변경 필요합니다.
 * tailwindcss 퍼지 이슈로 변수 사용 안 함.
 * "grid-cols-${MAX_LENGTH}"
 */
const MAX_LENGTH = 9;
