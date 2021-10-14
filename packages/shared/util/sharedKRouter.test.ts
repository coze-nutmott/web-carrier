import KRouter from './sharedKRouter';

describe('getQueryStr', () => {
  it('1 query', () => {
    expect(kRouter.getQueryStr({ aa: 1 })).toBe('aa=1');
  });
  it('2 query', () => {
    expect(kRouter.getQueryStr({ aa: 1, bb: 2 })).toBe('aa=1&bb=2');
  });
  it('ignore undefined, null, empty string', () => {
    expect(
      kRouter.getQueryStr({
        aa: 1,
        bb: 2,
        cc: undefined,
        dd: null,
        ee: 0,
        ff: '',
      }),
    ).toBe('aa=1&bb=2&ee=0');
  });
});

describe('getQueryObject', () => {
  it('empty query', () => {
    expect(kRouter.getQueryObject('')).toEqual({});
  });
  it('one query', () => {
    expect(kRouter.getQueryObject('a=1')).toEqual({ a: '1' });
  });
  it('two query', () => {
    expect(kRouter.getQueryObject('a=1&b=2')).toEqual({ a: '1', b: '2' });
  });
  it('without equal', () => {
    expect(kRouter.getQueryObject('a=1&ttt&b=2')).toEqual({ a: '1', b: '2' });
  });
});

describe('parseParams', () => {
  it('dynamic routing인 경우', () => {
    expect(
      kRouter.parseParams({
        page: Page.Content,
        id: 123,
        tab: 'tab1',
      }),
    ).toEqual({
      pathParams: { id: 123 },
      queryParams: { tab: 'tab1' },
    });
  });
  it('dynamic routing이 아닌 경우', () => {
    expect(kRouter.parseParams({ page: Page.Event, eventId: 3 })).toEqual({
      pathParams: {},
      queryParams: { eventId: 3 },
    });
  });
  it('dynamic routing(catch all route)인 경우', () => {
    expect(
      kRouter.parseParams({
        page: Page.Home,
        home: 'ranking',
      }),
    ).toEqual({
      pathParams: { home: 'ranking' },
      queryParams: {},
    });
  });
});

describe('getInternalUrl', () => {
  it('dynamic routing이 아닌 경우 쿼리 파라미터를 모두 연결해서 반환한다.', () => {
    expect(kRouter.getInternalUrl({ page: Page.Event, eventId: 3 })).toBe(
      `/${Page.Event}?event_id=3`,
    );
  });
  it('dynamic routing인 경우 path의 파라미터를 제외하고 쿼리 파라미터를 구성한다.', () => {
    expect(
      kRouter.getInternalUrl({
        page: Page.Content,
        id: 19918156,
        tab: 'tab1',
      }),
    ).toBe(`/${Page.Content}?tab=tab1`);
  });
  it('dynamic routing(catch all route)인 경우 path의 파라미터를 제외하고 쿼리 파라미터를 구성한다', () => {
    expect(kRouter.getInternalUrl({ page: Page.Home, home: 'ranking' })).toBe(
      '/[[...home]]',
    );
  });
});

describe('getUrl', () => {
  it('query가 있으면 ?를 붙인다', () => {
    expect(kRouter.getUrl({ page: Page.Event, eventId: 3 })).toBe(
      '/event?event_id=3',
    );
  });
  it('query가 없으면 ?를 안붙인다', () => {
    expect(kRouter.getUrl({ page: Page.Event })).toBe('/event');
  });
  it('query가 없으면 ?를 안붙인다 (catch all route)', () => {
    expect(kRouter.getUrl({ page: Page.Home })).toBe('/');
  });
  it('dynamic routing인 경우', () => {
    expect(kRouter.getUrl({ page: Page.Content, id: 123 })).toBe(
      '/content/123',
    );
  });
  it('dynamic routing(catch all route)인 경우', () => {
    expect(kRouter.getUrl({ page: Page.Home, home: 'ranking' })).toBe(
      `/ranking`,
    );
  });
});

