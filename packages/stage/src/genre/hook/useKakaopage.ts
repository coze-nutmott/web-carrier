import useAdultFilter from 'common/hook/useAdultFilter';
import { INovel, IPaginatedResponse, Nullable } from 'common/type';
import { queryFn } from 'common/util/api';
import { useQuery } from 'react-query';

interface IUseKakaopageParams {
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

export default function useKakaopage({
  genreId,
  page = 0,
  sortType = 'UPDATE',
  size = 20,
}: IUseKakaopageParams): IUseNovelsResponse {
  const { isAdultOn } = useAdultFilter();

  const sortQueries: { [key: string]: string } = {
    BEST_SCORE: 'cacheFields.bestIndex,id,desc',
    POPULAR: 'cacheFields.visitorCount,id,desc',
    UPDATE: 'latestPublishedAt,id,desc',
    NEWEST: 'firstPublishedAt,id,desc',
    OLDEST: 'firstPublishedAt,id,asc',
  };

  const { data, error } = useQuery<IPaginatedResponse<INovel>, Error>(
    `/novels/genres/${genreId}/kakaopage?page=${page}&size=${size}&adult=${isAdultOn}&kakaopageSeries=true&sort=${sortQueries[sortType]}`,
    { queryFn },
  );

  return {
    data,
    totalPages: data?.totalPages || 1,
    error,
    isLoading: !data && !error,
  };
}
