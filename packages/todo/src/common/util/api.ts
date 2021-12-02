import { IncomingMessage, OutgoingMessage } from 'http';

import axios, { Method } from 'axios';

import { API_HOST } from 'shared/common/constant';
import { pushLog } from 'shared/util/debug';

export default function callApi<T>({
  url,
  apiHost = API_HOST,
  method = 'get',
  headers = {},
  params,
  data,
  req,
  res,
  getter,
}: {
  url: string;
  apiHost?: string;
  method?: Method;
  headers?: Record<string, string>;
  params?: { [key: string]: any } | URLSearchParams;
  data?: object | string;
  req?: IncomingMessage;
  res?: OutgoingMessage;
  getter: (data: any) => T;
}): Promise<T> {
  pushLog({ msg: `callApi ${url}`, params });
  if (req) {
    // 아래는 SSR 을 위한 코드
    if (req.headers.cookie) {
      headers.cookie = req.headers.cookie;
    }
    if (req.headers['user-agent']) {
      headers['user-agent'] = req.headers['user-agent'];
    }
  }

  return axios({
    url,
    method,
    baseURL: apiHost,
    headers,
    params,
    withCredentials: apiHost === API_HOST,
    data,
  }).then(({ headers, data }) => {
    if (res) {
      // 아래는 SSR 을 위한 코드
      const setCookie = headers['set-cookie'];
      setCookie && res.setHeader('set-cookie', setCookie);
    }
    return getter(data);
  });
}
