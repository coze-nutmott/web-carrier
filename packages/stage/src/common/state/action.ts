import { IStateCommon } from 'common/state/reducer';
import { IFlash, IKakaoAuth, IUser } from 'common/type';
import { createAction, createBasicActions } from 'shared/util/redux';

export enum ActionType {
  SetValue = 'common.SetValue',
  SetPropertyValues = 'common.SetPropertyValues',
  Login = 'common.Login',
  RefreshSession = 'common.RefreshSession',
  PushFlash = 'common.PushFlash',
  PopFlash = 'common.PopFlash',
}

export const actions = {
  ...createBasicActions<IStateCommon>({
    setValueActionType: ActionType.SetValue,
    setPropertyValuesActionType: ActionType.SetPropertyValues,
  }),
  login: (accessToken: string, kakao: IKakaoAuth, user: IUser) =>
    createAction(ActionType.Login, { accessToken, kakao, user }),
  refreshSession: (accessToken: string, kakao: IKakaoAuth) =>
    createAction(ActionType.RefreshSession, { accessToken, kakao }),
  pushFlash: (flash: IFlash) => createAction(ActionType.PushFlash, flash),
  popFlash: () => createAction(ActionType.PopFlash),
};
