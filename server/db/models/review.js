'use strict';

var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    },
    comment: {
        type: String
    },
    rating: {
        type: Number
    }
});


mongoose.model('Review', reviewSchema);
