var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    make: {
        type: String
    },
    model: {
        type: [String]
    }
})

module.exports = mongoose.model('MakeAndModel', schema);
