const Items = require("../schemas/items.schema");
const joi = require("joi");

exports.addItems = async (req, res) => {
    req.body.image = req.file.filename;
    const data = await Items.create(req.body);
    res.json({ message: "item add successfully", data });
};

exports.getList = async (req, res) => {
    const query = {};
    if (req.query.search) {
        query.title = { $regex: ".*" + req.query.search + ".*" };
    }
    if (req.query.stoke) {
        query.stoke = req.query.stoke;
    }
    const data = await Items.find(query).populate("category");
    res.json({ message: "listing", data });
};

exports.details = async (req, res) => {
    const id = req.params.id;
    const data = await Items.findById({ _id: id });
    res.json({ message: "details", data });
};

const updateSchema = joi.object().keys({
    title: joi.string().required(),
    category: joi.string().required(),
    price: joi.number().required(),
    stoke: joi.string().required(),
});
exports.update = async (req, res) => {
    const { error, value } = updateSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        res.status(422).json(error.details);
    }

    const id = req.params.id;

    if (req.file) {
        req.body.image = req.file.filename;
    }
    req.body.category = req.body.category.toString();
    let data = await Items.updateOne({ _id: id.toString() }, req.body);
    data = await Items.findById(id);
    res.json({ message: "update ", data });
};
