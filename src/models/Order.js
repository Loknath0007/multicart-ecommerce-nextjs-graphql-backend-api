const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    orderID: String,
    deliveryDate: String,
    paymentMethod: String,
    cartTotal: Number,
    status: String,
    order_status: String,
    // cartMins: [
    //   {
    //     id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    //     qty: Number,
    //   },
    // ],
    cartItems: [
      {
        id: String,
        title: String,
        description: String,
        // type: String,
        brand: String,
        category: String,
        price: Number,
        sale: Boolean,
        discount: Number,
        stock: Number,
        newP: Boolean,
        qty: Number,
        total: Number,

        variants: [
          {
            sku: String,
            size: [String],
            color: [String],
            image: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
