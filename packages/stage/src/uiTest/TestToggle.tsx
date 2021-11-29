import Toggle from 'common/component/Toggle';
import { useState } from 'react';
import TestItem from 'shared/uiTest/component/TestItem';

export default function TestToggle() {
  const [completed, setCompleted] = useState(false);
  return (
    <TestItem title="Toggle">
      <Toggle isActive={completed} onClick={() => setCompleted(pre => !pre)} />
    </TestItem>
  );
}
