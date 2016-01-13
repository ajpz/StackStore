'use strict'

var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
  streetNumber: {
    type: Number
  },
  street: {
    type: String
  },
  unit: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: Number,
    require: true
  },
  location: [Number]
});

//create pre-hook to populate location coordinates

module.exports = mongoose.model('Address', addressSchema);
