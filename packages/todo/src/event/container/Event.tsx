import React, { useContext } from 'react';

import { Text, TextButton } from 'common/component/shared';
import { kRouter } from 'common/util/kRouter';
import User from 'event/component/User';
import { EventContext } from 'event/state/context';
import { useServerUser } from 'event/state/server';

import { kAlert } from 'shared/component/KAlert';
import { getNowIsoString } from 'shared/util/date';

interface IProps {
  requestedDt: string;
}

export default function Event({ requestedDt }: IProps) {
  const { id, status, receivedDt } = useContext(EventContext);
  const serverUser = useServerUser('landvibe');
  /**
   * 주요 포인트
   * 모든 텍스트는 Text 컴포넌트를 통해 렌더링 합니다
   * 텍스트를 포함하는 버튼은 TextButton 컴포넌트를 사용합니다
   */
  return (
    <div>
      <Text variant="s16_regular_black">id: {id}</Text>
      <Text variant="s16_regular_black">status: {status}</Text>
      <Text variant="s16_regular_black">receivedDt: {receivedDt}</Text>
      <Text variant="s16_regular_black">requestedDt: {requestedDt}</Text>
      {serverUser.isLoading && (
        <Text variant="s16_regular_black">user is loading...</Text>
      )}
      {serverUser.data && <User user={serverUser.data} />}
      <TextButton
        variant="btn_black_white"
        textVariant="s16_regular_white"
        onClick={() => {
          /**
           * 주요 포인트
           * alert 이 필요한 경우에는 kAlert 을 사용합니다
           * alert 이 뜬 상태에서 뒤로가기를 하면 자동으로 alert 이 닫힙니다
           *   - 단, 현재 페이지가 첫 페이지라면 동작하지 않습니다 (ex. 홈에서 todo 삭제 눌러서 확인 가능)
           */
          kAlert({
            title: `현재 시간: ${getNowIsoString()}`,
            desc: 'history back(뒤로가기)을 실행하면 얼럿이 닫힙니다',
          });
        }}
      >
        현재 시간 확인하기
      </TextButton>
      <TextButton
        variant="btn_black_white"
        textVariant="s16_regular_white"
        onClick={() => kRouter.routeBack()}
      >
        뒤로가기
      </TextButton>
    </div>
  );
}
