const mongoose = require('mongoose')

const Variant = mongoose.model("Variant", {
    variant_id: String,
    id: String,
    sku: String,
    size: String,
    color: String,
    image_id: Number,
})

module.exports = Variant