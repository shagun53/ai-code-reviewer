const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    review: {
        type: mongoose.Schema.Types.Mixed, // stores our full JSON review object
        required: true
    },
    language: {
        type: String,
        default: 'unknown'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', reviewSchema);