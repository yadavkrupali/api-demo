const express = require("express");
const routes = express.Router();
const User = require("../schemas/user.schema");
const controller = require("../controller/user.controller");

routes.post("/register", controller.register);

routes.post("/login", controller.login);

// routes.post("/profile", controller.profile);

module.exports = routes;
