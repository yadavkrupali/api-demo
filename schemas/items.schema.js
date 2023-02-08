const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    price: {
        type: Number,
        required: true,
    },
    stoke: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Items", itemSchema);
