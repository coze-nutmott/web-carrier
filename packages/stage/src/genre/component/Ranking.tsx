import { HTMLProps, useState } from 'react';

import StageIcon from '@icons/icons-stage.svg';
import { IRoute } from 'common/type';
import { rankingPath } from 'common/util/routes';
import useRanking, { IRankingType } from 'genre/hook/useRanking';
import SectionHeading from 'common/component/SectionHeading';
import ButtonTab from 'common/component/ButtonTab';
import { Column } from 'common/component/Flex';
import Repeater from 'common/component/Repeater';
import Skeleton from 'common/component/Skeleton';
import HeroRankingItem from 'genre/component/HeroRankingItem';
import RankingItem from 'genre/component/RankingItem';

interface IProps extends HTMLProps<HTMLElement> {
  genre: IRoute;
}

export default function Ranking({ genre, ...props }: IProps) {
  const defaultType = RANKING_TYPES[0];
  const [currentType, setCurrentType] = useState(defaultType);

  const sectionHeadingPath = rankingPath({
    genreIds: [genre.id],
    type: currentType.value,
    dateRange: currentType.value === 'favorites' ? 'LAST_2HOURS' : 'YESTERDAY',
  });

  const { data, isLoading, isEmpty } = useRanking({
    genreIds: [genre.id],
    type: currentType.value,
    dateRange: currentType.value === 'favorites' ? 'LAST_2HOURS' : 'YESTERDAY',
  });
  const novels = data?.slice(0, MAX_LENGTH);

  return (
    <section {...props}>
      <SectionHeading
        className="mb-16"
        href={sectionHeadingPath}
        title={`${genre.text} 랭킹`}
      >
        <ButtonTab
          menus={RANKING_TYPES}
          currentMenu={currentType}
          setCurrentMenu={setCurrentType}
        />
      </SectionHeading>
      {isEmpty && (
        <Column className="justify-center items-center bg-[#f6f6f6] text-grayFont text-14 py-75 desktop:py-[242px]">
          <div>
            <StageIcon />
          </div>
          조건에 맞는 작품이 없습니다.
        </Column>
      )}
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-x-12 gap-y-20 desktop:gap-y-32 px-0 desktop:px-26">
        {isLoading && <Fallback />}
        {novels?.map(({ changeRanking, novel }, index) =>
          index === 0 ? (
            <HeroRankingItem
              changeRanking={changeRanking}
              key={novel.stageSeriesNumber}
              novel={novel}
              index={index}
            />
          ) : (
            <RankingItem
              changeRanking={changeRanking}
              key={novel.stageSeriesNumber}
              novel={novel}
              index={index}
            />
          ),
        )}
      </div>
    </section>
  );
}

interface IRankingTypeSet {
  name: string;
  value: IRankingType;
}

const MAX_LENGTH = 5;
const RANKING_TYPES: IRankingTypeSet[] = [
  { name: '신작', value: 'new' },
  {
    name: '관심급상승',
    value: 'favorites',
  },
  { name: '베스트지수', value: 'best' },
  // { name: '연독률', value: 'continuous-reading' },
];

const Fallback: React.FC = () => (
  <Repeater length={MAX_LENGTH}>
    <Skeleton
      className="w-full h-110"
      lines={4}
      thumbnailClassName="w-72 h-full mr-16"
    />
  </Repeater>
);
