var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    make: {
        type: String
    },
    models: {
        type: [String]
    }
})

module.exports = mongoose.model('MakeAndModels', schema);
