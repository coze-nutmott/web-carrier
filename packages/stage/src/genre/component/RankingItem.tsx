import Nickname from 'common/component/Card/Nickname';
import Title from 'common/component/Card/Title';
import ChangeRanking from 'common/component/ChangeRanking';
import Divider from 'common/component/Divider';
import { Column, Row } from 'common/component/Flex';
import NovelBadge from 'common/component/NovelBadge';
import Number from 'common/component/Number';
import Text from 'common/component/Text';
import Thumbnail from 'common/component/Thumbnail';
import { IRanking } from 'common/type';
import { numberToHuman } from 'common/util/numeric';
import Link from 'next/link';

interface IProps extends IRanking {
  index: number;
}

export default function RankingItem({ novel, changeRanking, index }: IProps) {
  return (
    <article key={novel.stageSeriesNumber} className="col-1 desktop:col-span1">
      <Link href={`/novels/${novel.stageSeriesNumber}`} passHref>
        <Column className="flex-grow" as="a">
          <Row className="mb-auto items-start">
            <Thumbnail
              className="w-58 desktop:w-80"
              src={novel.thumbnail?.url}
              ageRating={novel.ageRating}
              stageOn={novel.stageOn}
              pageGo={novel.pageGo}
              completedBadge={novel.completed && 'SMALL'}
            />
            <Column className="relative pl-40 desktop:pl-44 flex-grow">
              <Column className="absolute left-0 w-32 desktop:w-44 pl-8 items-center">
                <Number className="my-4 desktop:my-3 text-16">
                  {index + 1}
                </Number>
                <ChangeRanking value={changeRanking} />
              </Column>
              <Title className="mt-4 mb-4 text-15">
                <NovelBadge
                  firstPublishedAt={novel.firstPublishedAt}
                  latestPublishedAt={novel.latestPublishedAt}
                />
                {novel.title}
              </Title>
              <Nickname className="mb-4">{novel.nickname.name}</Nickname>
              <Text>
                조회 <Number>{numberToHuman(novel.viewCount)}</Number>
                <Divider className="mx-8 text-gray80" />
                관심 <Number>{numberToHuman(novel.favoriteCount)}</Number>
              </Text>
              <Text className="mt-8 text-12 hidden desktop:block">
                {novel.synopsis}
              </Text>
            </Column>
          </Row>
        </Column>
      </Link>
    </article>
  );
}
