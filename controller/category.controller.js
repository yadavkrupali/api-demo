const Category = require("../schemas/category.schema");

exports.addCategory = async (req, res) => {
    const category = await Category.findOne({ title: req.body.title });
    if (category) {
        return res.status(422).json({ meassge: "category is alredy exits" });
    }

    const data = await Category.create(req.body);

    res.json({ message: "category added", data });
};

exports.updateCategory = async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    let data = await Category.updateOne({ _id: id.toString() }, req.body);
    data = await Category.findById(id);
    res.json({ message: "update list", data });
};

exports.getList = async (req, res) => {
    const data = await Category.find();
    res.json({ message: "All categories", data });
};
