import { IRoute } from 'common/type';
import useRanking from 'genre/hook/useRanking';
import { useEffect, useState } from 'react';

export default function usePagedRealtimeRank(genre: IRoute) {
  const MAX_LENGTH = 9;

  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(0);
  }, [genre]);

  const { data, isLoading } = useRanking({
    genreIds: [genre.id],
    type: 'realtime',
  });

  const novels = data?.map(d => d.novel).slice(0, MAX_LENGTH);
  const totalPages = novels ? Math.ceil(novels.length / 3) : 0;
  const pagedNovels = novels?.slice(page * 3, (page + 1) * 3);
  const isEmpty = data && data?.length < 1;

  const nextPage = () => {
    setPage(prev => {
      return (prev + 1) % totalPages;
    });
  };

  return {
    isLoading,
    isEmpty,
    pagedNovels,
    page: page + 1,
    totalPages,
    nextPage,
  };
}
