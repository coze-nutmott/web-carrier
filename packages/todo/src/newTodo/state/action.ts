import { IStateNewTodo } from 'newTodo/state/reducer';
import { createAction, createBasicActions } from 'shared/util/redux';

export enum ActionType {
  SetValue = 'new.SetValue',
  SetPropertyValues = 'new.SetPropertyValues',
  IncreaseId = 'new.IncreaseId',
}

export const actions = {
  ...createBasicActions<IStateNewTodo>({
    setValueActionType: ActionType.SetValue,
    setPropertyValuesActionType: ActionType.SetPropertyValues,
  }),
  increaseId: () => createAction(ActionType.IncreaseId),
};
