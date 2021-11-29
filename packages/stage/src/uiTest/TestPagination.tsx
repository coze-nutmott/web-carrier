import Pagination from 'common/component/Pagination';
import Flex from 'common/component/Flex';
import TestItem from 'shared/uiTest/component/TestItem';

export default function TestPagination() {
  const totalPages = 10;
  const page = 0;
  return (
    <TestItem title="Pagination">
      <Flex className="justify-center mt-28">
        <Pagination totalPages={totalPages} page={page} />
      </Flex>
    </TestItem>
  );
}
