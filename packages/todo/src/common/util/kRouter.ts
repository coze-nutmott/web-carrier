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

/**
 * 주요 포인트
 * 모든 라우팅은 kRouter 를 이용합니다
 * 그리고 모든 페이지는 위에 있는 Page enum 에 등록해야 합니다
 * 라우팅 시 우리는 IPageInfo 정보를 입력하게 됩니다
 *   (Anchor 컴포넌트, kRouter.routeTo 사용하는 부분 참고)
 * 쿼리 파라미터가 없는 페이지는 IPageInfoNoQuery 에 등록하고, 있는 페이지는 별도 타입을 정의해서 IPageInfo 에 추가합니다
 */
export const kRouter = new KRouter<Page, IPageInfo>({
  defaultPageInfo: { page: Page.Main },
  defaultBackPageInfo: {},
  pageMap: Page,
});
