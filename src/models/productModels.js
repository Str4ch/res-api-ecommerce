const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: false
    },
    stock: {
        type: Number,
        required: true
    },
    price : {
        type: Number,
        required: true
    }
}, { timestamps: true});

productSchema.plugin(uniqueValidator)

module.exports = mongoose.model("productSchema", productSchema)