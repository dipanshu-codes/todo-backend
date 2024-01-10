const express = require("express");
const jwt = require("jsonwebtoken");
const { hashPassword, verifyPassword } = require("../utils/hashPassword.js");
const userModel = require("../models/user.model.js");

require("dotenv").config();
const SECRET = process.env.SECRET;

async function signup(req, res) {
  try {
    console.log("⚙️Inside signup user...");
    console.log("😊Getting user from the body...");
    const { fullName, email, password } = req.body;

    if (!(fullName || email || password)) {
      return res.status(400).json({ "msg": "Please provide all the fields..." });
    }
      
    console.log("📑Checking if user already exists in DB...");
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ "msg": "User already exists with this email! Please use a different one..." });
    }

    console.log("📑User doesn't exists so trying to create a user with given data...");
    const hashPass = await hashPassword(password);
    const createUser = await userModel.create({
      fullName,
      email,
      password: hashPass
    });

    if (createUser) {
      console.log("✅User created successfully");
      const token = jwt.sign({ userId: createUser._id }, SECRET, { expiresIn: "7d" }); 
      res.status(201).json({ "newUser": { createUser, token } });
    }
    
  } catch (error) {
    console.log("😥Something went wrong...");
    res.status(500).json({ "error": error.message });
  }
}

async function login(req, res) {
  try {
    console.log("⚙️Inside login user");
    console.log("😊Getting user from the body...");
    const { email, password } = req.body;

    if (!(email || password)) {
      return res.status(400).json({ "msg": "Please provide all the fields..." });
    }
      
    console.log("📑Checking if user already exists in DB...");
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ "msg": "User doesn't exist! Please create one to login..." });
    } 

    if (userExists && verifyPassword(password, userExists.password)) {
      console.log("😊Credentials are correct! Logging in...");
      const token = jwt.sign({ userId: userExists._id }, SECRET);
      res.status(200).json({
          "msg": "Credentials are validated! Logging in...",
          "token": token
      });
    } else {
      console.log("😓Password is incorrect");
      res.status(400).json({ "msg": "Entered password is incorrect! Please try again..." });
    }

  } catch (error) {
    console.log("😥Something went wrong...");
    res.status(500).json({ "error": error.message });
  }  
}

/*
async function logout(req, res) {
  
}
*/

module.exports = { signup, login }
