'use strict';

var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
	make: {
		type: String,
		enum: ['Ford', 'Toyota', 'Edsel'],
		required: true
	},
	model: {
		type: mongoose.model.Schema.Types.ObjectId,
		ref: 'CarModel',
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	color: {
		type: String,
		enum: ['Black', 'White', 'Red']
		required: true
	},
	condition: {
		type: String,
		enum: ['Poor', 'Good', 'Excellent']
		required: true
	}
})