describe('getInternalUrlFromString', () => {
  it('static url', () => {
    expect(kRouter.getInternalUrlFromString('/event')).toBe('/' + Page.Event);
  });
  it('catch all route 1', () => {
    expect(kRouter.getInternalUrlFromString('/')).toBe('/' + Page.Home);
  });
  it('catch all route 2', () => {
    expect(kRouter.getInternalUrlFromString(`/ranking`)).toBe('/' + Page.Home);
  });
  it('dynamic url', () => {
    expect(kRouter.getInternalUrlFromString('/content/111')).toBe(
      '/' + Page.Content,
    );
  });
  it('dynamic url: 하위 path', () => {
    expect(kRouter.getInternalUrlFromString('/content/111/notice')).toBe(
      '/' + Page.ContentNotice,
    );
  });
  it('dynamic url with query', () => {
    expect(kRouter.getInternalUrlFromString('/content/111?tab=tab1')).toBe(
      `/${Page.Content}?tab=tab1`,
    );
  });
});

describe('_needReplace', () => {
  it('다른 path인 경우', () => {
    expect(
      kRouter._needReplace({
        url: '/ranking',
        prevPathname: '/event',
      }),
    ).toBe(false);
  });
  it('동일 path인 경우', () => {
    expect(
      kRouter._needReplace({
        url: '/event?html=abc',
        prevPathname: '/event',
      }),
    ).toBe(true);
  });
  it('subpath인 경우', () => {
    expect(
      kRouter._needReplace({
        url: '/content/Honey-Blood/19/second',
        prevPathname: '/content/Honey-Blood/19',
      }),
    ).toBe(false);
  });
  it('시작이 동일한 다른 path인 경우', () => {
    expect(
      kRouter._needReplace({
        url: '/event-test',
        prevPathname: '/event?title=abc',
      }),
    ).toBe(false);
  });
  it('dynamic routing인 경우', () => {
    expect(
      kRouter._needReplace({
        url: '/content/1/',
        prevPathname: '/content/2',
      }),
    ).toBe(true);
  });
  it('dynamic routing(catch all route)인 경우', () => {
    expect(
      kRouter._needReplace({
        url: `/ranking`,
        prevPathname: '/my-page',
      }),
    ).toBe(true);
  });
});

describe('getPage', () => {
  it('PageInfo 타입', () => {
    expect(kRouter.getPage({ page: Page.Home })).toBe(Page.Home);
  });
  it('PageInfo 타입, dynamic 라우팅 페이지', () => {
    expect(
      kRouter.getPage({
        page: Page.Content,
        id: 2192,
        tab: 'tab1',
      }),
    ).toBe(Page.Content);
  });
  it('PageInfo 타입, dynamic 라우팅(catch all route) 페이지', () => {
    expect(
      kRouter.getPage({
        page: Page.Home,
        home: 'ranking',
      }),
    ).toBe(Page.Home);
  });
  it('string 타입', () => {
    expect(kRouter.getPage('')).toBe(Page.Home);
  });
  it('string 타입, 파라미터 포함', () => {
    expect(kRouter.getPage('/event?title=abc')).toBe(Page.Event);
  });
  it('string 타입, dynamic 라우팅', () => {
    expect(kRouter.getPage('/content/2192')).toBe(Page.Content);
  });
  it('string 타입, dynamic 라우팅, 파라미터 포함', () => {
    expect(kRouter.getPage('/content/2192?tab=event')).toBe(Page.Content);
  });
  it('string 타입, dynamic 라우팅(catch all route)', () => {
    expect(kRouter.getPage(`/ranking`)).toBe(Page.Home);
  });
});

enum Page {
  Event = 'event',
  Home = '[[...home]]',
  Content = 'content/[id]',
  ContentNotice = 'content/[id]/notice',
}
const kRouter = new KRouter<Page, any>({
  defaultPageInfo: { page: Page.Event },
  defaultBackPageInfo: {},
  pageMap: Page,
});
