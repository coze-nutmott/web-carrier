import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CheckBox, TextButton } from 'common/component/shared';
import { IPriority } from 'common/type';
import { kRouter } from 'common/util/kRouter';
import { actions as mainActions } from 'main/state/action';
import SelectPriority from 'newTodo/component/SelectPriority';
import { actions } from 'newTodo/state/action';

import { IS_DEBUG } from 'shared/common/constant';
import { kToast } from 'shared/component/toast/KToast';
import useBlockUnsavedChange from 'shared/hook/useBlockUnsavedChange';
import { KeyboardKeyType } from 'shared/type';
import { assert, getKeyboardKeyType } from 'shared/util/common';
import { pushLog } from 'shared/util/debug';

interface IProps {}

export default function NewTodo({}: IProps) {
  const [desc, setDesc] = useState('');
  const [isAlarm, setIsAlarm] = useState(false);
  const [priority, setPriority] = useState<IPriority>('middle');
  const nextId = useSelector(state => state.newTodo.nextId);
  const dispatch = useDispatch();
  /**
   * 주요 포인트
   * 페이지를 벗어나기 전에 얼럿을 띄우는 기능은 useBlockUnsavedChange 훅을 사용합니다
   * 할일 생성 페이지에서 내용을 입력하고 뒤로가기 또는 탭닫기를 해보세요
   */
  useBlockUnsavedChange(
    '작성 중인 내용이 있습니다.\n정말 나가시겠습니까?',
    desc.length > 0,
  );
  const onAdd = () => {
    /**
     * 주요 포인트
     * pushLog, assert, IS_DEBUG 코드는 프로덕션 빌드 시 제거되므로 부담 없이 사용할 수 있습니다
     * 특히 pushLog 를 중요한 곳에 많이 사용하면 디버깅 시 유용합니다 (ex. KRouter 에서 많이 사용 중)
     */
    pushLog({ msg: '할일 추가' });
    assert(desc !== undefined, 'desc 는 undefined 가 아닙니다');
    if (IS_DEBUG) {
      console.info('desc is ', desc);
    }

    dispatch(
      mainActions.addTodo({
        id: nextId,
        desc,
        priority,
        status: 'waiting',
        createdAt: '1234',
      }),
    );
    setDesc('');
    setPriority('middle');
    dispatch(actions.increaseId());
    kToast(`[${desc}] 생성 완료`);
    kRouter.routeBack();
  };
  return (
    <div>
      <input
        ref={ref => ref?.focus()}
        type="text"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="내용을 입력해주세요."
        onKeyDown={e =>
          getKeyboardKeyType(e) === KeyboardKeyType.Enter && onAdd()
        }
      />
      <SelectPriority priority={priority} setPriority={setPriority} />
      <CheckBox
        id="alarm"
        text="알림 받기"
        textVariant="s16_regular_black"
        checked={isAlarm}
        onChange={() => setIsAlarm(!isAlarm)}
      />
      <TextButton
        variant="btn_black_white"
        textVariant="s16_regular_white"
        onClick={onAdd}
      >
        할일 추가하기
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
