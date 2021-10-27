import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { getTodosRequest } from '../api/todos.api';
import { RotateCirclesLoader } from 'react-inline-loaders';

export const TodoList: FC = () => {
  const { isLoading, data: todos } = useQuery<any[]>('todos', getTodosRequest);
  console.log('TodoList', isLoading);
  return <div>
    <ul>
      {isLoading && <RotateCirclesLoader/>}
      {todos && todos.map(todo => <li key={todo.id}>{todo.name}</li>)}
    </ul>
  </div>;
};
