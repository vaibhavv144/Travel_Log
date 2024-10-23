const mongoose = require('mongoose');

//where it is used
const cardSchema = new mongoose.Schema({
    Image: {
        type: String,
        trim: true,
        required: true
    },
    place: {
        type: String,
        trim: true,
        unique: true
    },
    p: {
        type: String,
        required: true
    }
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
