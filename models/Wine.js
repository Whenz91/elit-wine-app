const mongoose = require("mongoose");

const wineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    mainImage: String,
    varietyOfWine: String,
    typeOfWine: {
        type: String,
        enum: {
            values: ['White', 'Red', 'Rose'],
            message: '{VALUE} is not supported. Please choose from these: Red, White, Rose!'
        }
    },
    size: Number,
    alcoholVolume: Number,
    vintage: Number,
    origin: {
        country:  String,
        region: String
    },
    longDescription: {
        type: String
    },
    notes: {
        color: String,
        taste: String,
        composition: String,
        recommenFood: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Wine", wineSchema);