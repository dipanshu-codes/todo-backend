const todoModel = require("../models/todo.model.js");

async function getAllTodos(req, res) {
  try {
    console.log("⚙️Inside getAllTodos...");
    const todos = await todoModel.find();
    
    console.log("📑Searching for todos in DB...");
    if (todos.length > 0) {
      console.log("📑Found todos in DB...");
      res.status(200).json({ "todos": todos });
    } else {
      console.log("📑No todos found in DB...");
      res.status(404).json({ "msg": "No todos found in DB..." });
    }

  } catch (error) {
    console.log("😥Something went wrong...");
    res.status(500).json({ "error": error.message });
  }
}

async function getTodo(req, res) {
  try {
    console.log("⚙️Inside getTodo...");
    console.log("😊Getting id from params...");
    const { id } = req.params;
    
    console.log("📑Searching for todo with given id");
    const todo = await todoModel.findOne({ _id: id });
    if (todo) {
      console.log("📑Todo found in DB with given id...");
      res.status(200).json({ "todo": todo });
    } else {
      console.log("📑Todo not found with given id...");
      res.status(500).json({ "msg": "No todo found with given id..." });
    }
  } catch (error) {
    console.log("😥Something went wrong");
    res.status(500).json({ "error": error.message });
  }
}

async function createTodo(req, res) {
  try {
    console.log("⚙️Inside createTodo...");
    console.log("😊Getting data from body...");
    const { userId, title, description } = req.body;

    console.log("📑Starting to create todo with given data...");
    const todo = await todoModel.create({ userId, title, description });

    if (todo) {
      console.log("📑Todo created successfully...");
      res.status(201).json({ "newTodo": todo });
    }
  } catch (error) {
    console.log("😥Something went wrong...");
    res.status(500).json({ "error": error.message });
  }
}

async function updateTodo(req, res) {
  try {
    console.log("⚙️Inside updateTodo...")
    console.log("😊Getting id & data to update...");
    const { id } = req.params;
    const updatedData = req.body;

    const todo = await todoModel.findOne({ _id: id });
    if (todo) {
      const updatedTodo = await todoModel.updateOne({ _id: id}, updatedData);
      console.log("✅Updated todo successfully...");
      res.status(200).json({ "msg": "Todo updated successfully..." });
    } else {
      console.log("📑No todo found to update in DB...");
      res.status(404).json({ "msg": "No todo found with given id..." });
    }

  } catch (error) {
    console.log("😥Something went wrong...");
    res.status(500).json({ "error": error.message });
  }
}

async function deleteTodo(req, res) {
  try {
    console.log("⚙️Inside deleteTodo...");
    console.log("😊Getting id from params...");
    const { id } = req.params;
    
    const todo = await todoModel.findOne({ _id: id });
    if (todo) {
      const deletedTodo = await todoModel.deleteOne({ _id: id });
      console.log("✅Todo deleted successfully...");
      res.status(200).json({ "msg": "Deleted todo successfully..." });
    } else {
      console.log("📑No todo found with given id...");
      res.status(404).json({ "msg": "No todo found with given id..." });
    }

  } catch (error) {
    console.log("😥Something went wrong...");
    res.status(500).json({ "error": error.message });
  }
}

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
};

