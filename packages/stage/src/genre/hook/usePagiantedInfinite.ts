import { IErrorResponse, IPaginatedResponse } from 'common/type';
import { QueryFunction, QueryKey, useInfiniteQuery } from 'react-query';
import last from 'lodash/last';
import { Nullable } from 'common/type';

export interface IUsePaginatedInfiniteResponse<T> {
  data?: T[];
  error: Nullable<IErrorResponse>;
  loadmore: () => void;
  totalElements?: number;
  totalPages?: number;
  isEndPage?: boolean;
  isEmpty?: boolean;
  isLoadingMore?: boolean;
}

/**
 * Paging interface 형태의 API에서 infinite loading을 위한 요청 훅
 * @see PaginatedResponse
 */
export default function usePaginatedInfinite<T>(
  queryKey: QueryKey,
  { queryFn }: { queryFn: QueryFunction<IPaginatedResponse<T>> },
): IUsePaginatedInfiniteResponse<T> {
  const { data, error, fetchNextPage } = useInfiniteQuery<
    IPaginatedResponse<T>,
    IErrorResponse
  >(queryKey, queryFn, { getNextPageParam: lastPage => lastPage.number + 1 });

  const lastData = data && last(data.pages);
  const lastParam = (last(data?.pageParams) as number) || 0;

  const totalElements = lastData && lastData?.totalElements;
  const totalPages = lastData && lastData?.totalPages;
  const isEndPage = lastData && lastData?.last;
  const isEmpty = lastData && lastData?.empty;
  const isLoadingMore = lastData && lastParam > 0;

  return {
    data: data?.pages.flatMap(d => d.content),
    error,
    loadmore: fetchNextPage,
    totalElements,
    totalPages,
    isEndPage,
    isEmpty,
    isLoadingMore,
  };
}
