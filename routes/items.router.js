const express = require("express");
const routes = express.Router();
const auth = require("../middelware/auth");
const controller = require("../controller/items.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("./public"));
    },
    filename: (req, file, callback) => {
        callback(
            null,
            file.fieldname +
                "-" +
                Date.now() +
                "-" +
                path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

routes.post("/add", auth, upload.single("image"), controller.addItems);

routes.get("/get", auth, controller.getList);

routes.get("/:id", auth, controller.details);

routes.put("/:id", auth, upload.single("image"), controller.update);

module.exports = routes;
