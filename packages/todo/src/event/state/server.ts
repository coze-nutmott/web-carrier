import { useQuery } from 'react-query';

import callApi from 'common/util/api';
import { IUser } from 'event/type';

/**
 * 주요 포인트
 * 서버 API 호출은 react-query 를 사용합니다
 * useServer{이름} 형식으로 훅을 만들어서 사용합니다.
 * 서버 데이터의 타입 이름은 I_ 로 시작합니다 (I_User 참고)
 */
export function useServerUser(name: string) {
  const query = useQuery(`users/${name}`, () =>
    callApi({
      url: `/users/${name}`,
      apiHost: 'https://api.github.com',
      getter: getUser,
    }),
  );
  return query;
}

interface I_User {
  id: number;
  created_at: string;
  login: string;
}

function getUser(data: I_User): IUser {
  return {
    id: data.id,
    name: data.login,
    createdAt: data.created_at,
  };
}
