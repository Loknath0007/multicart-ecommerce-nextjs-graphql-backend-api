const { default: mongoose } = require("mongoose");

const Image = mongoose.model("Image", {
    image_id: {
        type: Number
    },
    id: {
        type: Number,
    },
    alt: {
        type: String,
    },
    src: {
        type: String,
    },
    variant_id: [Number]
});

module.exports = Image