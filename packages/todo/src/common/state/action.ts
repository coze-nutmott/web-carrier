import { IStateCommon } from 'common/state/reducer';
import { createBasicActions } from 'shared/util/redux';

export enum ActionType {
  SetValue = 'common.SetValue',
  SetPropertyValues = 'common.SetPropertyValues',
}

export const actions = {
  ...createBasicActions<IStateCommon>({
    setValueActionType: ActionType.SetValue,
    setPropertyValuesActionType: ActionType.SetPropertyValues,
  }),
};
