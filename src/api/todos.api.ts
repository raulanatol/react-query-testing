import { name } from 'faker';

export const todoArray = [
  { id: '1', name: name.findName() },
  { id: '2', name: name.findName() }
];

const getRandom = (min = 1000, max = 3000) =>
  Math.floor(Math.random() * (max - min)) + min;

const getUnexpectedError = (errorThreshold = 1200) =>
  getRandom() < errorThreshold;

const fakeResponse = (response): Promise<any> =>
  new Promise((resolve, reject) => {
    const error = getUnexpectedError();
    if (error) {
      reject('Unexpected error');
      return;
    }
    setTimeout(() => {
      resolve(response);
    }, getRandom());
  });

export const getTodosRequest = () =>
  fakeResponse(todoArray);

export const addTodoRequest = () => {
  todoArray.push({ id: '_' + Math.random(), name: 'Todo: ' + name.findName() });
  return fakeResponse(todoArray);
};

