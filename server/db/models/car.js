'use strict';

var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
	make: {
		type: String,
		enum: ['Ford', 'Toyota', 'Edsel'],
		required: true
	},
	model: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'CarModel',
	},
	year: {
		type: Number,
		required: true
	},
	color: {
		type: String,
		enum: ['Black', 'White', 'Red'],
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
    categoryIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }]
    },
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

mongoose.model('Car', carSchema)
