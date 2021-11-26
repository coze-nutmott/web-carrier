import { ActionType, actions } from './action';
import {
  createReducer,
  ReducerActionHelper,
  createBasicReducerHandlers,
} from 'shared/util/redux';

type ITheme = 'light' | 'dark' | 'green';
export interface IStateCommon {
  theme: ITheme;
}

export const INITIAL_STATE: IStateCommon = {
  theme: 'light',
};

export default createReducer<IStateCommon, ReducerActionHelper<typeof actions>>(
  INITIAL_STATE,
  {
    ...createBasicReducerHandlers({
      setValueActionType: ActionType.SetValue,
      setPropertyValuesActionType: ActionType.SetPropertyValues,
    }),
  },
);
