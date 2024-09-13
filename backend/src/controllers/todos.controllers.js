import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const todos = database.todos.filter((todos) => todos.owner === req.user.id);

  res.json({ todos });
};
