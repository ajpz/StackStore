'use strict';
var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['In Wish List', 'Created', 'Processing', 'Cancelled', 'Completed'],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    car: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }],
    date: {
        type: Date
    },
    amount: {
        type: Number,
        min: 0
    }
});

module.exports = mongoose.model('Order', orderSchema);
