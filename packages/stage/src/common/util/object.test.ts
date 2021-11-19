import { cleanMerge } from 'common/util/object';

describe('cleanMerge', () => {
  it('merge plain object', () => {
    const origin = {
      id: 1,
      title: '나 혼자만 레벨업',
    };
    const source = {
      title: '같이 레벨업',
    };
    const result = {
      id: 1,
      title: '같이 레벨업',
    };
    expect(cleanMerge(origin, source)).toEqual(result);
  });
  it('merge 2 depth object', () => {
    const origin = {
      id: 1,
      title: '나 혼자만 레벨업',
      author: { name: 'kiwi' },
    };
    const source = {
      title: '같이 레벨업',
      author: { name: 'esme' },
    };
    const result = {
      id: 1,
      title: '같이 레벨업',
      author: { name: 'esme' },
    };
    expect(cleanMerge(origin, source)).toEqual(result);
  });
});
