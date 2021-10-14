import { Text, TextButton } from 'common/component/shared';
import { kRouter } from 'common/util/kRouter';
import React from 'react';
import { useSelector } from 'react-redux';

interface IProps {
  todoId: number;
}

export default function Detail({ todoId }: IProps) {
  const todo = useSelector(state =>
    state.main.todos.find(item => item.id === todoId),
  );
  return (
    <div>
      {todo && (
        <>
          <Text variant="s16_regular_black">{todo.id}</Text>
          <Text variant="s16_regular_black">{todo.desc}</Text>
          <Text variant="s16_regular_black">{todo.priority}</Text>
          <Text variant="s16_regular_black">{todo.status}</Text>
          <Text variant="s16_regular_black">{todo.createdAt}</Text>
        </>
      )}
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
