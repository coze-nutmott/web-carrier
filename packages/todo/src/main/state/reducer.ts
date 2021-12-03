import { ITodo } from 'common/type';

import {
  createReducer,
  ReducerActionHelper,
  createBasicReducerHandlers,
} from 'shared/util/redux';

import { ActionType, actions } from './action';

export interface IStateMain {
  todos: ITodo[];
}

export const INITIAL_STATE: IStateMain = {
  todos: [],
};

export default createReducer<IStateMain, ReducerActionHelper<typeof actions>>(
  INITIAL_STATE,
  {
    ...createBasicReducerHandlers({
      setValueActionType: ActionType.SetValue,
      setPropertyValuesActionType: ActionType.SetPropertyValues,
    }),
    [ActionType.AddTodo]: (state, action) => {
      const newTodo = action.payload.data;
      state.todos.push(newTodo);
    },
    [ActionType.RemoveTodo]: (state, action) => {
      state.todos = state.todos.filter(
        item => item.id !== action.payload.todoId,
      );
    },
  },
);
