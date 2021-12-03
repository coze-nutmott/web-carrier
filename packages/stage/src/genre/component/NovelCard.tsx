import Clamp from 'common/component/Clamp';
import Ellipsis from 'common/component/Ellipsis';
import Flex, { Column } from 'common/component/Flex';
import NovelBadge from 'common/component/NovelBadge';
import Thumbnail from 'common/component/Thumbnail';
import { INovel } from 'common/type';
import Link from 'next/link';

interface IProps {
  novel: INovel;
  className?: string;
}

export default function NovelCard({ novel, className }: IProps) {
  return (
    <Flex as="article" className={cn('w-76 desktop:w-full', className)}>
      <Link href={`/novels/${novel.stageSeriesNumber}`} passHref>
        <Column as="a" className="text-center flex-grow">
          <Thumbnail
            className="w-full mb-8"
            src={novel.thumbnail?.url}
            ageRating={novel.ageRating}
            stageOn={novel.stageOn}
            pageGo={novel.pageGo}
            completedBadge={novel.completed && 'SMALL'}
          />
          <div className="text-grayFont text-12">{novel.subGenre?.name}</div>
          <Clamp as="h3" className="break-words font-medium text-14 mb-4">
            <NovelBadge
              firstPublishedAt={novel.firstPublishedAt}
              latestPublishedAt={novel.latestPublishedAt}
            />
            {novel.title}
          </Clamp>
          <div className="text-gray30 text-12">
            <Ellipsis>{novel.nickname.name}</Ellipsis>
          </div>
        </Column>
      </Link>
    </Flex>
  );
}
