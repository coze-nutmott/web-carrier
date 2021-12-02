import { ActionType, actions } from './action';
import {
  createReducer,
  ReducerActionHelper,
  createBasicReducerHandlers,
} from 'shared/util/redux';
import { IKakaoAuth, IUser } from 'common/type';

type ITheme = 'light' | 'dark' | 'green';

type ISessionStatus = 'unknown' | 'loggedIn' | 'loggedOut';
interface ISessionState {
  accessToken?: string;
  user?: IUser;
  status: ISessionStatus;
  kakao?: IKakaoAuth;
}

export interface IStateCommon {
  theme: ITheme;
  session: ISessionState;
}

export const INITIAL_STATE: IStateCommon = {
  theme: 'light',
  session: {
    status: 'unknown',
  },
};

export default createReducer<IStateCommon, ReducerActionHelper<typeof actions>>(
  INITIAL_STATE,
  {
    ...createBasicReducerHandlers({
      setValueActionType: ActionType.SetValue,
      setPropertyValuesActionType: ActionType.SetPropertyValues,
    }),
    [ActionType.Login]: (state, action) => {
      const { accessToken, kakao, user } = action.payload;
      state.session = {
        accessToken,
        kakao,
        user,
        status: 'loggedIn',
      };
    },
    [ActionType.RefreshSession]: (state, action) => {
      state.session.accessToken = action.payload.accessToken;
      state.session.kakao = action.payload.kakao;
    },
  },
);
