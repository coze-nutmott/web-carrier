import { IStateShared, IToast } from '../type';
import { createBasicActions, createAction } from '../util/redux';

export enum ActionType {
  SetValue = 'shared.SetValue',
  SetPropertyValues = 'shared.SetPropertyValues',
  AddToast = 'shared.AddToast',
  RemoveToast = 'shared.RemoveToast',
}

export const actions = {
  ...createBasicActions<IStateShared>({
    setValueActionType: ActionType.SetValue,
    setPropertyValuesActionType: ActionType.SetPropertyValues,
  }),
  addToast: (data: IToast) => createAction(ActionType.AddToast, { data }),
  removeToast: () => createAction(ActionType.RemoveToast),
};
