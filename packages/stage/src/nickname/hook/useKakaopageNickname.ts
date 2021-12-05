import { useQuery } from 'react-query';

import { INickname, IUser } from 'common/type';
import { queryFn } from 'common/util/api';

type IKakaopageNicknameAuthenticationStatus =
  | 'READY'
  | 'PENDING'
  | 'VERIFIED'
  | 'REJECT';

interface IKakaopageNickname {
  id: number;
  name: string;
}

interface IKakaopageNicknameAuthentication {
  file: File;
  id: number;
  kakaopageNickname: IKakaopageNickname;
  nickname: INickname;
  status: IKakaopageNicknameAuthenticationStatus;
  user: IUser;
}

interface UseKakaopageNicknameReturn {
  authentication?: IKakaopageNicknameAuthentication;
  isNotFound?: boolean;
}

export default function useKakaopageNickname(
  nicknameId?: number | string,
): UseKakaopageNicknameReturn {
  const { data, error } = useQuery<IKakaopageNicknameAuthentication, any>(
    // TODO: COZE: 'any' type (same as original project) => Error type fails on error.response
    nicknameId
      ? `/kakaopage-nickname-authentications/nicknames/${nicknameId}`
      : '',
    {
      queryFn,
      retry: false,
    },
  );

  const isNotFound = error?.response.status === 404;

  return {
    authentication: data,
    isNotFound,
  };
}
