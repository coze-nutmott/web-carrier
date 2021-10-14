import { Text, TextButton } from 'common/component/shared';
import { kRouter } from 'common/util/kRouter';
import React, { useContext } from 'react';
import { EventContext } from 'event/state/context';
import { useServerUser } from 'event/state/server';
import User from 'event/component/User';

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
        onClick={() => kRouter.routeBack()}
      >
        뒤로가기
      </TextButton>
    </div>
  );
}
