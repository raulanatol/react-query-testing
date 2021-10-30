const API_URL = 'http://localhost:3030/todos';

const toJSON = response => response.json();

export const getTodosRequest = () =>
  fetch(API_URL)
    .then(toJSON);

export const addTodoRequest = (_) =>
  fetch(API_URL, { method: 'POST' })
    .then(toJSON);

export const removeTodoRequest = (id: string) =>
  fetch(API_URL + '/' + id, { method: 'DELETE' })
    .then(toJSON);

export const updateTodoRequest = (id: string) => (data: any) => {
  console.log('DATA', data);
  return fetch(API_URL + '/' + id, { method: 'PATCH' })
    .then(toJSON);
};

export const getTodoRequest = (id: string) =>
  () =>
    fetch(API_URL + '/' + id)
      .then(toJSON);
