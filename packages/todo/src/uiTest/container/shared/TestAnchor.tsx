import { Anchor, Text } from 'common/component/shared';
import { kRouter, Page } from 'common/util/kRouter';
import React from 'react';
import TestItem from 'shared/uiTest/component/TestItem';
import useTestCheckBox from 'shared/uiTest/hook/useTestCheckBox';

interface IProps {}

export default function TestAnchor({}: IProps) {
  const display = useTestCheckBox({
    label: 'use inline',
    valueTrue: 'inline',
    valueFalse: 'block',
  });
  return (
    <div>
      <TestItem title="pageInfo 사용">
        <Anchor
          pageInfo={{ page: Page.NewTodo }}
          display={display}
          className="p-20"
        >
          <Text as="span" variant="s16_regular_black">
            pageInfo 사용
          </Text>
        </Anchor>
        <Text as="span" variant="s16_regular_black">
          다음 요소
        </Text>
      </TestItem>
      <TestItem title="onClick 사용">
        <Anchor
          onClick={() => {
            kRouter.routeTo({
              page: Page.NewTodo,
            });
          }}
          display={display}
          className="p-20"
        >
          <Text as="span" variant="s16_regular_black">
            onClick 사용
          </Text>
        </Anchor>
        <Text as="span" variant="s16_regular_black">
          다음 요소
        </Text>
      </TestItem>
    </div>
  );
}
