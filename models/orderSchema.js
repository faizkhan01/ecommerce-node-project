const mongoose = require('mongoose');

// define order Schema
const orderSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        index: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        index: true,
    },
    date: {
        type: Date,
        default: Date.now,
        index: true,
    },
})

const orderModel = mongoose.model('orders', orderSchema);
module.exports = orderModel;