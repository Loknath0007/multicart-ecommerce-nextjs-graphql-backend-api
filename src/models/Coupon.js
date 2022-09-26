const mongoose = require("mongoose");
const { Schema } = mongoose;

const couponSchema = new Schema(
  {
    category: String,
    code: String,
    customer: String,
    discountType: String,
    freeShipping: Boolean,
    limit: String,
    maxSpend: String,
    minSpend: String,
    name: String,
    products: String,
    qty: String,
    status: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
