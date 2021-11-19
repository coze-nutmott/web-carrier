import { isReservedEpisode } from 'common/util/episode';

describe('isReservedEpisode', () => {
  it('isReservedEpisode is true', () => {
    const input = { published: false, publishedAt: '9999-09-01T12:00:00' };
    const output = true;
    expect(isReservedEpisode(input)).toEqual(output);
  });

  it('발행일이 미래지만, 이미 발행되어서 false', () => {
    const input = { published: true, publishedAt: '9999-09-01T12:00:00' };
    const output = false;
    expect(isReservedEpisode(input)).toEqual(output);
  });

  it('발행 안되었지만, 발행일이 과거라서 false', () => {
    const input = { published: false, publishedAt: '2001-09-01T12:00:00' };
    const output = false;
    expect(isReservedEpisode(input)).toEqual(output);
  });
});
