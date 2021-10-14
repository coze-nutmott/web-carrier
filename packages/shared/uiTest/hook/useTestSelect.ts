import useEffectAfterTrue from '../../hook/useEffectAfterTrue';
import { useContext } from 'react';
import { TestPageContext } from '../../uiTest/context';
import { ITestSelect } from '../../uiTest/type';

interface IProps<T> extends Omit<ITestSelect<T>, 'selectedKey'> {
  initialSelectedKey: T;
}

export default function useTestSelect<T>({
  id,
  label,
  options,
  initialSelectedKey,
}: IProps<T>) {
  const { selectList, setSelectList } = useContext(TestPageContext);
  const select: ITestSelect<T> | undefined = selectList.find(
    item => item.id === id,
  );
  useEffectAfterTrue(() => {
    setSelectList(prev => [
      ...prev,
      {
        id,
        label,
        options,
        selectedKey: initialSelectedKey,
      },
    ]);
  }, select === undefined);

  return select ? select.selectedKey : initialSelectedKey;
}
