const express = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET = process.env.SECRET || undefined;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ "msg": "Unauthorized..." });
  }

  jwt.verify(token, SECRET, function(error, decoded) {
    if (error) {
      return res.status(401).json({ "msg": "Unauthorized..." });
    }

    req.body.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;
