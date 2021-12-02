import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { actions as commonActions } from 'common/state/action';
import { pushLog } from 'shared/util/debug';
import {
  getUser,
  kakaoLogin,
  kakaopageLogin,
  KakaopageLoginCode,
  stageLogin,
} from 'common/state/callApi';

// TODO: logout
// TODO: login error 상태별 기능 추가
function useSession() {
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSelector(state => state.common.session);
  const loading = session.status === 'unknown';
  const loggedOut = session.status === 'loggedOut';

  const login = async (redirectTo: string = router.asPath) => {
    try {
      const kakaoAuth = await kakaoLogin();
      const kakaopageRes = await kakaopageLogin(kakaoAuth);

      switch (kakaopageRes.result_code) {
        case KakaopageLoginCode.Success: {
          //성공
          const auth = await stageLogin();
          const user = await getUser();
          dispatch(commonActions.login(auth.accessToken, auth.kakao, user));
          break;
        }
        case KakaopageLoginCode.Restricted: // 사용제한
          // dispatch(showFlash({ type: 'error', message: res.message }));
          break;
        case KakaopageLoginCode.NotRegistered: // 미가입
          // Router.push(kakaopageAccountRegisterPath({ redirectTo, ...auth }));
          break;
        case KakaopageLoginCode.Inactive: // 휴면
          // Router.push(
          //   kakaopageActivateAccountPath({
          //     accessToken: auth.accessToken,
          //     appUserId: auth.appUserId,
          //   }),
          // );
          break;
        default: {
          break;
        }
      }
    } catch (e) {
      pushLog({ msg: 'login error', params: e as any });
    }
  };

  const signOut = () => {
    // dispatch(destroySession());
  };

  return {
    session,
    currentUserId: session.user?.id,
    currentUserAge: session.user?.age,
    verifiedAdult: session.user?.adultVerified,
    loading,
    loggedOut,
    login,
    signOut,
  };
}

export default useSession;
