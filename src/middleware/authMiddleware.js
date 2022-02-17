const jwt = require("jsonwebtoken");

const User = require("../models/user");

const authenticate = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(403).json({
      status: res.statusCode,
      message: "A token is required for authentication",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    // console.log(req.user)
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};



module.exports = { authenticate };
