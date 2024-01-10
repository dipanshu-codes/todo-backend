const brcypt = require("bcrypt");

const saltRounds = 10;

async function hashPassword(password) {
  const hashedPass = await brcypt.hash(password, saltRounds);
  return hashedPass;
}

async function verifyPassword(password, hashedPassword) {
  const result = await brcypt.compare(password, hashedPassword);
  return result;
}

module.exports = {
  hashPassword,
  verifyPassword
}
