import A11y from 'common/component/A11y';
import TestItem from 'shared/uiTest/component/TestItem';

export default function TestA11y() {
  return (
    <TestItem title="아래에 아무것도 안보여야합니다.">
      <A11y>h1 invisible</A11y>
      <A11y as="h2">h2 invisible</A11y>
    </TestItem>
  );
}
