import { Store, createStore } from 'redux';
import { combineReducers, compose } from 'redux';

import common, { IStateCommon } from 'common/state/reducer';
import main, { IStateMain } from 'main/state/reducer';
import newTodo, { IStateNewTodo } from 'newTodo/state/reducer';

import { ENV_NAME, IS_CLIENT } from 'shared/common/constant';
import shared from 'shared/state/reducer';
import { IStateShared } from 'shared/type';

export interface IReduxState {
  shared: IStateShared;
  common: IStateCommon;
  main: IStateMain;
  newTodo: IStateNewTodo;
}
declare module 'react-redux' {
  interface DefaultRootState extends IReduxState {}
}
export type KStore = Store<IReduxState>;

const combinedReducer = combineReducers<IReduxState>({
  shared,
  common,
  main,
  newTodo,
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
