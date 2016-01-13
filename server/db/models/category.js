'use strict';

var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }]
})

module.exports = mongoose.model('Category', categorySchema)
