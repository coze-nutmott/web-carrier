import { useContext } from 'react';

import useEffectAfterTrue from '../../hook/useEffectAfterTrue';
import { TestPageContext } from '../../uiTest/context';
import { ITestButton } from '../../uiTest/type';

type IProps = ITestButton;

export default function useTestButton(props: IProps) {
  const { buttonList, setButtonList } = useContext(TestPageContext);
  const button = buttonList.find(item => item.text === props.text);
  useEffectAfterTrue(() => {
    setButtonList(prev => [...prev, props]);
  }, button === undefined);
}
