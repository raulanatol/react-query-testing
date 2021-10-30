import React, { FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getTodosRequest, removeTodoRequest } from '../api/todos.api';
import { RotateCirclesLoader } from 'react-inline-loaders';
import styled from '@emotion/styled';

const Button = styled.div`
  cursor: pointer;
  padding: 2px;

  &:hover {
    background-color: #ff7c7c;
  }
`;

const Base = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4px;
  gap: 4px;
`;

interface TodoListProps {
  onClickTodo: (id: string) => void;
}

export const TodoList: FC<TodoListProps> = ({ onClickTodo }) => {
  const { isLoading, data: todos } = useQuery<any[]>('todos', getTodosRequest);
  const { mutate } = useMutation('todos', removeTodoRequest);

  const handleRemove = (id: string) => () =>
    mutate(id);

  const handleOpen = (id: string) => () =>
    onClickTodo(id);

  // const handleUpdate = (id: string) => () =>
  //   mutateUpdate({ id: id, done: true });

  return <div>
    <ol>
      {isLoading && <RotateCirclesLoader/>}
      {todos && todos.map(todo =>
        <li key={todo._id}>
          <Base>
            <Button onClick={handleRemove(todo._id)}>🗑</Button>
            {todo.name}
            ({todo.updates})
            <Button onClick={handleOpen(todo._id)}>[Open]</Button>
            {/*<Button onClick={handleUpdate(todo._id)}>[Update]</Button>*/}
          </Base>
        </li>
      )}
    </ol>
  </div>;
};
