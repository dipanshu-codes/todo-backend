const express = require("express");
const { getUserTodos, getTodo, createTodo, updateTodo, deleteTodo } = require("../controllers/todos.controller.js");

const todoRouter = express.Router();

todoRouter.get("/todos", getUserTodos);

todoRouter.get("/todo/:id", getTodo);

todoRouter.post("/todos", createTodo);

todoRouter.put("/todo/:id", updateTodo);

todoRouter.delete("/todo/:id", deleteTodo);

module.exports = todoRouter;
