'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var orderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['inShoppingCart, orderPlaced, Delivered'],
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
        type : Date,
        default: Date.now
    },
    amount: {
        type: Number,
        min: 0
    }
});

mongoose.model('Order',orderSchema);
