import React, { FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import { RotateCirclesLoader } from 'react-inline-loaders';
import { getTodoRequest, updateTodoRequest } from '../api/todos.api';

interface TodoItemProps {
  id: string;
}

export const TodoItem: FC<TodoItemProps> = ({ id }) => {
  const { data: todo, isLoading } = useQuery<any>(['todo', id], getTodoRequest(id));
  const { mutate } = useMutation(['todo', id], updateTodoRequest(id));

  if (isLoading) {
    return <RotateCirclesLoader/>;
  }

  if (!todo) {
    return <h1>Error</h1>;
  }

  const handleUpdateItem = () =>
    mutate({ done: true });

  return <div>
    <p>Id: {todo._id}</p>
    <p>Name: {todo.name}</p>
    <p>Updates: {todo.updates}</p>
    <button onClick={handleUpdateItem}>Update</button>
  </div>;
};
