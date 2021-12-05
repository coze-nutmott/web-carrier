import KRouter from 'shared/util/sharedKRouter';

export enum Page {
  Main = '',
  Genre = '[genre]',
  Search = 'search',
  Library = 'library/bookmarks',
  Dev = 'dev',
  Nickname = 'nickname',
  NicknameVerify = 'nickname/verify/[id]',
}

export type IPageInfo = IPageInfoNoQuery | IPageGenre | IPageNicknameVerify;
interface IPageGenre {
  page: Page.Genre;
  genre: string;
}

interface IPageNicknameVerify {
  page: Page.NicknameVerify;
  id: number | undefined;
}

interface IPageInfoNoQuery {
  page: Page.Main | Page.Search | Page.Library | Page.Dev | Page.Nickname;
}

export const kRouter = new KRouter<Page, IPageInfo>({
  defaultPageInfo: { page: Page.Main },
  defaultBackPageInfo: {},
  pageMap: Page,
});
