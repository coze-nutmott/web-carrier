import { useEffect, useState } from 'react';

import usePrevious from '../hook/usePrevious';

/**
 * - value 가 false => true 가 되는 경우에만 callback 을 호출한다
 *   - true => true 인 경우에는 호출되지 않으므로 주의하자
 * - 처음부터 true이면 호출된다
 */
export default function useEffectAfterTrue(callback: Function, value: boolean) {
  const prev = usePrevious(value);
  const [isOn, setIsOn] = useState(value);
  useEffect(() => {
    if (!prev && value) {
      setIsOn(true);
    } else if (prev && !value) {
      setIsOn(false);
    }
  }, [prev, value]);
  useEffect(() => {
    if (isOn) {
      return callback();
    }
    // ref 로 callback 을 관리할 수도 있지만 성능을 위해 넣지 않았다. 테스트 코드를 믿자.
  }, [isOn]); // eslint-disable-line react-hooks/exhaustive-deps
}
