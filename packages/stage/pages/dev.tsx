import { NextPage } from 'next';
import useQueryParameter, {
  getStringOptional,
} from 'shared/hook/useQueryParameter';
import TestMain from 'shared/uiTest/component/TestMain';
import { kRouter } from 'common/util/kRouter';
import TestA11y from 'uiTest/TestA11y';
import TestButtonTab from 'uiTest/TestButtonTab';
import TestBookmarkButton from 'uiTest/TestBookmarkButton';
import TestMeta from 'uiTest/TestMeta';
import TestCheckbox from 'uiTest/TestCheckbox';
import TestCircle from 'uiTest/TestCircle';
import TestDatetimeInput from 'uiTest/TestDatetimeInput';
import TestDropdown from 'uiTest/TestDropdown';
import TestEmpty from 'uiTest/TestEmpty';
import TestForm from 'uiTest/TestForm';
import TestGlobalFooter from 'uiTest/TestGlobalFooter';
import TestListHeader from 'uiTest/TestListHeader';
import TestLoading from 'uiTest/TestLoading';
import { TestModals } from 'uiTest/TestModals';
import TestButton from 'uiTest/TestButton';
import TestPagination from 'uiTest/TestPagination';
import TestProfileImage from 'uiTest/TestProfileImage';
import TestSkeleton from 'uiTest/TestSkeleton';
import TestTag from 'uiTest/TestTag';
import TestToggle from 'uiTest/TestToggle';

interface IQuery {
  name?: string;
}

/**
 * 컴포넌트 테스트용 페이지
 */
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

const STAGE_TESTS = [
  { component: TestA11y, name: 'TestA11y' },
  { component: TestButton, name: 'TestButton' },
  { component: TestButtonTab, name: 'TestButtonTab' },
  { component: TestBookmarkButton, name: 'TestBookmarkButton' },
  { component: TestMeta, name: 'TestMeta' },
  { component: TestCheckbox, name: 'TestCheckbox' },
  { component: TestCircle, name: 'TestCircle' },
  { component: TestDatetimeInput, name: 'TestDatetimeInput' },
  { component: TestDropdown, name: 'TestDropdown' },
  { component: TestEmpty, name: 'TestEmpty' },
  { component: TestForm, name: 'TestForm' },
  { component: TestGlobalFooter, name: 'TestGlobalFooter' },
  { component: TestListHeader, name: 'TestListHeader' },
  { component: TestLoading, name: 'TestLoading' },
  { component: TestModals, name: 'TestModals' },
  { component: TestPagination, name: 'TestPagination' },
  { component: TestProfileImage, name: 'TestProfileImage' },
  { component: TestSkeleton, name: 'TestSkeleton' },
  { component: TestTag, name: 'TestTag' },
  { component: TestToggle, name: 'TestToggle' },
];

const TEST_GROUPS = [
  { title: 'Stage Common Component Test', items: STAGE_TESTS },
];

export default DevPage;
