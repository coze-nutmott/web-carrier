import produce from 'immer';

interface ITypedAction<T extends string> {
  type: T;
  notNeedImmutableHelper?: boolean;
}
interface ITypedPayloadAction<T extends string, P> extends ITypedAction<T> {
  payload: P;
}
export type ReduxAction =
  | ITypedAction<string>
  | ITypedPayloadAction<string, any>;

export function createAction<T extends string>(type: T): ITypedAction<T>;
export function createAction<T extends string, P extends object>(
  type: T,
  payload: P,
): ITypedPayloadAction<T, P>;
export function createAction(type: string, payload?: object) {
  return payload !== undefined ? { type, payload } : { type };
}
export function createActionNotImmutable<T extends string, P>(
  type: T,
  payload?: P,
): ITypedAction<T> | ITypedPayloadAction<T, P> {
  const notNeedImmutableHelper = true;
  return payload !== undefined
    ? { type, payload, notNeedImmutableHelper }
    : { type, notNeedImmutableHelper };
}

// setValue 액션만 존재하면 문제가 되서 그 경우에는 any를 반환한다
export type ReducerActionHelper<
  A extends { [key: string]: (...args: any) => any },
> = keyof Omit<
  A,
  'setValue' | 'setPropertyValues' | 'removeValues' | 'initializeAll'
> extends never
  ? any
  : ReturnType<
      A[keyof Omit<
        A,
        'setValue' | 'setPropertyValues' | 'removeValues' | 'initializeAll'
      >]
    >;
export function createReducer<S, A extends ITypedAction<string>>(
  initialState: S,
  handlerMap: {
    [key in A['type']]?: (
      state: S,
      action: Extract<A, ITypedPayloadAction<key, any>>,
      initialState: S,
    ) => void;
  },
) {
  return function (state: S = initialState, action: A) {
    // @ts-ignore
    const handler = handlerMap[action.type];
    if (!handler) {
      return state;
    } else if (action.notNeedImmutableHelper) {
      return handler(state, action, initialState);
    } else {
      return produce(state, draft => {
        handler(draft, action, initialState);
      });
    }
  };
}

const NO_ACTION = { type: 'NO_ACTION' };
export function createBasicActions<S>({
  setValueActionType,
  setPropertyValuesActionType,
  removeValuesActionType,
  initializeAllType,
}: {
  setValueActionType?: string;
  setPropertyValuesActionType?: string;
  removeValuesActionType?: string;
  initializeAllType?: string;
}) {
  return {
    setValue: <K extends keyof S>(key: K, value: S[K]) =>
      setValueActionType
        ? createAction(setValueActionType, {
            key,
            value,
          })
        : NO_ACTION,
    setPropertyValues: <K extends keyof S>(
      property: K,
      values: Partial<S[K]>,
    ) =>
      setPropertyValuesActionType
        ? createAction(setPropertyValuesActionType, { property, values })
        : NO_ACTION,
    removeValues: (keys: Array<OptionalKeys<S>>) =>
      removeValuesActionType
        ? createAction(removeValuesActionType, {
            keys,
          })
        : NO_ACTION,
    initializeAll: () =>
      initializeAllType
        ? createActionNotImmutable(initializeAllType)
        : NO_ACTION,
  };
}
export function createBasicReducerHandlers({
  setValueActionType,
  setPropertyValuesActionType,
  removeValuesActionType,
  initializeAllType,
}: {
  setValueActionType?: string;
  setPropertyValuesActionType?: string;
  removeValuesActionType?: string;
  initializeAllType?: string;
}) {
  return {
    // createBasicActions 에서 타입 정의를 제대로 했으므로 여기서는 무시해도 괜찮다
    // @ts-ignore
    [setValueActionType]: (state, action) =>
      (state[action.payload.key] = action.payload.value),
    // @ts-ignore
    [setPropertyValuesActionType]: (state, action) => {
      const { property, values } = action.payload;
      if (state[property] && values) {
        Object.keys(values).forEach(
          key => (state[property][key] = values[key]),
        );
      }
    },
    // @ts-ignore
    [removeValuesActionType]: (state, action) =>
      action.payload.keys.forEach((key: string) => (state[key] = undefined)),
    // @ts-ignore
    [initializeAllType]: (p1, p2, initialState) => initialState,
  };
}
