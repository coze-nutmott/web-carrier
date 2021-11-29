import TestItem from 'shared/uiTest/component/TestItem';
import Meta from 'common/component/Card/Meta';
import { INickname } from 'common/type';

const NICKNAME_KIWI: INickname = {
  id: 1,
  name: 'KIWI',
  createdAt: '2020-01-01',
  type: 'USER',
  withdrawal: false,
};

const META = {
  nickname: NICKNAME_KIWI,
  viewCount: 10_000,
  favoriteCount: 1_000,
  publishedEpisodeCount: 100,
  genreName: '판타지',
};

export default function TestMeta() {
  return (
    <TestItem title="Meta">
      <Meta {...META} />
    </TestItem>
  );
}
