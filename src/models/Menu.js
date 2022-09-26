const mongoose = require("mongoose");
const { Schema } = mongoose;

const menuSchema = new Schema(
  {
    name: String,
    primary: Boolean,
    menuList: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
