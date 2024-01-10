const userModel = require("../models/user.model.js");
const todoModel = require("../models/todo.model.js");
const { updateUserSchema } = require("../schemas/userSchema.js");
const { hashPassword } = require("../utils/hashPassword.js");

async function getUser(req, res) {
  try {
    console.log("⚙️Inside getUser...");
    const { userId } = req.body;
    console.log("📑Starting searchig for user with given id...");
    const user = await userModel.findOne({ _id: userId });
    if (user) {
      console.log("📑Found user with given id...");
      res.status(200).json({ "user": user });
    } else {
      console.log("📑No user found with given id...");
      res.status(404).json({ "msg": "No user with this id found in DB..." });
    }
  } catch (error) {
    console.log("😥Something went wrong");
    res.status(500).json({ "error": error.message });
  }
}

async function updateUser(req, res) {
  try {
    console.log("⚙️Inside updateUser...");
    console.log("😊Getting user data from the body...");
    const result = updateUserSchema.safeParse(req.body);
  
    if (!result.success) {
      console.log("😤 Invalid input for creating user:", result.error.errors);
      return res.status(400).json({ error: result.error.errors });
    }
    
    const user = result.data;
    const userExists = await userModel.findOne({ _id: user.userId });
    if (userExists) {
      const updatedData = {
        fullName: user.fullName,
        email: user.email,
        password: await hashPassword(user.password)
      }
      await userModel.updateOne({ _id: user.userId}, updatedData);
      console.log("✅Updated user successfully...");
      res.status(200).json({ "updatedUser": "Updated info successfully..." });
    } else {
      console.log("📑No user found with given id...");
      res.status(404).json({ "msg": "No user found with given id..." });
    }
  } catch (error) {
    console.log("😥Something went wrong...");
    res.status(500).json({ "error": error.message });
  }
}

async function deleteUser(req, res) {
  try {
    console.log("⚙️Inside deleteUser...");
    const { userId } = req.body;
    console.log("😊Getting user id from parameters...");
    const user = await userModel.findOne({ _id: userId });
    if (user) {
      console.log("😊User exists! Searching if any todos in DB by this user...");
      const todos = await todoModel.find({ _id: userId });
      
      if (todos) {
        console.log("📑Found this user's todo in DB...");
        console.log("😓Deleting all todos by the user...");
        await todoModel.deleteMany({ userId });
        console.log("✅Deleted all todos successfully...");
      }
      
      console.log("😓Now deleting the user...");
      await userModel.deleteOne({ _id: user._id });
      console.log("✅User deleted successfully...");
      res.status(200).json({ "deletedUser": user });
    } else {
      console.log("📑No user found with given id...");
      res.status(404).json({ "msg": "No user found with given id..." });
    }
  } catch (error) {
    console.log("😥Something went wrong...");
    res.status(500).json({ "error": error.message });
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser
}
