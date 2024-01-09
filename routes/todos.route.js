const express = require("express");
const { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo } = require("../controllers/todos.controller.js");

const todoRouter = express.Router();

todoRouter.get("/todos", getAllTodos);

todoRouter.get("/todo/:id", getTodo);

todoRouter.post("/todos", createTodo);

todoRouter.put("/todo/:id", updateTodo);

todoRouter.delete("/todo/:id", deleteTodo);

module.exports = todoRouter;
