import Nickname from 'common/component/Card/Nickname';
import ChangeRanking from 'common/component/ChangeRanking';
import Clamp from 'common/component/Clamp';
import Divider from 'common/component/Divider';
import Flex, { Column, Row } from 'common/component/Flex';
import NovelBadge from 'common/component/NovelBadge';
import Number from 'common/component/Number';
import Text from 'common/component/Text';
import Thumbnail from 'common/component/Thumbnail';
import useMedia from 'common/hook/useMedia';
import { IRanking } from 'common/type';
import { numberToHuman } from 'common/util/numeric';
import Link from 'next/link';

interface IProps extends IRanking {
  index: number;
}

export default function HeroRankingItem({
  novel,
  changeRanking,
  index,
}: IProps) {
  const isDesktop = useMedia('desktop');

  return (
    <Flex
      as="article"
      key={novel.stageSeriesNumber}
      className="desktop:mx-[-24px] py-20 pr-16 pl-0 desktop:py-26 desktop:px-30 bg-[#f6f6f6]"
      style={{ gridColumn: 'span 2' }}
    >
      <Link href={`/novels/${novel.stageSeriesNumber}`} passHref>
        <Column className="flex-grow" as="a">
          <Row className="mb-auto flex-row-reverse desktop:flex-row">
            <Thumbnail
              className="w-76 desktop:w-120 ml-20 desktop:ml-0"
              src={novel.thumbnail?.url}
              ageRating={novel.ageRating}
              stageOn={novel.stageOn}
              pageGo={novel.pageGo}
              completedBadge={novel.completed && 'LARGE'}
            />
            <Column className="relative mt-0 desktop:mt-4 pl-52 desktop:pl-66 flex-grow">
              <Column className="absolute left-0 w-52 ml-0 desktop:ml-10 items-center">
                <Number className="mb-6 text-20 desktop:text-24 font-bold">
                  {index + 1}
                </Number>
                <ChangeRanking value={changeRanking} />
              </Column>
              <Clamp
                as="h1"
                className="mb-6 desktop:mb-4 text-16 desktop:text-20 font-bold desktop:font-medium"
                lines={isDesktop ? 1 : 2}
              >
                <Flex>
                  <NovelBadge
                    firstPublishedAt={novel.firstPublishedAt}
                    latestPublishedAt={novel.latestPublishedAt}
                  />
                  {novel.title}
                </Flex>
              </Clamp>
              <Nickname className="mb-8 text-12 desktop:text-14">
                {novel.nickname.name}
              </Nickname>
              <Flex className="flex-row mt-auto desktop:mt-0">
                <Text>
                  <span className="mr-4">조회</span>
                  <Number>{numberToHuman(novel.viewCount)}</Number>
                </Text>
                <Divider className="mx-8" />
                <Text>
                  <span className="mr-4">관심</span>
                  <Number>{numberToHuman(novel.favoriteCount)}</Number>
                </Text>
              </Flex>
              {isDesktop && (
                <Text className="mr-12 text-12" lines={4}>
                  {novel.synopsis}
                </Text>
              )}
            </Column>
          </Row>
        </Column>
      </Link>
    </Flex>
  );
}
