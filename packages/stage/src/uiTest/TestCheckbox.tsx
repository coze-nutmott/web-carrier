import Checkbox from 'common/component/Checkbox';
import { Text } from 'common/component/shared';
import TestItem from 'shared/uiTest/component/TestItem';

export default function TestBookmarkButton() {
  return (
    <TestItem title="BookmarkButton">
      <Checkbox name="spoiler">
        <Text variant="s14_medium_gray">스포일러 포함</Text>
      </Checkbox>
    </TestItem>
  );
}
