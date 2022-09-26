const mongoose = require("mongoose");
const { Schema } = mongoose;

const pageSchema = new Schema(
  {
    title: String,
    description: String,
    slug: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
