const route = require("express").Router();

const AuthService = require("../../services/auth");


route.post('/register', AuthService.register)





module.exports = route;
