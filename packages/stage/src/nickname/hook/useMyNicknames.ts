import { useQuery } from 'react-query';

import { sortBy as _SortBy } from 'lodash';

import { INickname } from 'common/type';
import { queryFn } from 'common/util/api';

interface IUseMyNicknamesReturn {
  myNicknames: INickname[];
  revalidate: () => void;
}
/**
 * 내 닉네임 목록 조회
 */
export default function useMyNicknames(
  sortBy: 'id' | 'name' = 'id',
): IUseMyNicknamesReturn {
  const { data, refetch } = useQuery<INickname[]>('/my/nicknames', {
    queryFn,
    retry: false,
  });

  return {
    myNicknames: _SortBy(data, [sortBy]),
    revalidate: refetch,
  };
}
