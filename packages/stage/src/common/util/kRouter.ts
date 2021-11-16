import KRouter from 'shared/util/sharedKRouter';

export enum Page {
  Main = '',
  NewTodo = 'new-todo',
  Detail = 'detail/[id]',
  Event = 'event/[id]',
}

export type IPageInfo = IPageInfoNoQuery | IPageDetail | IPageEvent;
interface IPageDetail {
  page: Page.Detail;
  id: number;
}
interface IPageEvent {
  page: Page.Event;
  id: string;
  requestedDt: string;
}

interface IPageInfoNoQuery {
  page: Page.Main | Page.NewTodo;
}

export const kRouter = new KRouter<Page, IPageInfo>({
  defaultPageInfo: { page: Page.Main },
  defaultBackPageInfo: {},
  pageMap: Page,
});
