import Link from 'next/link';
import Flex, { Column, Row } from 'common/component/Flex';
import { INovel } from 'common/type';
import Thumbnail from 'common/component/Thumbnail';
import Title from 'common/component/Card/Title';
import Nickname from 'common/component/Card/Nickname';
import Text from 'common/component/Text';
import NovelBadge from 'common/component/NovelBadge';

interface IProps {
  novels?: INovel[];
}
export default function RealTimePopularityCards({ novels }: IProps) {
  return (
    <>
      {novels?.map(novel => (
        <Flex as="article" key={novel.stageSeriesNumber}>
          <Link href={`/novels/${novel.stageSeriesNumber}`} passHref>
            <Row as="a">
              <Thumbnail
                className="w-80"
                src={novel.thumbnail?.url}
                ageRating={novel.ageRating}
                stageOn={novel.stageOn}
                pageGo={novel.pageGo}
                completedBadge={novel.completed && 'SMALL'}
              />
              <Column className="flex-grow ml-16 pt-4">
                <Flex>
                  <NovelBadge
                    firstPublishedAt={novel.firstPublishedAt}
                    latestPublishedAt={novel.latestPublishedAt}
                  />
                  <Title className="mb-2 text-16 font-medium">
                    {novel.title}
                  </Title>
                </Flex>
                <Nickname className="mb-16 text-gray30">
                  {novel.nickname.name}
                </Nickname>
                <Text className="text-13 desktop:text-12" lines={3}>
                  {novel.synopsis}
                </Text>
              </Column>
            </Row>
          </Link>
        </Flex>
      ))}
    </>
  );
}
