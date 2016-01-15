'use strict'

var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    street1: {
        type: String
    },
    street2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: Number
    },
    location: {
        type: [Number] // [Long, Lat]
    }
});

//create pre-hook to populate location coordinates

module.exports = mongoose.model('Address', addressSchema);
