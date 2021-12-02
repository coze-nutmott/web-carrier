import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

import { Text } from 'common/component/shared';
import Event from 'event/container/Event';
import { IEvent, EventContext } from 'event/state/context';
import { useRouter } from 'next/router';

import useQueryParameter, {
  getStringOptional,
  getStringRequired,
} from 'shared/hook/useQueryParameter';
import { getNowIsoString } from 'shared/util/date';

type IProps = IEvent;

interface IQuery {
  id: string;
  requestedDt: string;
}

const EventPage: NextPage<IProps> = props => {
  const router = useRouter();
  /**
   * 주요 포인트
   * 쿼리 파라미터는 useQueryParameter 를 통해서 사용합니다
   * useQueryParameter 의 한 가지 단점은 서버 측에서는 무조건 undefined 라는 것입니다
   * 단, pathname 에 있는 파라미터는 서버 측에서도 값이 있습니다
   * ex) /event/abc?requested_dt=1234 => 서버 측에서 id 는 값이 있고, requestedDt 는 undefined
   */
  const param = useQueryParameter<IQuery>([
    { name: 'id', getter: getStringRequired },
    { name: 'requestedDt', getter: getStringOptional },
  ]);
  if (router.isFallback) {
    return <Text variant="s16_medium_blue">Loading...</Text>;
  }
  return (
    <EventContext.Provider value={props}>
      {param.isValid && <Event requestedDt={param.query.requestedDt} />}
    </EventContext.Provider>
  );
};

/**
 * 주요 포인트
 * 보통은 getStaticProps 로도 충분하지만 id 개수가 동적인 경우(작품홈)에는 getStaticPaths 를 사용합니다
 * revalidate 로 갱신 주기를 설정합니다
 * 렌더링 시에는 isFallback 일 때 로딩 처리를 해줍니다
 */
export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  const data = (await new Promise(res => {
    setTimeout(() => {
      const id = params?.id;
      res({
        id: typeof id === 'string' ? id : '',
        status: 'ok',
        receivedDt: getNowIsoString(),
      });
    }, 100);
  })) as IProps;

  return {
    props: data,
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default EventPage;
