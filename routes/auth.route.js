const express = require("express");
const { signup, login } = require("../controllers/auth.controller.js");

const authRouter = express.Router();

authRouter.post("/auth/signup", signup);

authRouter.post("/auth/login", login);

module.exports = authRouter;
