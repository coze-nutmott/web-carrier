import queryString from 'query-string';
import { IRanking } from 'common/type';
import useAdultFilter from 'common/hook/useAdultFilter';
import { useQuery } from 'react-query';
import { queryFn } from 'common/util/api';

export type IRankingType =
  | 'realtime'
  | 'popularity'
  | 'rookie'
  | 'age-range'
  | 'favorites'
  | 'new'
  | 'continuous-reading'
  | 'best';

interface IUseRankingParams {
  type?: IRankingType;
  genreIds: (string | number | undefined)[];
  ageRange?: string;
  dateRange?: string;
}

interface IUseRankingReturns {
  data?: IRanking[];
  isEmpty: boolean;
  isLoading: boolean;
}

const RECENT_NOVELS_UPDATED_IN_HOURS = 72;

export default function useRanking({
  type,
  genreIds,
  ageRange,
  dateRange = 'YESTERDAY',
}: IUseRankingParams): IUseRankingReturns {
  const { isAdultOn } = useAdultFilter();

  // NOTE: 기간 설정이 없는 신작, 실시간, 관작 실시간 랭킹은 최근 72시간 내 업데이트 된 작품만 랭킹에 표시 (요구사항)
  const onlyRecentNovels =
    type === 'realtime' ||
    type === 'new' ||
    (type === 'favorites' && dateRange === 'LAST_2HOURS');

  const query = queryString.stringify({
    adult: isAdultOn,
    ageRange,
    dateRange,
    genreIds,
    ...(onlyRecentNovels && {
      recentHours: RECENT_NOVELS_UPDATED_IN_HOURS,
    }),
  });

  const { data, error } = useQuery<IRanking[]>(`/ranking/${type}?${query}`, {
    queryFn,
    retry: false,
    enabled: !!type,
  });

  return {
    data,
    isEmpty: data?.length === 0,
    isLoading: !error && !data,
  };
}
