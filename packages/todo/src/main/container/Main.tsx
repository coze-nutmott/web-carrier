/**
 * 주요 포인트
 * src 폴더를 기준으로 절대 경로 형식으로 import 경로를 입력합니다
 * 단, shared 패키지 내부에서는 예외입니다 (기술적인 문제가 있어서 거기서는 상대 경로 사용)
 */
import { TextButton, Anchor } from 'common/component/shared';
import { kRouter, Page } from 'common/util/kRouter';
import TodoList from 'main/component/TodoList';
import { actions } from 'main/state/action';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNowIsoString } from 'shared/util/date';
import { kAlert } from 'shared/component/KAlert';

interface IProps {}

export default function Main({}: IProps) {
  const todos = useSelector(state => state.main.todos);
  const dispatch = useDispatch();

  async function onRemove(todoId: number) {
    const { okClicked } = await kAlert({
      title: '정말 삭제하시겠습니까?',
      buttonSet: 'cancelAndConfirm',
    });
    if (okClicked) {
      dispatch(actions.removeTodo(todoId));
    }
  }
  return (
    <div>
      {/* 주요 포인트
          spacing(마진, 패딩)은 tailwind 의 utility class 를 활용합니다
          0~100 px 사이의 숫자를 입력할 수 있도록 설정되어 있습니다. (더 큰 수는 scss 로 입력)
       */}
      <Anchor className="p-20" pageInfo={{ page: Page.NewTodo }}>
        <TextButton variant="btn_black_white" textVariant="s16_regular_white">
          할일 생성하기
        </TextButton>
      </Anchor>
      <Anchor
        className="p-20"
        onClick={() =>
          kRouter.routeTo({
            page: Page.Event,
            id: 'abc',
            requestedDt: getNowIsoString(),
          })
        }
      >
        <TextButton variant="btn_black_white" textVariant="s16_regular_white">
          이벤트 확인하기
        </TextButton>
      </Anchor>
      <TodoList
        todos={todos}
        onClickTodo={todoId =>
          kRouter.routeTo({ page: Page.Detail, id: todoId })
        }
        onRemove={onRemove}
      />
    </div>
  );
}
