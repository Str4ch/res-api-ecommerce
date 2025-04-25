const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const invoiceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    participants: {
        type: Array,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    totalAmount : {
        type: Number,
        required: true
    },
    items: {
        type: Array,
        required: true
    }
}, { timestamps: true});

invoiceSchema.plugin(uniqueValidator)

module.exports = mongoose.model("invoiceSchema", invoiceSchema)