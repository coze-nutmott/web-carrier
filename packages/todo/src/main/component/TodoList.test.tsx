import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ITodo } from 'common/type';
import TodoList from 'main/component/TodoList';

describe('TodoList', () => {
  it('empty todolist', () => {
    const todos: ITodo[] = [];
    const fn = () => {};
    const { container } = render(
      <TodoList todos={todos} onRemove={fn} onClickTodo={fn} />,
    );
    expect(container.firstElementChild).toBeEmptyDOMElement();
  });
});
