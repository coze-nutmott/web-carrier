import useAdultFilter from 'common/hook/useAdultFilter';
import { INovel, IPaginatedResponse, Nullable } from 'common/type';
import { queryFn } from 'common/util/api';
import { useQuery } from 'react-query';

interface IUseNewSeriesParams {
  isRandom?: boolean;
  genreId: number;
  page?: number;
  sortType?: string;
  size?: number;
}

interface IUseNovelsResponse {
  data?: IPaginatedResponse<INovel>;
  totalPages: number;
  isLoading?: boolean;
  error: Nullable<Error>;
}

/**
 * 신규 연재 작품 리스트 조회
 */
export default function useNewSeries({
  genreId,
  isRandom = false,
  page = 0,
  sortType = 'UPDATE',
  size = 20,
}: IUseNewSeriesParams): IUseNovelsResponse {
  const { isAdultOn } = useAdultFilter();

  const sortQueries: { [key: string]: string } = {
    BEST_SCORE: 'cacheFields.bestIndex,id,desc',
    POPULAR: 'cacheFields.visitorCount,id,desc',
    UPDATE: 'latestPublishedAt,id,desc',
    NEWEST: 'firstPublishedAt,id,desc',
    OLDEST: 'firstPublishedAt,id,asc',
  };

  const { data, error } = useQuery<IPaginatedResponse<INovel>, Error>(
    `/novels/genres/${genreId}/new-series?page=${page}&size=${size}&isRandom=${isRandom}&adult=${isAdultOn}&sort=${sortQueries[sortType]}`,
    {
      queryFn,
      refetchOnWindowFocus: !isRandom,
    },
  );

  return {
    data,
    totalPages: data?.totalPages || 1,
    error,
    isLoading: !data && !error,
  };
}
