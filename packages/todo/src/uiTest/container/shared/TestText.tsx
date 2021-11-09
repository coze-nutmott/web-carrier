import React from 'react';
import TestItem from 'shared/uiTest/component/TestItem';
import useTestSelect from 'shared/uiTest/hook/useTestSelect';
import { Text } from 'common/component/shared';
import { textVariants } from 'common/style/textVariant';
import { ITextVariant } from 'common/style';

export default function TestText() {
  const variant = useTestSelect({
    id: 'variant',
    options: OPTIONS,
    initialSelectedKey: OPTIONS[0].key,
  });
  return (
    <TestItem title="variant">
      <Text variant={variant}>Test 1234</Text>
    </TestItem>
  );
}

const OPTIONS: Array<{ key: ITextVariant; text: ITextVariant }> =
  textVariants.map(key => ({
    key,
    text: key,
  }));
