import useFlash from 'common/hook/useFlash';
import { renderHook } from '@testing-library/react-hooks';

describe('useFlash', () => {
  it('showErrorMessage 정상 동작', () => {
    const { result } = renderHook(() => useFlash(), {
      wrapper: global.getWrapperWithRedux(),
    });
    // TODO: COZE: implement this
    console.info(result.current);
  });
});
