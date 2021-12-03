import useAdultFilter from 'common/hook/useAdultFilter';
import { INovel, IPaginatedResponse, Nullable } from 'common/type';
import callApi, { queryFn } from 'common/util/api';
import usePaginatedInfinite, {
  IUsePaginatedInfiniteResponse,
} from 'genre/hook/usePagiantedInfinite';
import queryString from 'query-string';
import { useQuery } from 'react-query';

interface IUseNovels {
  genreId: number;
  size?: number;
  sortType: string;
  // config?: ConfigInterface;
}
interface IUseNovelsByKeyword extends IUseNovels {
  keywords: string[];
  subGenreId?: number | string;
}

interface IUseLatestNovels extends IUseNovels {
  page: number;
}

// export function useNovelsByKeyword({
//   genreId,
//   keywords,
//   sortType,
//   size = 20,
//   subGenreId,
// }: IUseNovelsByKeyword): IUsePaginatedSWRInfiniteResponse<Novel> {
//   const keywordSortQueries: { [key: string]: string } = {
//     BEST_SCORE: 'novel.cacheFields.bestIndex,desc&sort=novel.id,desc',
//     POPULAR: 'novel.cacheFields.visitorCount,desc&sort=novel.id,desc',
//     FAVORITE: 'novel.cacheFields.favoriteCount,desc&sort=novel.id,desc',
//     UPDATE: 'novel.latestPublishedAt,desc&sort=novel.id,desc',
//     NEWEST: 'novel.firstPublishedAt,desc&sort=novel.id,desc',
//   };
//   const { isAdultOn } = useAdultFilter();

//   const joinedKeywords = keywords.join(',');
//   const query = (pageIndex: number) =>
//     queryString.stringify(
//       {
//         genreId,
//         page: pageIndex,
//         keywords: joinedKeywords,
//         size,
//         subGenreId,
//         sort: keywordSortQueries[sortType],
//         adult: isAdultOn,
//       },
//       { encode: false },
//     );
//   const getKey = (pageIndex: number) =>
//     `/search/keywords/novels?${query(pageIndex)}`;
//   const res = usePaginatedSWRInfinite<Novel>(getKey);
//   return res;
// }

// NOTE: 모바일
export function useLatestNovelsByGenre({
  genreId,
  size = 20,
  sortType,
}: IUseNovels): IUsePaginatedInfiniteResponse<INovel> {
  const { isAdultOn } = useAdultFilter();

  const sortQueries: { [key: string]: string } = {
    BEST_SCORE: 'cacheFields.bestIndex,desc&sort=id,desc',
    POPULAR: 'cacheFields.visitorCount,desc&sort=id,desc',
    UPDATE: 'latestPublishedAt,desc&sort=id,desc',
    NEWEST: 'firstPublishedAt,desc&sort=id,desc',
  };

  const queryKey = `/novels/genres/${genreId}?&size=${size}&sort=${sortQueries[sortType]}&adult=${isAdultOn}`;
  const queryFn = ({ pageParam = 0 }) =>
    callApi<IPaginatedResponse<INovel>>({
      url: `${queryKey}&page=${pageParam}`,
    });

  const res = usePaginatedInfinite<INovel>(queryKey, { queryFn });
  return res;
}

// interface UsePaginatedNovelsByGenres extends UseNovels {
//   page: number;
//   subGenreIds?: number[] | string[];
// }

// interface UsePaginatedNovelsByGenresReturn {
//   novels?: Novel[];
//   totalPages: number;
//   isEmpty: boolean;
//   isError: boolean;
//   revalidate: () => Promise<boolean>;
// }
// export function usePaginatedNovelsByGenres({
//   genreId,
//   page,
//   size = 20,
//   sortType,
//   subGenreIds,
// }: UsePaginatedNovelsByGenres): UsePaginatedNovelsByGenresReturn {
//   const { isAdultOn } = useAdultFilter();

//   const sortQueries: { [key: string]: string } = {
//     BEST_SCORE: 'cacheFields.bestIndex,desc&sort=id,desc',
//     POPULAR: 'cacheFields.visitorCount,desc&sort=id,desc',
//     UPDATE: 'latestPublishedAt,desc&sort=id,desc',
//     NEWEST: 'firstPublishedAt,desc&sort=id,desc',
//     OLDEST: 'firstPublishedAt,asc&sort=id,asc',
//   };
//   const getKey = (pageIndex: number) => {
//     return `/novels/genres/${genreId}?subGenreIds=${subGenreIds?.join(
//       ',',
//     )}&page=${pageIndex}&size=${size}&sort=${
//       sortQueries[sortType]
//     }&adult=${isAdultOn}`;
//   };

//   const { data, error, revalidate } = useSWR<PaginatedResponse<Novel>>(
//     getKey(page),
//   );

//   return {
//     novels: data?.content,
//     totalPages: data?.totalPages ?? 1,
//     isEmpty: data?.empty ?? true,
//     isError: error,
//     revalidate,
//   };
// }

interface IUseLatestNovelsResponse {
  data?: IPaginatedResponse<INovel>;
  isLoading?: boolean;
  error: Nullable<Error>;
}

export function useLatestNovels({
  genreId,
  size = 5,
  sortType,
  page = 0,
}: IUseLatestNovels): IUseLatestNovelsResponse {
  const { isAdultOn } = useAdultFilter();

  const sortQueries: { [key: string]: string } = {
    BEST_SCORE: 'cacheFields.bestIndex,desc&sort=id,desc',
    POPULAR: 'cacheFields.visitorCount,desc&sort=id,desc',
    UPDATE: 'latestPublishedAt,desc&sort=id,desc',
    NEWEST: 'firstPublishedAt,desc&sort=id,desc',
  };

  const { data, error } = useQuery<IPaginatedResponse<INovel>, Error>(
    `/novels/genres/${genreId}?page=${page}&size=${size}&sort=${sortQueries[sortType]}&adult=${isAdultOn}`,
    { queryFn },
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}
