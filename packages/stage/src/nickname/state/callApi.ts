// state와 관련이 있지는 않으나 api 관련 함수들을 이 파일로 모음

import { INickname, IResultResponse } from 'common/type';
import callApi from 'common/util/api';

export const createNickname = async (
  name: string,
  isKakaopageNickname: boolean,
  profileId?: string | undefined,
): Promise<INickname> => {
  return callApi({
    method: 'post',
    url: '/users/nicknames',
    data: {
      name: name,
      isKakaopageNickname: isKakaopageNickname,
      profileId: profileId,
    },
  });
};

export const updateNickname = async (
  nicknameId: string | number,
  isKakaopageNickname: boolean,
  name?: string,
  profileId?: string | string,
): Promise<INickname> => {
  return callApi({
    method: 'put',
    url: `/users/nicknames/${nicknameId}`,
    data: {
      name: name,
      isKakaopageNickname: isKakaopageNickname,
      profileId: profileId,
    },
  });
};

export const removeNickname = async (
  nicknameId: string | number,
): Promise<IResultResponse> => {
  return callApi({
    method: 'delete',
    url: `/users/nicknames/${nicknameId}`,
  });
};

export const uploadProfileImage = async (dataUrl: string): Promise<File> => {
  return callApi({
    method: 'patch',
    url: '/users/nicknames/profiles',
    data: {
      base64Image: dataUrl,
    },
  });
};

interface DuplicateNicknameResponse {
  duplicatedKakaopageNickname: boolean;
  duplicatedStageNickname: boolean;
  valid: boolean;
}

export const getDuplicate = async (
  name: string,
): Promise<DuplicateNicknameResponse> => {
  return callApi({
    method: 'get',
    url: `/users/nicknames/duplicate?name=${name}`,
  });
};
