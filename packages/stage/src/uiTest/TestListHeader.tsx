import ListHeader from 'common/component/ListHeader';
import Select from 'common/component/Select';
import { useState } from 'react';
import TestItem from 'shared/uiTest/component/TestItem';

const SORT_OPTIONS = [
  { text: '좋아요 순', value: 'likes' },
  { text: '최신 순', value: 'id' },
];

export default function TestListHeader() {
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  return (
    <TestItem title="ListHeader">
      <ListHeader heading="댓글" totalElements={10}>
        <Select
          options={SORT_OPTIONS}
          defaultValue={sort}
          onChange={setSort}
          withIcon
          sortIconType="updown"
        />
      </ListHeader>
    </TestItem>
  );
}
