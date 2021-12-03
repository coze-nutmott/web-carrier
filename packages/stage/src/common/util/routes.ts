import { IRankingType } from 'genre/hook/useRanking';
import queryString from 'query-string';

interface IRankingPathParams {
  genreIds: (number | string)[];
  type: IRankingType;
  ageRange?: string;
  dateRange?: string;
}

export const rankingPath = (params: IRankingPathParams): string => {
  const query = queryString.stringify({
    genreIds: params.genreIds,
    type: params.type,
    ageRange: params.ageRange,
    dateRange: params.dateRange,
  });

  return `/ranking?${query}`;
};
