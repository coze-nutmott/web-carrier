import { IS_CLIENT, IS_REAL } from '../common/constant';

export interface ILog {
  msg: string;
  params?: string;
  type: 'info' | 'error';
}
const logs: ILog[] = [];

export function pushLog({
  msg,
  params,
  type = 'info',
}: {
  msg: string;
  params?: object;
  type?: ILog['type'];
}) {
  // isSome && pushLog(...) 코드는 바벨 플러그인에서 제거되지 않으므로 ENV_NAME 체크를 넣었다
  if (IS_CLIENT && !IS_REAL) {
    const log = {
      msg,
      params: params ? JSON.stringify(params) : undefined,
      type,
    };
    logs.push(log);
    if (logs.length > 1000) {
      logs.splice(0, 500);
    }
    if (type === 'info') {
      console.info(log);
    } else {
      console.error(log);
    }
  }
}

export function getLogs(type?: ILog['type']) {
  if (type) {
    return logs.filter(item => item.type === type);
  } else {
    return logs;
  }
}
