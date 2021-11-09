import React from 'react';
import TestItem from 'shared/uiTest/component/TestItem';
import useTestSelect from 'shared/uiTest/hook/useTestSelect';
import { TextButton } from 'common/component/shared';
import { textVariants } from 'common/style/textVariant';
import { buttonVariants } from 'common/style/buttonVariant';

export default function TestTextButton() {
  const textVariant = useTestSelect({
    id: 'textVariant',
    options: TEXT_OPTIONS,
    initialSelectedKey: TEXT_OPTIONS[0].key,
  });
  const buttonVariant = useTestSelect({
    id: 'buttonVariant',
    options: BUTTON_OPTIONS,
    initialSelectedKey: BUTTON_OPTIONS[0].key,
  });
  return (
    <TestItem title="variant">
      <TextButton variant={buttonVariant} textVariant={textVariant}>
        Test 1234
      </TextButton>
    </TestItem>
  );
}

const TEXT_OPTIONS = textVariants.map(key => ({
  key,
  text: key,
}));
const BUTTON_OPTIONS = buttonVariants.map(key => ({
  key,
  text: key,
}));
