import React, { FC } from 'react';
import { RotateCirclesLoader } from 'react-inline-loaders';
import { useTodoAPI } from '../hooks/useTodoAPI';

interface TodoItemProps {
  id: string;
}

export const TodoItem: FC<TodoItemProps> = ({ id }) => {
  const { todo, dataIsLoading, updateTodo, isUpdating } = useTodoAPI(id);
  // const { data: todo, isLoading } = useQuery<any>(['todo', id], getTodoRequest(id));
  // const { mutate } = useMutation(['todo', id], updateTodoRequest(id));

  if (dataIsLoading) {
    return <RotateCirclesLoader/>;
  }

  if (!todo) {
    return <h1>Error</h1>;
  }

  const handleUpdateItem = () =>
    updateTodo({ done: true });

  console.log('>>', isUpdating);

  return <div>
    <p>Id: {todo._id}</p>
    <p>Name: {todo.name}</p>
    <p>Updates: {todo.updates}</p>
    <button onClick={handleUpdateItem}>Update</button>
  </div>;
};
