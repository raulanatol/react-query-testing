import React, { FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import { addTodoRequest, getTodosRequest } from '../api/todos.api';

export const Footer: FC = () => {
  const mutation = useMutation('todos', addTodoRequest);
  const { isLoading, data: todos } = useQuery<any>('todos', getTodosRequest);

  console.log('Footer', isLoading);

  const handleAddElement = async () => {
    mutation.mutate();
  };

  return <div>
    <button onClick={handleAddElement}>Add {isLoading ? '*' : `${todos.length}`}</button>
  </div>;
};
