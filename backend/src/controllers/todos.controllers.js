import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const todos = database.todos.filter((todos) => todos.owner === req.user.id);
  res.json({ todos });
};


//crear tareas para el usuario
export const posTodosCtrl = (req, res) => {
  const { title, completed } = req.body;

  if( title === undefined || title === null || title === "" || completed === undefined || completed === null) {
    return res.status(400).json({ message: "se tiene que completar los campos" });
  }
  const newTodo = {
    id: database.todos.length + 1,
    title,
    completed: false,
    owner: req.user.id,
  };
  database.todos.push(newTodo);
  return res.json({ message: "Tarea creada exitosamente", todo: newTodo });
}


//borrar tareas para el usuario
export const deleteTodosctrl = (req, res) => {
  const { id } = +req.params;
  const todoIndex = database.todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  const todo = database.todos[todoIndex]; 
  if (todo.owner !== req.user.id) {
    return res.status(403).json({ message: "no puedes eliminar esta tarea" });
  }
  database.todos.splice(todoIndex, 1);
  return res.json({ message: "Tarea eliminada exitosamente" });
}

//actualizar tareas para el usuario
export const updateTodosCtrl = (req, res) => {
  const { id } = +req.params;
  const { title, completed } = req.body;

  const todoIndex = database.todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  const todo = database.todos[todoIndex];
  if (todo.owner !== req.user.id) {
    return res.status(403).json({ message: "no puedes actualizar esta tarea" });
  }

  todo.title = title === undefined ? title : todo.title;
  todo.completed = completed === undefined ? title : todo.completed;

  return res.json({ message: "Tarea actualizada exitosamente", todo: todo });
}


