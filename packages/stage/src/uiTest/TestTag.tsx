import Tag from 'common/component/Tab';
import TestItem from 'shared/uiTest/component/TestItem';

export default function TestTag() {
  return (
    <TestItem title="Tag">
      <Tag border="round" variant="disabled" className="ml-8">
        차단
      </Tag>
      <Tag variant="secondary" className="ml-8">
        대표
      </Tag>
      <Tag variant="secondary" border="square" className="ml-8">
        답변 대기중
      </Tag>
    </TestItem>
  );
}
