import { getUser, refreshSession, stageLogin } from 'common/state/callApi';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as commonActions } from 'common/state/action';
import { pushLog } from 'shared/util/debug';
import { ACCESS_TOKEN_KEY } from 'common/constant';
import Cookies from 'js-cookie';

interface IProps {
  children?: ReactNode;
}

export const SessionProvider = ({ children }: IProps) => {
  const dispatch = useDispatch();
  const session = useSelector(state => state.common.session);

  useEffect(() => {
    const login = async () => {
      try {
        const auth = await stageLogin();
        const user = await getUser();
        dispatch(commonActions.login(auth.accessToken, auth.kakao, user));
      } catch (e: any) {
        Cookies.remove(ACCESS_TOKEN_KEY);
        pushLog({ msg: 'login error', params: e, type: 'error' });
      }
    };
    login();
  }, [dispatch]);

  useEffect(() => {
    const refresh = async () => {
      if (!session.kakao?.access_token || !session.kakao?.app_user_id) {
        return;
      }

      const auth = await refreshSession(
        session.kakao.access_token,
        session.kakao.app_user_id,
      );
      dispatch(commonActions.refreshSession(auth.accessToken, auth.kakao));
    };
    const refreshSessionInterval = setInterval(() => {
      refresh();
    }, REFRESH_TOKEN_INTERVAL);

    return () => clearInterval(refreshSessionInterval);
  }, [dispatch, session]);

  return <>{children}</>;
};

const REFRESH_TOKEN_INTERVAL = 30 * 60 * 1000;
