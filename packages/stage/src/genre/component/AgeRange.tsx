import { useState } from 'react';

import StageIcon from '@icons/icons-stage.svg';
import { IRoute } from 'common/type';
import { rankingPath } from 'common/util/routes';
import useRanking from 'genre/hook/useRanking';
import SectionHeading from 'common/component/SectionHeading';
import ButtonTab from 'common/component/ButtonTab';
import { Column } from 'common/component/Flex';
import HorizontalScroll from 'common/component/HorizontalScroll';
import NovelCard from 'genre/component/NovelCard';

interface IProps {
  genre: IRoute;
}

export default function AgeRange({ genre }: IProps) {
  const defaultAgeRange = AGE_RANGES[1]; // NOTE: 20대 랭킹탭이 기본 선택
  const [ageRange, setAgeRange] = useState(defaultAgeRange);

  const rankingPathUrl = rankingPath({
    genreIds: [genre.id],
    type: 'age-range',
    ageRange: ageRange.value,
  });

  const { data } = useRanking({
    genreIds: [genre.id],
    type: 'age-range',
    ageRange: ageRange.value,
  });

  const rankings = data ? data?.slice(0, MAX_LENGTH) : [];
  const isEmpty = rankings && rankings?.length < 1;

  return (
    <section className="col-1/-1">
      <SectionHeading
        className="mb-20"
        href={rankingPathUrl}
        title="연령별 랭킹"
      >
        <ButtonTab
          menus={AGE_RANGES}
          currentMenu={ageRange}
          setCurrentMenu={setAgeRange}
        />
      </SectionHeading>
      {isEmpty && (
        <Column className="bg-[#f6f6f6] items-center py-68 text-grayFont text-14">
          <div className="mb-8">
            <StageIcon />
          </div>
          조건에 맞는 작품이 없습니다.
        </Column>
      )}
      <HorizontalScroll
        className="desktop:grid desktop:grid-cols-9 gap-x-12 desktop:gap-x-20 mx-[-18] desktop:mx-0 mb-[-16] pb-16"
        space="12px"
      >
        {rankings?.map(({ novel }) => (
          <NovelCard novel={novel} key={novel.stageSeriesNumber} />
        ))}
      </HorizontalScroll>
    </section>
  );
}

const AGE_RANGES = [
  {
    name: '10대',
    value: 'TARGET_10',
  },
  {
    name: '20대',
    value: 'TARGET_20',
  },
  {
    name: '30대',
    value: 'TARGET_30',
  },
  {
    name: '40대',
    value: 'TARGET_40',
  },
  {
    name: '50대 이상',
    value: 'TARGET_50_OVER',
  },
];

/**
 * MAX_LENGTH 변경할 때 <HorizontalScroll>의 className 변경 필요합니다.
 * tailwindcss 퍼지 이슈로 변수 사용 안 함.
 * "grid-cols-${MAX_LENGTH}"
 */
const MAX_LENGTH = 9;
