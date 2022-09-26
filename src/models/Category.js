const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      //   unique: true,
      trim: true,
      require: true,
    },
    subCategories: [String],
    icon: {
      type: String,
      required: [true, "Image Icon is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
