'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var orderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['inShoppingCart', 'Created', 'Processing', 'Cancelled', 'Completed'],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    orderDate: {
        type : Date
    },
    amount: {
        type: Number,
        min: 0
    }
});

mongoose.model('Order',orderSchema);
