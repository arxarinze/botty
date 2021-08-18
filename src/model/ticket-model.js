const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  key: {
    type: String,
    unique: true,
    required: true
  },

  createdAt: {
    type: Date,
    required: [true, "createdAt is required"],
    default: Date.now(),
  }
});

const ticket = mongoose.model("ticket", ticketSchema, "ticket");
module.exports = ticket;
