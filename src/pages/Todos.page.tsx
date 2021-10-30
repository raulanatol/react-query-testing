import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { getTodosRequest } from '../api/todos.api';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TodoList } from '../components/TodoList';
import styled from '@emotion/styled';
import { TodoItem } from '../components/TodoItem';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftColumn = styled.div`
  width: 70%;
`;

export const TodosPage: FC = () => {
  const [todoSelectedId, setTodoSelectedId] = useState<string | undefined>();

  const { isLoading } = useQuery<any[]>('todos', getTodosRequest);
  console.log('TodosPage', isLoading);

  const handleOnClickTodo = id =>
    setTodoSelectedId(id);

  const handleOnClickShowList = () =>
    setTodoSelectedId(undefined);

  return <Container>
    <LeftColumn>
      <Header/>
      {!todoSelectedId && <TodoList onClickTodo={handleOnClickTodo}/>}
      {todoSelectedId && <TodoItem id={todoSelectedId}/>}
      <Footer onClickShowList={handleOnClickShowList}/>
    </LeftColumn>
  </Container>;
};
