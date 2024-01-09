const express = require("express");
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/user.controller.js");

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);

userRouter.get("/user/:id", getUser);

userRouter.post("/users", createUser);

userRouter.put("/user/:id", updateUser);

userRouter.delete("/user/:id", deleteUser);

module.exports = userRouter;
