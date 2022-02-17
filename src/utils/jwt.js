const jwt = require("jsonwebtoken");

const createUserToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "3d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};

module.exports = {
  createUserToken,
  verifyToken,
};
