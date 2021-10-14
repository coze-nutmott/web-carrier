import { NextPage } from 'next';
import React from 'react';
import useQueryParameter, {
  getStringOptional,
} from 'shared/hook/useQueryParameter';
import { kRouter } from 'common/util/kRouter';
import TestMain from 'shared/uiTest/component/TestMain';
import TestText from 'uiTest/container/shared/TestText';
import TestTextButton from 'uiTest/container/shared/TestTextButton';
import TestUser from 'uiTest/container/TestUser';
import TestKToast from 'uiTest/container/shared/TestKToast';
import TestCheckBox from 'uiTest/container/shared/TestCheckBox';
import TestAnchor from 'uiTest/container/shared/TestAnchor';

interface IQuery {
  name?: string;
}

const DevPage: NextPage = () => {
  const param = useQueryParameter<IQuery>([
    { name: 'name', getter: getStringOptional },
  ]);
  return (
    <TestMain
      testGroups={TEST_GROUPS}
      initialComponentName={param.query.name ?? ''}
      routeTo={kRouter.routeTo.bind(kRouter)}
    />
  );
};

/**
 * 주요 포인트
 * /dev 로 접속하면 UI Test 를 할 수 있습니다
 * src/common/component 밑에 있는 컴포넌트는 되도록 UI Test 를 해야합니다
 * common 외에도 서비스에서 진입 조건이 까다로운 페이지의 컴포넌트는 UI Test 를 작성하는 게 좋습니다 (ex. 뽑기페이지)
 */
const SHARED_TESTS = [
  { component: TestText, name: 'TestText' },
  { component: TestTextButton, name: 'TestTextButton' },
  { component: TestKToast, name: 'TestKToast' },
  { component: TestCheckBox, name: 'TestCheckBox' },
  { component: TestAnchor, name: 'TestAnchor' },
];

const EVENT_TESTS = [{ component: TestUser, name: 'TestUser' }];

const TEST_GROUPS = [
  { title: 'Shared Test', items: SHARED_TESTS },
  { title: 'Event Test', items: EVENT_TESTS },
];

export default DevPage;
