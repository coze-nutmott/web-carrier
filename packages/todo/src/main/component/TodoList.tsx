import React from 'react';

import { Text, TextButton, Anchor } from 'common/component/shared';
import { ITodo } from 'common/type';

interface IProps {
  todos: ITodo[];
  onRemove: (todoId: number) => void;
  onClickTodo: (todoId: number) => void;
}

export default function TodoList({ todos, onRemove, onClickTodo }: IProps) {
  return (
    <div className="p-50">
      {todos.map(item => (
        <div key={item.id} className="mb-50">
          <Anchor onClick={() => onClickTodo(item.id)}>
            <Text variant="s42_bold_black">{item.desc}</Text>
            <Text variant="s16_medium_blue">{item.status}</Text>
            <Text variant="s16_medium_blue">{item.priority}</Text>
          </Anchor>
          <TextButton
            variant="btn_grey01"
            textVariant="s16_medium_gold"
            className="ml-100"
            onClick={() => onRemove(item.id)}
          >
            삭제
          </TextButton>
        </div>
      ))}
    </div>
  );
}
