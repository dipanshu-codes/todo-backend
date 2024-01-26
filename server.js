const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require("@colors/colors");

const cors = require("cors");

const verifyToken = require("./middlewares/auth.middleware.js");

const authRouter = require("./routes/auth.route.js");
const userRouter = require("./routes/user.route.js");
const todoRouter = require("./routes/todos.route.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  console.log();
  console.log(
    `${colors.cyan(
      `URL hit path ${colors.green.underline(
        `http://localhost:${PORT}${req.path}`
      )} => HTTP Method: ${colors.bold.yellow(`${req.method}`)}`
    )}`
  );
  next();
});

app.use("/api", authRouter);
app.use("/api", verifyToken, userRouter);
app.use("/api", verifyToken, todoRouter);

// Connect to DB
mongoose
  .connect(MONGO_URL)
  .then(function () {
    console.log(colors.rainbow("⚙️Connected to DB..."));

    // Listen for requests
    app.listen(PORT, function () {
      console.log(
        colors.white.bgBlack.bold(`👂Listening on port ${process.env.PORT}`)
      );
    });
  })
  .catch(function (error) {
    console.log(error);
  });
