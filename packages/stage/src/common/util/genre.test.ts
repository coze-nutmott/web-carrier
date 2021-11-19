import { findActiveSubGenres, findGenreFromId } from 'common/util/genre';
import { ISubGenre } from 'common/type';

describe('findGenreFromId', () => {
  it('findGenreFromId', () => {
    const input = 1;
    const output = {
      id: 1,
      text: '판타지',
      url: 'fantasy',
      subRoutes: [
        {
          id: 1,
          text: '작품',
          url: 'novels',
          subGenreIds: [1],
        },
      ],
    };
    expect(findGenreFromId(input)).toEqual(output);
  });
  it('fail to findGenreFromId', () => {
    const input = 10;
    const output = undefined;
    expect(findGenreFromId(input)).toEqual(output);
  });
  it('no input', () => {
    const output = undefined;
    expect(findGenreFromId()).toEqual(output);
  });
});

describe('findActiveSubGenres', () => {
  it('findActiveSubGenres', () => {
    const input = [
      { id: 1, genreId: 1, name: '', createdAt: '', active: true },
      { id: 2, genreId: 1, name: '', createdAt: '', active: false },
      { id: 3, genreId: 1, name: '', createdAt: '', active: true },
    ];
    const output = [
      { id: 1, genreId: 1, name: '', createdAt: '', active: true },
      { id: 3, genreId: 1, name: '', createdAt: '', active: true },
    ];
    expect(findActiveSubGenres(input)).toEqual(output);
  });
  it('empty result of findActiveSubGenres', () => {
    const input = [
      { id: 1, genreId: 1, name: '', createdAt: '', active: false },
      { id: 2, genreId: 1, name: '', createdAt: '', active: false },
      { id: 3, genreId: 1, name: '', createdAt: '', active: false },
    ];
    const output: ISubGenre[] = [];
    expect(findActiveSubGenres(input)).toEqual(output);
  });
  it('empty input of findActiveSubGenres', () => {
    const output: ISubGenre[] = [];
    expect(findActiveSubGenres()).toEqual(output);
  });
});
