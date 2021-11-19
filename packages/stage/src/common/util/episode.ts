import { isFuture } from 'common/util/datetime';
import { IEpisode } from 'common/type';

export function isReservedEpisode(
  episode?: Pick<IEpisode, 'published' | 'publishedAt'>,
): boolean {
  if (!episode) return false;

  return episode.published === false && isFuture(episode.publishedAt);
}
