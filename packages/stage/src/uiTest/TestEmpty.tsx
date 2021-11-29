import Empty from 'common/component/Empty';
import { Text } from 'common/component/shared';
import TestItem from 'shared/uiTest/component/TestItem';
import NoticeIcon from '@icons/icons-information.svg';

export default function TestEmpty() {
  return (
    <TestItem title="Empty">
      <Empty>
        <NoticeIcon />
        <Text variant="s12_medium_gray" className="mt-20">
          점검 중입니다.
        </Text>
      </Empty>
    </TestItem>
  );
}
