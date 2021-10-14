import React from 'react';
import User from 'event/component/User';
import useTestCheckBox from 'shared/uiTest/hook/useTestCheckBox';

export default function TestUser() {
  const isLongName = useTestCheckBox({ label: 'use long name' });
  return <User user={isLongName ? USER2 : USER1} />;
}

const USER1 = {
  id: 1,
  name: 'mike',
  createdAt: '2021-10-12',
};
const USER2 = {
  id: 2,
  name: 'long name long name long name long name',
  createdAt: '2021-10-12',
};
