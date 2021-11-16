import {
  createReducer,
  ReducerActionHelper,
  createBasicReducerHandlers,
} from 'shared/util/redux';

import { ActionType, actions } from './action';

export interface IStateCommon {}

export const INITIAL_STATE: IStateCommon = {};

export default createReducer<IStateCommon, ReducerActionHelper<typeof actions>>(
  INITIAL_STATE,
  {
    ...createBasicReducerHandlers({
      setValueActionType: ActionType.SetValue,
      setPropertyValuesActionType: ActionType.SetPropertyValues,
    }),
  },
);
