import { kToast } from 'shared/component/toast/KToast';
import React from 'react';
import TestItem from 'shared/uiTest/component/TestItem';
import useTestCheckBox from 'shared/uiTest/hook/useTestCheckBox';

interface IProps {}

export default function TestKToast({}: IProps) {
  const desc = useTestCheckBox({
    label: 'Long description',
    valueTrue: new Array(10)
      .fill('카카오엔터테인먼트 웹센터입니다')
      .map((str, index) => `${str} ${index + 1}\b`)
      .join(''),
    valueFalse: '카카오엔터테인먼트 웹센터입니다',
  });
  const isUseTitle = useTestCheckBox({ label: 'Show title' });
  return (
    <TestItem title="Test kToast">
      <button
        onClick={() =>
          kToast(
            isUseTitle
              ? {
                  title: 'This is title',
                  desc,
                }
              : desc,
          )
        }
      >
        토스트 실행
      </button>
    </TestItem>
  );
}
