const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({

    userID: {
        type: String,
    },
    type: {
        type: String,
    },
    currency: {
        type: String,
    },
    amount: {
        type: Number,
    },
    currentAmount: {
        type: Number,
    },
    coin: {
        type: String,
    },
    rate: {
        type: Number,
    },
    status: {
        type: String,
    },
    minAmount: {
        type: Number,
    },
    maxAmount: {
        type: Number,
    },
    createdAt: {
        type: Date,
        required: [true, "createdAt is required"],
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        required: [true, "updatedAt is required"],
        default: Date.now(),
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    isInternal: {
        type: Boolean,
    },
    paymentMethod: {
        type: String,
    },
    phone: {
        type: String,
    },
    version: {
        type: String,
        default: "beta-v1",
    }
});

const order = mongoose.model("order", orderSchema, "order");
module.exports = order;
