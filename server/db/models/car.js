'use strict';

var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
	make: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MakeAndModels',
		required: true
	},
	model: {
		type: String
	},
	year: {
		type: Number,
		required: true
	},
	color: {
		type: String,
		enum: ['Black', 'White', 'Silver', 'Grey', 'Red', 'Blue'],
		required: true
	},
	condition: {
		type: String,
		enum: ['Poor', 'Good', 'Excellent'],
		required: true
	},
    mileage: {
        type: Number,
    },
    photos: {
        type: [String]
    },
    categoryIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
    }],
    horsePower: {
        type: Number
    },
    acceleration: {
        type: Number
    },
    kickassFactor: {
        type: Number
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    price: {
        type: Number
    },
    count: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model('Car', carSchema)
