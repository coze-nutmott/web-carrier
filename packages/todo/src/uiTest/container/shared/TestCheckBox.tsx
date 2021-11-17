import React, { useState } from 'react';

import { CheckBox } from 'common/component/shared';
import TestItem from 'shared/uiTest/component/TestItem';

import TestItem from 'shared/uiTest/component/TestItem';

export default function TestCheckBox() {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <TestItem title="variant">
      <CheckBox
        id="alarm"
        text="알림 받기"
        textVariant="s16_regular_black"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    </TestItem>
  );
}
