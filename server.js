const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose"); 

const userRouter = require("./routes/user.route.js");
const todoRouter = require("./routes/todos.route.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRouter);
app.use("/api", todoRouter);

// Connect to DB
mongoose
	.connect(MONGO_URL)
	.then(function() {
    console.log("⚙️Connected to DB...")

		// Listen for requests
		app.listen(PORT, function() {
			console.log("👂Listening on port", process.env.PORT);
		});
	})
	.catch(function (error) {
		console.log(error);
	});
