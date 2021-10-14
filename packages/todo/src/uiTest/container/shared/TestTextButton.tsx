import React from 'react';
import TestItem from 'shared/uiTest/component/TestItem';
import useTestSelect from 'shared/uiTest/hook/useTestSelect';
import { TextButton } from 'common/component/shared';
import * as textVariant from 'common/style/textVariant';
import * as buttonVariant from 'common/style/buttonVariant';
import { getKeys } from 'shared/util/common';

export default function TestTextButton() {
  const textVariant = useTestSelect({
    id: 'textVariant',
    label: 'textVariant',
    options: TEXT_OPTIONS,
    initialSelectedKey: TEXT_OPTIONS[0].key,
  });
  const buttonVariant = useTestSelect({
    id: 'buttonVariant',
    label: 'buttonVariant',
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

const TEXT_OPTIONS = getKeys(textVariant).map(key => ({
  key,
  text: key,
}));
const BUTTON_OPTIONS = getKeys(buttonVariant).map(key => ({
  key,
  text: key,
}));
