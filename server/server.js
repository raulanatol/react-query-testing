const express = require('express');
const { name, datatype } = require('faker');
const cors = require('cors');
const app = express();
app.use(cors());

const newTodo = () => ({
  _id: datatype.uuid(),
  name: name.findName(),
  updates: 0
});

let todos = new Array(10).fill(0).map(newTodo);

app.listen(3030, () => {
  console.log('Ready!: 3030');
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find(item => item._id === req.params.id);
  res.json(todo);
})

app.post('/todos', (req, res) => {
  todos.push(newTodo());
  res.json({});
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(item => item._id !== req.params.id);
  res.json({});
})

app.patch('/todos/:id', (req, res) => {
  const position = todos.findIndex(item => item._id === req.params.id);
  todos[position].updates++;
  res.json({});
})
