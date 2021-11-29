import PropfileImage from 'common/component/ProfileImage';
import TestItem from 'shared/uiTest/component/TestItem';

export default function TestProfileImage() {
  return (
    <TestItem title="ProfileImage">
      <PropfileImage className="w-48 h-48" />
    </TestItem>
  );
}
