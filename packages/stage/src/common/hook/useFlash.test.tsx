import useFlash from 'common/hook/useFlash';
import { renderHook } from '@testing-library/react-hooks';

describe('useFlash', () => {
  it('showErrorMessage 정상 동작', () => {
    const { result } = renderHook(() => useFlash(), {
      wrapper: global.getWrapperWithRedux(),
    });
    console.log('[COZE_LOG] result', result.current);
  });
});
