const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    orderID: String,
    transactionID: String,
    paymentMethod: String,
    status: String,
    amount: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
