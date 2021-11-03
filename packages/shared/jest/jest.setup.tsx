import { createStore, Reducer } from 'redux';
import { Provider } from 'react-redux';

declare global {
  function getWrapperWithRedux(reducer?: Reducer): any;
}

global.getWrapperWithRedux = (
  reducer: Reducer = () => ({ shared: { isAppMounted: true } }),
) => {
  const store = createStore(reducer);
  return function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  };
};
