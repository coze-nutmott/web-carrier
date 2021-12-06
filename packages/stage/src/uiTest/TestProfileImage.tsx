import TestItem from 'shared/uiTest/component/TestItem';

import ProfileImage from 'common/component/ProfileImage';

export default function TestProfileImage() {
  return (
    <TestItem title="ProfileImage">
      <ProfileImage className="w-48 h-48" />
    </TestItem>
  );
}
