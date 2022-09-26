const mongoose = require("mongoose");
const Image = require("./Image");
const { ObjectId } = mongoose.Schema;

const Product = mongoose.model("Product", {
  title: {
    type: String,
    unique: true,
  },
  description: String,
  type: String,
  brand: String,
  collections: [String],
  category: String,
  price: Number,
  sale: Boolean,
  discount: Number,

  stock: Number,
  newP: Boolean,
  tags: [String],
  variants: [
    {
      // variant_id: Number,
      // id: Number,
      sku: String,
      size: [String],
      color: [String],
      // image_id: Number,
      image: String,
    },
  ],
  // images: [
  //   {
  //     image_id: Number,
  //     id: Number,
  //     alt: String,
  //     src: String,
  //     variant_id: [Number],
  //   },
  // ],
  sortBy: String,
});

module.exports = Product;
