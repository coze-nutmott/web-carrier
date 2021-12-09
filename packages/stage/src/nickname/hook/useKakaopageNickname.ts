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

interface IUseKakaopageNicknameReturn {
  authentication?: IKakaopageNicknameAuthentication;
  isNotFound?: boolean;
}

export default function useKakaopageNickname(
  nicknameId?: number | string,
): IUseKakaopageNicknameReturn {
  const { data, error } = useQuery<
    IKakaopageNicknameAuthentication,
    { response: { status: number } }
  >(
    // TODO: COZE: 미리 정의되어 가져다 쓸 수 있는 타입은 없는지 확인해보기.
    `/kakaopage-nickname-authentications/nicknames/${nicknameId}`,
    {
      queryFn,
      retry: false,
      enabled: !!nicknameId,
    },
  );

  const isNotFound = error?.response.status === 404;

  return {
    authentication: data,
    isNotFound,
  };
}
