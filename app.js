const express = require("express");
const database = require("./database/connection");
const UserRoutes = require("./routes/user.router");
const CategoryRoutes = require("./routes/category.router");
const ItemsRoutes = require("./routes/items.router");
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use("/users", UserRoutes);
app.use("/category", CategoryRoutes);
app.use("/items", ItemsRoutes);

app.listen(8000, (err, data) => {
    console.log(`sever in running on ${port}`);
});
