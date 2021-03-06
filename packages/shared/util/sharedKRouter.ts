import { ServerResponse } from 'http';

import snakeCase from 'lodash/snakeCase';
// eslint-disable-next-line kakaoent-plugin/no-next-router
import router from 'next/router';

import { WEB_HOST, IS_CLIENT } from '../common/constant';
import { callIfFunc, getKeys } from '../util/common';
import { pushLog } from '../util/debug';

export let sharedKRouter: KRouter<any, any>;
export default class KRouter<
  Page extends string,
  PageInfo extends { page: Page },
> {
  currentHistoryPosition = 0;
  observers: IRouteCancelObserver<PageInfo, Page>[] = [];

  defaultPageInfo: PageInfo;
  defaultBackPageInfo: IBackPageInfo<PageInfo, Page>;
  dynamicUrlPartsList: string[][];
  pageMap: { [key: string]: string };
  constructor({
    defaultPageInfo,
    defaultBackPageInfo,
    pageMap,
  }: {
    defaultPageInfo: PageInfo;
    defaultBackPageInfo: IBackPageInfo<PageInfo, Page>;
    pageMap: { [key: string]: string };
  }) {
    this.defaultPageInfo = defaultPageInfo;
    this.defaultBackPageInfo = defaultBackPageInfo;
    const dynamicUrlList = Object.values(pageMap).filter(item =>
      item.includes('['),
    );
    this.dynamicUrlPartsList = dynamicUrlList.map(item => item.split('/'));
    this.pageMap = pageMap;
    sharedKRouter = this;
  }

  routeTo(...params: Parameters<typeof this.getRouteAction>) {
    pushLog({ msg: 'call routeTo', params });
    const routeAction = this.getRouteAction(...params);

    switch (routeAction.type) {
      case 'cancel':
        pushLog({ msg: 'routeTo canceled' });
        break;
      case 'replace':
        pushLog({ msg: 'routeTo replace' });
        router.replace(routeAction.url, routeAction.asUrl, routeAction.options);
        break;
      case 'push':
        pushLog({ msg: 'routeTo push' });
        router.push(routeAction.url, routeAction.asUrl, routeAction.options);
        break;
      case 'external':
        pushLog({ msg: 'routeTo external link' });
        window.open(routeAction.url);
        break;
    }
  }

  getRouteAction(
    info: PageInfo | string,
    option: IRouteToOption = {},
  ): RouteAction {
    const { isReplace, isShallow = true, isNotCancelable } = option;

    const page = this.getPage(info);
    if (!isNotCancelable && this.getIsRouteCancel({ info, option, page })) {
      return { type: 'cancel' };
    }
    const url = this.getInternalUrl(info);
    const asUrl = typeof info === 'string' ? info : this.getUrl(info);

    const isExternal =
      typeof info === 'string' &&
      info.startsWith('http') &&
      !info.startsWith(WEB_HOST);

    if (isExternal) {
      return { type: 'external', url: asUrl };
    } else {
      const _isReplace =
        isReplace !== undefined
          ? isReplace
          : this._needReplace({
              url: asUrl,
              prevPathname: window.location.pathname,
            });
      if (_isReplace) {
        return {
          type: 'replace',
          url,
          asUrl,
          options: {
            shallow: isShallow,
            pos: this.currentHistoryPosition,
          },
        };
      } else {
        this.currentHistoryPosition++;
        return {
          type: 'push',
          url,
          asUrl,
          options: { pos: this.currentHistoryPosition },
        };
      }
    }
  }

  routeBack(params?: Parameters<typeof this.getRouteBackAction>[0]) {
    pushLog({ msg: 'call routeBack', params });
    const routeBackAction = this.getRouteBackAction(
      params,
      this.getCurrentPage(),
    );

    switch (routeBackAction.type) {
      case 'cancel':
        pushLog({ msg: 'routeBack canceled' });
        break;
      case 'back':
        pushLog({ msg: 'routeBack currentHistoryPosition > 0' });
        router.back();
        break;
      case 'replace':
        pushLog({ msg: 'routeBack currentHistoryPosition === 0' });
        router.replace(routeBackAction.url, routeBackAction.asUrl, {
          pos: routeBackAction.pos,
        } as any); // comment-1 ??????
        break;
    }
  }

  getRouteBackAction(
    {
      ignoreIsRouteCancel,
    }: {
      ignoreIsRouteCancel?: boolean;
    } = {},
    currentClientPage?: Page,
  ): RouteBackAction {
    if (
      !ignoreIsRouteCancel &&
      this.getIsRouteCancel({
        currentHistoryPosition: this.currentHistoryPosition,
        relativePos: 1,
      })
    ) {
      return { type: 'cancel' };
    }

    if (this.currentHistoryPosition > 0) {
      this.currentHistoryPosition--;
      return { type: 'back' };
    } else {
      const { return_url } = this.getQueryObjectFromLocation();
      if (return_url && !return_url.startsWith(WEB_HOST)) {
        return {
          type: 'replace',
          url: return_url,
          asUrl: return_url,
          pos: this.currentHistoryPosition,
        };
      }

      const backPageInfo =
        (currentClientPage &&
          callIfFunc(this.defaultBackPageInfo[currentClientPage])) ||
        this.defaultPageInfo;
      const url = this.getInternalUrl(backPageInfo);
      const asUrl = this.getUrl(backPageInfo);
      return { type: 'replace', url, asUrl, pos: this.currentHistoryPosition };
    }
  }

  isMustCancel = false;
  processBeforePopState(state: {
    url: string;
    as: string;
    options: { pos?: number; shallow?: boolean };
  }) {
    const { pos } = state.options;
    const relativePos = this.currentHistoryPosition - (pos || 0);
    pushLog({
      msg: 'call processBeforePopState',
      params: { isMustCancel: this.isMustCancel, pos, relativePos },
    });
    if (
      this.isMustCancel ||
      this.getIsRouteCancel({
        currentHistoryPosition: this.currentHistoryPosition,
        relativePos,
      })
    ) {
      pushLog({ msg: 'processBeforePopState cancel' });
      /**
       * ????????? false??? ???????????? next??? ???????????? ??????????????? url??? ????????????
       * ????????? url??? ???????????? ?????? go??? ????????????
       * history.go ?????? ????????? processBeforePopState ??? ????????????
       * ????????? isMustCancel??? ???????????? go??? ??? ???????????? ????????? ??????
       */
      if (!this.isMustCancel) {
        history.go(relativePos);
      }
      this.isMustCancel = !this.isMustCancel;
      return false;
    } else {
      this.currentHistoryPosition = pos === undefined ? 0 : pos;
      /**
       * shallow ????????? state??? ???????????? popState????????? ????????? ????????????
       * ????????? shallow true??? ????????? ????????? popState ????????? true??? ???????????? ????????? ??? ??? ??????
       * ????????? popState ????????? ????????? shallow false??? ??????????????? ??????
       * (????????? state ??????????????? mutable????????? ???????????? immutable??? ???????????? ?????? ????????? ????????????)
       */
      state.options.shallow && (state.options.shallow = false);
      return true;
    }
  }

  _needReplace({ url, prevPathname }: { url: string; prevPathname: string }) {
    return (
      this.getPage(url.replace(REGEX_TRAILING_SLASH, '')) ===
      this.getPage(prevPathname.replace(REGEX_TRAILING_SLASH, ''))
    );
  }

  parseParams(pageInfo: PageInfo) {
    const { page, ...rest } = pageInfo;
    const pathParams: IQuery = {};
    const queryParams: IQuery = rest;

    page
      .replace(REGEX_ALL_ROUTE, '[$1]')
      .split('/')
      .forEach((path: string) => {
        if (path.startsWith('[') && path.endsWith(']')) {
          const param = path.substring(1, path.length - 1);
          if (queryParams[param]) {
            pathParams[param] = queryParams[param];
          }
          delete queryParams[param];
        }
      });

    return { pathParams, queryParams };
  }

  getInternalUrl(pageInfo: PageInfo | string) {
    if (typeof pageInfo === 'string') {
      return this.getInternalUrlFromString(pageInfo);
    } else {
      const { queryParams } = this.parseParams(pageInfo);
      const queryStr = this.getQueryStr(queryParams, true);
      return `/${pageInfo.page}${queryStr ? '?' : ''}${queryStr}`;
    }
  }

  getInternalUrlFromString(input: string) {
    const inputSplits = input.split('?');
    const query = inputSplits[1] || '';
    const path = inputSplits[0].substr(1);
    // [[...home]]??? depth??? ????????? path?????? ??? ????????????.
    // dynamic??? ???????????? ????????? path??? ????????? ?????? ????????????.
    if (getKeys(this.pageMap).some(key => this.pageMap[key] === path)) {
      return input;
    }
    const inputParts = path.split('/');
    for (const parts of this.dynamicUrlPartsList) {
      if (inputParts.length === parts.length) {
        let isPass = true;
        for (let i = 0; i < parts.length; i++) {
          if (parts[i][0] !== '[' && parts[i] !== inputParts[i]) {
            isPass = false;
            break;
          }
        }
        if (isPass) {
          return `/${parts.join('/')}${query ? '?' : ''}${query}`;
        }
      }
    }
    return input;
  }

  getUrl(pageInfo: PageInfo) {
    const { page } = pageInfo;
    const { pathParams, queryParams } = this.parseParams(pageInfo);
    const queryStr = this.getQueryStr(queryParams, true);
    return `/${this.getPathname(page, pathParams)}${
      queryStr ? '?' : ''
    }${queryStr}`;
  }

  getPathname(uri: string, params: IQuery) {
    const paramKeys = Object.keys(params);
    if (REGEX_ALL_ROUTE.test(uri) && paramKeys.length === 0) return '';

    uri = uri.replace(REGEX_ALL_ROUTE, '[$1]');
    return paramKeys.reduce(
      (pathname, key) => pathname.replace(`[${key}]`, params[key]),
      uri,
    );
  }

  getQueryStr(query: IQuery, needSnakeCase: boolean = false) {
    return Object.keys(query)
      .filter(key => query[key] || query[key] === 0)
      .map(key => `${needSnakeCase ? snakeCase(key) : key}=${query[key]}`)
      .join('&');
  }

  redirectTo({
    pageInfo = this.defaultPageInfo,
    res,
  }: {
    pageInfo?: string | PageInfo;
    res?: ServerResponse;
  }) {
    const url = typeof pageInfo === 'string' ? pageInfo : this.getUrl(pageInfo);
    if (res) {
      res.writeHead(302, {
        Location: encodeURI(url),
      });
      res.end();
    } else {
      /**
       * comment-1
       * ??????????????? shallow ??? ???????????????, ???????????? pushState ??? ???????????? ????????? ????????????
       * ????????? ????????? ?????? processBeforePopState ??? options ??? ????????????
       * Next.js ????????? ??????????????? ????????? ????????? ????????? ???????????? ?????? ?????? ?????? ??? ???????????????
       */
      router.replace(url, url, { pos: this.currentHistoryPosition } as any);
    }
  }

  getCurrentUrl() {
    return window.location.origin + window.location.pathname;
  }

  getQueryObjectFromLocation() {
    if (location.search) {
      const query = location.search.substr(1);
      return this.getQueryObject(query);
    } else {
      return {};
    }
  }

  getQueryObject(query: string) {
    const result: { [key: string]: string } = {};
    query.split('&').forEach(item => {
      const parts = item.split('=');
      const key = parts[0];
      const value = parts[1];
      if (key && value) {
        result[key] = decodeURIComponent(value);
      }
    });
    return result;
  }

  getRouterQueryObject() {
    return router.query;
  }

  getCurrentPage(): Page {
    return router.route.substr(1) as Page;
  }

  getPage(pageInfo: PageInfo | string): Page {
    if (typeof pageInfo === 'string') {
      return this.getInternalUrlFromString(pageInfo)
        .split('?')[0]
        .substr(1) as Page;
    } else {
      return pageInfo.page;
    }
  }

  prefetch(page: Page) {
    router.prefetch('/' + page);
  }

  getQueryValue(param: string) {
    return IS_CLIENT ? this.getQueryObjectFromLocation()[param] : undefined;
  }

  getUrlWithFilteredQuery(url: string, predicate: (query: string) => boolean) {
    const [pathname, query] = url.split('?');
    if (query) {
      const filteredQuery = query.split('&').filter(predicate).join('&');
      return `${pathname}${filteredQuery ? '?' + filteredQuery : ''}`;
    } else {
      return router.asPath;
    }
  }

  subscribeRouteCancel(observer: IRouteCancelObserver<PageInfo, Page>) {
    this.observers.push(observer);
    return () => this.unsubscribeRouteCancel(observer);
  }
  unsubscribeRouteCancel(observer: IRouteCancelObserver<PageInfo, Page>) {
    this.observers = this.observers.filter(item => item !== observer);
  }

  getIsRouteCancel(
    params: IRouteToParams<PageInfo, Page> | IRouteCancelPosParams,
  ) {
    const letItGo = () => {
      if (!this.getIsRouteTo(params)) {
        history.go(-params.relativePos);
      } else {
        this.routeTo(params.info, params.option);
      }
    };
    return (
      this.observers.reduce(
        (acc, ob) => (ob(letItGo, params) ? acc + 1 : acc),
        0,
      ) > 0
    );
  }

  getIsRouteTo(
    params: IRouteToParams<PageInfo, Page> | IRouteCancelPosParams,
  ): params is IRouteToParams<PageInfo, Page> {
    return 'page' in params;
  }
}

const REGEX_TRAILING_SLASH = /\/$/;
const REGEX_ALL_ROUTE = /\[\[...(.+)\]\]/;

interface IRouteToOption {
  isReplace?: boolean;
  isShallow?: boolean;
  isNotCancelable?: boolean;
}

type RouteAction =
  | { type: 'cancel' }
  | { type: 'replace' | 'push'; url: string; asUrl: string; options?: object }
  | { type: 'external'; url: string };

type RouteBackAction =
  | { type: 'cancel' | 'back' }
  | { type: 'replace'; url: string; asUrl: string; pos: number };

interface IQuery {
  [key: string]: any;
}

type IBackPageInfo<PageInfo, Page extends string> = {
  [key in Page]?: PageInfo | (() => PageInfo);
};

// ????????? ????????? ????????? true??? ????????????
type IRouteCancelObserver<PageInfo, Page extends string> = (
  letItGo: () => void,
  params: IRouteToParams<PageInfo, Page> | IRouteCancelPosParams,
) => boolean;

interface IRouteToParams<PageInfo, Page extends string> {
  info: PageInfo | string;
  page: Page;
  option: IRouteToOption;
}

interface IRouteCancelPosParams {
  currentHistoryPosition: number;
  relativePos: number;
}
