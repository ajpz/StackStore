'use strict';

var mongoose = require('mongoose');
var MakeAndModels = mongoose.model('MakeAndModels');

var carSchema = new mongoose.Schema({
        make: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MakeAndModel',
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
        categories: [{
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
        },
        tags: {
            type: [String]
        }
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

carSchema.post("init", function(carDoc){
    carDoc.tags = [ carDoc.model, carDoc.color, carDoc.year.toString() ]
    carDoc.save(function(err) {
        console.error(err);
    });
});

carSchema.virtual('displayName').get(function() {
    return MakeAndModels.find({_id: this.make}).exec()
    .then(function(MM) {
        return MM.make + ' ' + this.model + ' ' + this.year;
    })
});

module.exports = mongoose.model('Car', carSchema)
