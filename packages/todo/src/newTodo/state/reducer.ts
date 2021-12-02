import {
  createReducer,
  ReducerActionHelper,
  createBasicReducerHandlers,
} from 'shared/util/redux';

import { ActionType, actions } from './action';

export interface IStateNewTodo {
  nextId: number;
}

export const INITIAL_STATE: IStateNewTodo = {
  nextId: 1,
};

export default createReducer<
  IStateNewTodo,
  ReducerActionHelper<typeof actions>
>(INITIAL_STATE, {
  ...createBasicReducerHandlers({
    setValueActionType: ActionType.SetValue,
    setPropertyValuesActionType: ActionType.SetPropertyValues,
  }),
  [ActionType.IncreaseId]: state => {
    /**
     * 주요 포인트
     * 우리는 immer 를 사용하기 때문에 값을 직접 수정해도 괜찮습니다 (자동으로 불변 객체로 관리됨)
     */
    state.nextId++;
  },
});
