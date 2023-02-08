const express = require("express");
const route = express.Router();
const categorySchema = require("../schemas/category.schema");
const controller = require("../controller/category.controller");
const auth = require("../middelware/auth");

route.post("/", auth, controller.addCategory);

route.put("/add/:id", auth, controller.updateCategory);

module.exports = route;
