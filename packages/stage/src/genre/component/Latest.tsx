import { useState, useEffect } from 'react';
import Link from 'next/link';

import AnchorIcon from '@icons/icons-button-arrow.svg';
import useMedia from 'common/hook/useMedia';
import { INovel, IRoute } from 'common/type';
import Repeater from 'common/component/Repeater';
import Flex, { Column, Row } from 'common/component/Flex';
import Skeleton from 'common/component/Skeleton';
import Thumbnail from 'common/component/Thumbnail';
import NovelBadge from 'common/component/NovelBadge';
import Title from 'common/component/Card/Title';
import Nickname from 'common/component/Card/Nickname';
import Text from 'common/component/Text';
import Number from 'common/component/Number';
import { numberWithDelimiter } from 'common/util/numeric';
import Divider from 'common/component/Divider';
import { useLatestNovels, useLatestNovelsByGenre } from 'genre/hook/useNovels';
import SectionHeading from 'common/component/SectionHeading';

interface IProps {
  genre: IRoute;
}

export default function Latest({ genre }: IProps) {
  const isDesktop = useMedia('desktop');

  return isDesktop ? (
    <LatestNovelsForDesktop genre={genre} />
  ) : (
    <LatestNovelsForMobile genre={genre} />
  );
}

const DESKTOP_MAX_LENGTH = 5;
const MOBILE_MAX_LENGTH = 4;

const Fallback = () => (
  <Repeater length={DESKTOP_MAX_LENGTH}>
    <Column>
      <Skeleton className="w-full h-80" lines={3} />
    </Column>
  </Repeater>
);

const LatestItem = (cardItem: INovel) => {
  return (
    <Flex
      as="article"
      className="border-b-0 desktop:border-b-1 border-solid border-gray90"
      key={cardItem.stageSeriesNumber}
    >
      <Link href={`/novels/${cardItem.stageSeriesNumber}`} passHref>
        <Row className="flex-grow py-8 desktop:py-16" as="a">
          <Thumbnail
            className="w-58 desktop:w-48"
            src={cardItem.thumbnail?.url}
            ageRating={cardItem.ageRating}
            completedBadge={cardItem.completed && 'SMALL'}
            stageOn={cardItem.stageOn}
            pageGo={cardItem.pageGo}
            compact
          />
          <Column className="flex-grow ml-16">
            <Flex className="mb-4 items-center">
              <NovelBadge
                firstPublishedAt={cardItem.firstPublishedAt}
                latestPublishedAt={cardItem.latestPublishedAt}
              />
              <Title>{cardItem.title}</Title>
            </Flex>
            <Nickname className="mb-8">{cardItem.nickname.name}</Nickname>
            <Text>
              조회 <Number>{numberWithDelimiter(cardItem.viewCount)}</Number>
              <Divider className="mx-8 text-gray80" />
              관심{' '}
              <Number>{numberWithDelimiter(cardItem.favoriteCount)}</Number>
            </Text>
          </Column>
        </Row>
      </Link>
    </Flex>
  );
};

const LatestNovelsForDesktop = ({ genre }: IProps) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [genre]);

  const { data: data, isLoading } = useLatestNovels({
    genreId: genre.id,
    size: DESKTOP_MAX_LENGTH,
    sortType: 'UPDATE',
    page,
  });

  const cardItems = data?.content;

  return (
    <section>
      <SectionHeading
        className="pb-16 border-b-1 border-solid border-black"
        title="최신 업데이트"
      >
        <Flex className="ml-auto border-1 border-solid border-divideLine">
          <button
            type="button"
            className={`p-9 ${data?.first ? 'text-gray80' : 'text-black'}`}
            disabled={data?.first}
            onClick={() => setPage(prev => prev - 1)}
          >
            <Flex className="w-10 h-10 justify-center rotate-180">
              <AnchorIcon />
            </Flex>
          </button>

          <button
            type="button"
            className={`p-9 border-l-1 border-solid border-divideLine ${
              data?.last ? 'text-gray80' : 'text-black'
            }`}
            disabled={data?.last}
            onClick={() => setPage(prev => prev + 1)}
          >
            <Flex className="w-10 h-10 justify-center">
              <AnchorIcon />
            </Flex>
          </button>
        </Flex>
      </SectionHeading>
      <Column>
        {isLoading && <Fallback />}
        {cardItems?.map(cardItem => (
          <LatestItem key={cardItem.stageSeriesNumber} {...cardItem} />
        ))}
      </Column>
    </section>
  );
};

const LatestNovelsForMobile = ({ genre }: IProps) => {
  const { data: novels } = useLatestNovelsByGenre({
    genreId: genre.id,
    size: MOBILE_MAX_LENGTH,
    sortType: 'UPDATE',
  });

  const cardItems = novels;

  return (
    <section>
      <SectionHeading
        className="pb-16 border-b-0 desktop:border-b-1 border-solid border-black"
        title="최신 업데이트"
        href={`/${genre.url}/novels?sortType=UPDATE`}
      />
      <Column>
        {cardItems?.map(cardItem => (
          <LatestItem key={cardItem.stageSeriesNumber} {...cardItem} />
        ))}
      </Column>
    </section>
  );
};
