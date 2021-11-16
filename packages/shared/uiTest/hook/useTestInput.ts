import { useContext } from 'react';

import useEffectAfterTrue from '../../hook/useEffectAfterTrue';
import { TestPageContext } from '../../uiTest/context';
import { ITestInput } from '../../uiTest/type';

interface IProps<T> extends Omit<ITestInput<T>, 'type' | 'value'> {
  initialValue: T;
}

export default function useTestInput<T extends string | number>({
  label,
  initialValue,
  disabled,
}: IProps<T>) {
  const { inputList, setInputList } = useContext(TestPageContext);
  const input = inputList.find(item => item.label === label);
  useEffectAfterTrue(() => {
    setInputList(prev => [
      ...prev,
      {
        type: typeof initialValue === 'number' ? 'number' : 'text',
        label,
        value: initialValue,
        disabled,
      },
    ]);
  }, input === undefined);
  useEffectAfterTrue(() => {
    setInputList(prev =>
      prev.map(item => ({
        ...item,
        disabled: item.label === label ? disabled : item.disabled,
      })),
    );
  }, input !== undefined && input.disabled !== disabled);
  return input ? input.value : initialValue;
}
