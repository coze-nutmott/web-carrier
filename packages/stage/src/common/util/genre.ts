import { ROUTES_MAP } from 'common/constant';
import { ISubGenre, IRoute } from 'common/type';

export function findGenreFromId(genreId?: number): IRoute | undefined {
  return ROUTES_MAP.find(map => map.id === genreId);
}

export function findActiveSubGenres(subGenres?: ISubGenre[]): ISubGenre[] {
  return subGenres ? subGenres.filter(el => el.active) : [];
}
