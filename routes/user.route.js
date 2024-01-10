const express = require("express");
const { getAllUsers, getUser, updateUser, deleteUser } = require("../controllers/user.controller.js");

const userRouter = express.Router();

// userRouter.get("/users", getAllUsers);

userRouter.get("/user", getUser);

userRouter.put("/user", updateUser);

userRouter.delete("/user", deleteUser);

module.exports = userRouter;
