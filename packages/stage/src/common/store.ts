import { ENV_NAME, IS_CLIENT } from 'shared/common/constant';
import { Store, createStore } from 'redux';
import { combineReducers, compose } from 'redux';
import shared from 'shared/state/reducer';
import { IStateShared } from 'shared/type';
import common, { IStateCommon } from 'common/state/reducer';

export interface IReduxState {
  shared: IStateShared;
  common: IStateCommon;
}
declare module 'react-redux' {
  interface DefaultRootState extends IReduxState {}
}
export type KStore = Store<IReduxState>;

const combinedReducer = combineReducers<IReduxState>({
  shared,
  common,
});

const makeStore = (initialState?: IReduxState): KStore => {
  const composeEnhancers =
    (IS_CLIENT &&
      ENV_NAME === 'local' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store: KStore = createStore(
    combinedReducer,
    initialState,
    composeEnhancers(),
  );
  return store;
};

let kStore: KStore | undefined;
export const getStore = (initialState?: IReduxState) => {
  const _store = kStore ?? makeStore(initialState);

  if (IS_CLIENT && !kStore) {
    kStore = _store;
  }

  return _store;
};
