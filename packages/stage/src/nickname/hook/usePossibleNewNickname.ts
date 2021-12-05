import { useQuery } from 'react-query';

import { queryFn } from 'common/util/api';

/**
 * 새로운 닉네임 생성 가능여부 확인
 */
export default function usePossibleNewNickname() {
  const { data, refetch } = useQuery<{ isValidCount: boolean }>(
    '/users/nicknames/count-validation',
    {
      queryFn,
      retry: false,
    },
  );

  return {
    canCreateNewNickname: data?.isValidCount,
    revalidate: refetch,
  };
}
