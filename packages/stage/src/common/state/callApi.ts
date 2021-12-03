import { ACCESS_TOKEN_KEY } from 'common/constant';
import { IKakaoAuth, IUser } from 'common/type';
import callApi from 'common/util/api';
import { getQueryString } from 'common/util/path';
import Cookies from 'js-cookie';
import { pushLog } from 'shared/util/debug';

function initializeKakaoSDK(): void {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
  }
}

interface IKakaoAuthInfo {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}
function fetchKakaoLogin(): Promise<IKakaoAuthInfo> {
  return new Promise<IKakaoAuthInfo>((resolve, reject) => {
    initializeKakaoSDK();
    window.Kakao.Auth.loginForm({
      success: (response: IKakaoAuthInfo) => {
        resolve(response);
      },
      fail: (error: unknown) => {
        reject(error);
      },
    });
  });
}

interface IKakaoUser {
  id: number;
  connected_at: string; // 2020-12-01T01:23:34Z
  // NOTE: kakao_account 정보는 사용되지 않습니다. 불필요한 경우 완전히 제거합니다.
  kakao_account?: {
    email?: string;
    email_needs_agreement: boolean;
    has_email: boolean;
    has_phone_number: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    phone_number_needs_agreement: boolean;
    profile_needs_agreement: boolean;
  };
}
function getKakaoUser(): Promise<IKakaoUser> {
  initializeKakaoSDK();
  return new Promise<IKakaoUser>((resolve, reject) => {
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: (response: IKakaoUser) => {
        resolve(response);
      },
      fail: (error: unknown) => {
        reject(error);
      },
    });
  });
}

export async function kakaoLogin(): Promise<IKakaoAuth> {
  const auth = await fetchKakaoLogin();
  const user = await getKakaoUser();

  return {
    access_token: auth.access_token,
    refresh_token: auth.refresh_token,
    app_user_id: user.id,
  };
}

export async function kakaoLogout(): Promise<void> {
  initializeKakaoSDK();
  return new Promise<void>(resolve => {
    window.Kakao.Auth.logout(() => {
      resolve();
    });
  });
}

export const enum KakaopageLoginCode {
  Success = 0,
  Restricted = -2,
  NotRegistered = -50,
  Inactive = -51,
  UnknownError = -500,
  KakaoAccountError = -40500,
}

interface IKakaopageResponse {
  result_code: KakaopageLoginCode;
  response_time: string;
  message: string;
}

export async function kakaopageLogin({
  access_token,
  refresh_token,
  app_user_id,
}: IKakaoAuth): Promise<IKakaopageResponse> {
  return callApi<IKakaopageResponse>({
    url: '/auth/v5/web/login',
    apiHost: process.env.KAKAOPAGE_API_HOST,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
    data: getQueryString({
      access_token,
      refresh_token,
      app_user_id,
      referrer: 'stage',
    }),
  });
}

export async function stageLogin(): Promise<{
  accessToken: string;
  kakao: IKakaoAuth;
}> {
  const res = await callApi<{
    accessToken: string;
    kakao: IKakaoAuth;
  }>({
    url: '/users/login',
    method: 'post',
    getter: res => ({
      accessToken: res.accessToken,
      kakao: {
        access_token: res.kakaoPageUser.accessToken,
        app_user_id: res.kakaoPageUser.appUserId,
      },
    }),
  });

  // TODO: api 에 set-cookie 요청
  Cookies.set(ACCESS_TOKEN_KEY, res.accessToken, {
    secure: true,
  });

  return res;
}

export async function refreshSession(
  accessToken: string,
  appUserId: number,
): Promise<any> {
  try {
    await callApi({
      url: '/users/me/refresh-token',
      data: {
        appUserId,
        accessToken,
      },
      method: 'post',
    });

    return stageLogin();
  } catch (e: any) {
    pushLog({ msg: 'refresh error', params: e });
  }
}

export async function getUser() {
  return callApi<IUser>({
    url: '/users/me',
    method: 'get',
  });
}
