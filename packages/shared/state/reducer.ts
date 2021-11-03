import { actions, ActionType } from '../state/action';
import { IStateShared } from '../type';
import {
  createReducer,
  ReducerActionHelper,
  createBasicReducerHandlers,
} from '../util/redux';

export const INITIAL_STATE: IStateShared = {
  kAlerts: [],
  toasts: [],
  isAppMounted: false,
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
    [ActionType.AddKAlert]: (state, action) => {
      const alert = action.payload.data;
      const prevAlert =
        alert.groupId &&
        state.kAlerts.find(item => item.groupId === alert.groupId);
      if (prevAlert) {
        prevAlert.callback = getMergedFunction(
          prevAlert.callback,
          alert.callback,
        );
        prevAlert.callbackSecond = getMergedFunction(
          prevAlert.callbackSecond,
          alert.callbackSecond,
        );
        prevAlert.onRequestClose = getMergedFunction(
          prevAlert.onRequestClose,
          alert.onRequestClose,
        );
      } else {
        state.kAlerts.push(action.payload.data);
      }
    },
    [ActionType.RemoveKAlert]: state =>
      state.kAlerts.length && state.kAlerts.splice(0, 1),
    [ActionType.RemoveAllKAlerts]: state => (state.kAlerts = []),
  },
);

function getMergedFunction(prev?: () => void, next?: () => void) {
  return () => {
    prev?.();
    next?.();
  };
}
