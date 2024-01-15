const express = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET = process.env.SECRET || undefined;

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized..." });
  }

  const decoded = jwt.verify(token, SECRET)
  if (!decoded) {
    return res.status(401).json({ msg: "Unauthorized..." });
  }

  req.body.userId = decoded.userId;
  next();
}

module.exports = verifyToken;
