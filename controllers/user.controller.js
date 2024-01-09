const userModel = require("../models/user.model.js");

async function getAllUsers(req, res) {
  try {
    console.log("⚙️Inside getAllUsers...");
    console.log("📑Starting searching for users...");
    const users = await userModel.find();
    if (users.length > 0) {
      console.log("📑Found users in DB...")
      res.status(200).json({ "users": users });
    } else {
      console.log("📑DB is empty...");
      res.status(404).json({ "msg": "No users found in DB..." });
    }
  } catch (error) {
    console.log("😥Something went wrong...");
    res.status(500).json({ "error": error.message });
  }
}

async function getUser(req, res) {
  try {
    console.log("⚙️Inside getUser...");
    const { id } = req.params;
    console.log("📑Starting searchig for user with given id...");
    const user = await userModel.findById(id);
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

async function createUser(req, res) {
  try {
    console.log("⚙️Inside createUser...");
    console.log("😊Getting user from the body...");
    const { fullName, email, password } = req.body;
    if (fullName && email && password) {
      console.log("📑Trying to create user with given data...");
      const createUser = await userModel.create({
        fullName,
        email,
        password
      });
      if (createUser) {
        console.log("✅User created successfully");
        res.status(201).json({ "newUser": createUser });
      }
    }

  } catch (error) {
    console.log("😥Something went wrong...");
    res.status(500).json({ "error": error.message });
  }
}

async function updateUser(req, res) {
  try {
    console.log("⚙️Inside updateUser...");
    console.log("😊Getting user data from the body...");
    const updatedData = req.body;
    const { id } = req.params;
    
    const user = await userModel.findOne({ _id: id });
    if (user) {
      const updateUser = await userModel.updateOne({ _id: id}, updatedData);
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
    const { id } = req.params;
    console.log("😊Getting user id from parameters...");
    const user = await userModel.findOne({ _id: id });
    if (user) {
      const deletedUser = await userModel.deleteOne({ _id: user._id });
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
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
