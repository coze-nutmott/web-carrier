import { IBanner } from 'common/type';
import { queryFn } from 'common/util/api';
import { useQuery } from 'react-query';

interface IUseBannersParams {
  genreId: number;
  placement: 'GENRE_HOME_TOP' | 'GENRE_HOME_BOTTOM';
}

interface IUseBannerReturns {
  banners?: IBanner[];
  isEmpty: boolean;
}

export default function useBanners({
  genreId,
  placement,
}: IUseBannersParams): IUseBannerReturns {
  const { data } = useQuery<IBanner[]>(
    `/banners?genreId=${genreId}&placement=${placement}`,
    {
      queryFn,
      retry: true,
    },
  );

  return {
    banners: data,
    isEmpty: !data || data.length === 0,
  };
}
