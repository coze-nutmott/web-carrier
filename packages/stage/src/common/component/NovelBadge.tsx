import NewLabelIcon from '@icons/badge_xs_new.svg';
import UpLabelIcon from '@icons/badge_sm_up.svg';
import { INovel } from 'common/type';
import { afterWeeks, isAfterDay, isFuture } from 'common/util/datetime';

export default function NovelBadge({
  firstPublishedAt,
  latestPublishedAt,
}: Pick<INovel, 'firstPublishedAt' | 'latestPublishedAt'>) {
  const isNewNovel = isFuture(afterWeeks(firstPublishedAt));
  const isCurrentEpisode = isAfterDay(latestPublishedAt);

  if (isNewNovel) return <NewLabel />;
  if (isCurrentEpisode) return <UpLabel />;
  return null;
}

const NewLabel: React.VFC = () => (
  <div className="inline align-middle flex-shrink-0 mr-4">
    <NewLabelIcon />
  </div>
);

const UpLabel: React.VFC = () => (
  <div className="inline align-middle flex-shrink-0 mr-4">
    <UpLabelIcon />
  </div>
);
