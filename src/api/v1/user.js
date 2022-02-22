const route = require("express").Router();

const authService = require("../../services/auth");
const userService = require("../../services/user");


route.post('/register', authService.register);
route.post('/login', authService.login);
route.post('/add-users', userService.addUser);





module.exports = route;
