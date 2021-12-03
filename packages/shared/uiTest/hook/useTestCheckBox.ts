import { useContext } from 'react';

import useEffectAfterTrue from '../../hook/useEffectAfterTrue';
import { TestPageContext } from '../../uiTest/context';

export default function useTestCheckBox<V1 = true, V2 = false>({
  label,
  defaultValue = true,
  valueTrue,
  valueFalse,
}: {
  label: string;
  defaultValue?: boolean;
  valueTrue?: V1;
  valueFalse?: V2;
}): V1 | V2 {
  const { checkboxList, setCheckboxList } = useContext(TestPageContext);
  const checkbox = checkboxList.find(item => item.label === label);
  const isTrue = checkbox?.isTrue ?? defaultValue;
  useEffectAfterTrue(() => {
    setCheckboxList(prev => [
      ...prev,
      {
        label,
        isTrue,
      },
    ]);
  }, checkbox === undefined);

  const retVal = isTrue
    ? valueTrue === undefined
      ? true
      : valueTrue
    : valueFalse === undefined
    ? false
    : valueFalse;
  // valueTrue의 타입이 false 이거나 valueFalse의 타입이 true가 아니라면 괜찮다
  return retVal as V1 | V2;
}
