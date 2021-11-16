import React from 'react';

import { kAlert } from 'shared/component/KAlert';
import { IKAlertButtonSet } from 'shared/type/alert';
import TestItem from 'shared/uiTest/component/TestItem';
import useTestCheckBox from 'shared/uiTest/hook/useTestCheckBox';
import useTestSelect from 'shared/uiTest/hook/useTestSelect';

interface IProps {}

export default function TestKAlert({}: IProps) {
  const desc = useTestCheckBox({
    label: 'Show desc',
    valueTrue: '이벤트는 2099년 10월 21일까지 진행됩니다',
    valueFalse: undefined,
  });
  const isForced = useTestCheckBox({ label: 'isForced', defaultValue: false });
  const isButtonVertical = useTestCheckBox({
    label: 'isButtonVertical',
    defaultValue: false,
  });
  const buttonSet = useTestSelect({
    id: 'buttonSet',
    options: OPTIONS,
    initialSelectedKey: OPTIONS[0].key,
  });
  return (
    <TestItem title="Test kAlert">
      <button
        onClick={() =>
          kAlert({
            title: '이벤트에 참여하시겠습니까?',
            desc,
            buttonSet,
            labelConfirm: '확인',
            labelSecondConfirm: '다음에 참여하기',
            isForced,
            isButtonVertical,
          })
        }
      >
        얼럿 실행
      </button>
    </TestItem>
  );
}

const BUTTON_SET_LIST: IKAlertButtonSet[] = [
  'confirm',
  'cancel',
  'cancelAndConfirm',
  'twoConfirm',
  'cancelAndTwoConfirm',
];
const OPTIONS = BUTTON_SET_LIST.map(key => ({
  key,
  text: key,
}));
