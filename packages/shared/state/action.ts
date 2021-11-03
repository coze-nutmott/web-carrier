import { IStateShared, IToast } from '../type';
import { IKAlert } from '../type/alert';
import { createBasicActions, createAction } from '../util/redux';

export enum ActionType {
  SetValue = 'shared.SetValue',
  SetPropertyValues = 'shared.SetPropertyValues',
  AddToast = 'shared.AddToast',
  RemoveToast = 'shared.RemoveToast',
  AddKAlert = 'shared.AddKAlert',
  RemoveKAlert = 'shared.RemoveKAlert',
  RemoveAllKAlerts = 'shared.RemoveAllKAlerts',
}

export const actions = {
  ...createBasicActions<IStateShared>({
    setValueActionType: ActionType.SetValue,
    setPropertyValuesActionType: ActionType.SetPropertyValues,
  }),
  addToast: (data: IToast) => createAction(ActionType.AddToast, { data }),
  removeToast: () => createAction(ActionType.RemoveToast),
  addAlert: (data: IKAlert) =>
    createAction(ActionType.AddKAlert, {
      data,
    }),
  removeAlert: () => createAction(ActionType.RemoveKAlert),
  removeAllAlerts: () => createAction(ActionType.RemoveAllKAlerts),
};
