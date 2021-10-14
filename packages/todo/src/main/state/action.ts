import { ITodo } from 'common/type';
import { IStateMain } from 'main/state/reducer';
import { createAction, createBasicActions } from 'shared/util/redux';

export enum ActionType {
  SetValue = 'main.SetValue',
  SetPropertyValues = 'main.SetPropertyValues',
  AddTodo = 'main.AddTodo',
  RemoveTodo = 'main.RemoveTodo',
}

export const actions = {
  /**
   * 주요 포인트
   * 값의 단순 할당은 setValue 액션을 사용합니다
   * ex) dispatch(actions.setValue('someValue', 123))
   */
  ...createBasicActions<IStateMain>({
    setValueActionType: ActionType.SetValue,
    setPropertyValuesActionType: ActionType.SetPropertyValues,
  }),
  addTodo: (data: ITodo) => createAction(ActionType.AddTodo, { data }),
  removeTodo: (todoId: number) =>
    createAction(ActionType.RemoveTodo, { todoId }),
};
