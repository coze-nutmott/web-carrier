import React from 'react';
import TestItem from 'shared/uiTest/component/TestItem';
import useTestSelect from 'shared/uiTest/hook/useTestSelect';
import { Text } from 'common/component/shared';
import * as textVariant from 'common/style/textVariant';
import { ITextVariant } from 'common/style';
import { getKeys } from 'shared/util/common';

export default function TestText() {
  const variant = useTestSelect({
    id: 'variant',
    label: 'variant',
    options: OPTIONS,
    initialSelectedKey: OPTIONS[0].key,
  });
  return (
    <TestItem title="variant">
      <Text variant={variant}>Test 1234</Text>
    </TestItem>
  );
}

const OPTIONS: Array<{ key: ITextVariant; text: ITextVariant }> = getKeys(
  textVariant,
).map(key => ({
  key,
  text: key,
}));
