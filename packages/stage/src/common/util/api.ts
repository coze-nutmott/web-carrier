import axios, { Method } from 'axios';
import { ACCESS_TOKEN_KEY } from 'common/constant';
import { IncomingMessage, OutgoingMessage } from 'http';
import Cookies from 'js-cookie';
import { QueryFunctionContext } from 'react-query';
import { API_HOST } from 'shared/common/constant';
import { pushLog } from 'shared/util/debug';

function getDefaultHeader(): Record<string, string> | undefined {
  const token = Cookies.get(ACCESS_TOKEN_KEY);
  return {
    Accept: 'application/vnd.stage.v1+json',
    ...(token ? { Authorization: token } : {}),
  };
}

export default function callApi<T>({
  url,
  apiHost = API_HOST,
  method = 'get',
  headers = {},
  withCredentials = apiHost === API_HOST,
  params,
  data,
  req,
  res,
  getter = res => res,
}: {
  url: string;
  apiHost?: string;
  method?: Method;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  params?: { [key: string]: any } | URLSearchParams;
  data?: object | string;
  req?: IncomingMessage;
  res?: OutgoingMessage;
  getter?: (data: any) => T;
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

  const isSameHost = apiHost === API_HOST;

  return axios({
    url,
    method,
    baseURL: apiHost,
    headers: isSameHost
      ? {
          ...headers,
          ...getDefaultHeader(),
        }
      : headers,
    params,
    withCredentials,
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

export function queryFn<T>({ queryKey }: QueryFunctionContext) {
  return callApi<T>({ url: queryKey.join('') });
}
