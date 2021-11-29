import KRouter from 'shared/util/sharedKRouter';

export enum Page {
  Main = '',
  Genre = '[genre]',
  Search = 'search',
  Library = 'library/bookmarks',
  Dev = 'dev',
}

export type IPageInfo = IPageInfoNoQuery | IPageGenre;
interface IPageGenre {
  page: Page.Genre;
  genre: string;
}

interface IPageInfoNoQuery {
  page: Page.Main | Page.Search | Page.Library | Page.Dev;
}

export const kRouter = new KRouter<Page, IPageInfo>({
  defaultPageInfo: { page: Page.Main },
  defaultBackPageInfo: {},
  pageMap: Page,
});
