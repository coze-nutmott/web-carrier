import BookmarkButton from 'common/component/BookmarkButton';
import { useState } from 'react';
import TestItem from 'shared/uiTest/component/TestItem';

export default function TestBookmarkButton() {
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <TestItem title="BookmarkButton">
      <BookmarkButton
        bookmarked={bookmarked}
        onClick={() => setBookmarked(_ => !_)}
      />
    </TestItem>
  );
}
