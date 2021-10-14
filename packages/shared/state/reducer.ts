import { actions, ActionType } from '../state/action';
import { IStateShared } from '../type';
import {
  createReducer,
  ReducerActionHelper,
  createBasicReducerHandlers,
} from '../util/redux';

export const INITIAL_STATE: IStateShared = {
  toasts: [],
};

export default createReducer<IStateShared, ReducerActionHelper<typeof actions>>(
  INITIAL_STATE,
  {
    ...createBasicReducerHandlers({
      setValueActionType: ActionType.SetValue,
      setPropertyValuesActionType: ActionType.SetPropertyValues,
    }),
    [ActionType.AddToast]: (state, action) => {
      const newToast = action.payload.data;
      if (
        newToast.toastId === undefined ||
        !state.toasts.find(item => item.toastId === newToast.toastId)
      ) {
        state.toasts.push(newToast);
      }
    },
    [ActionType.RemoveToast]: state =>
      state.toasts.length && state.toasts.splice(0, 1),
  },
);
