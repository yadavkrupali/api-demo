const express = require("express");
const database = require("./database/connection");
const UserSchema = require("./schemas/user.schema");
const CategorySchema = require("./schemas/category.schema");
const UserRoutes = require("./routes/user.router");
const CategoryRoutes = require("./routes/category.router");
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use("/users", UserRoutes);
app.use("/category", CategoryRoutes);

app.listen(8000, (err, data) => {
    console.log(`sever in running on ${port}`);
});
