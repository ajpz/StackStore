var router = require('express').Router();
var mongoose = require('mongoose')
var Review = mongoose.model('Review')


module.exports = router;


//finds all reviews for a car, or by a user -- uses search query
router.route('/')
    .get(function(req, res, next) {

        var toPopulate = Object.keys(req.query);

        Review.find(req.query).exec()
        .then(function(reviews) {
            if(reviews.length === 0) return res.status(404).end();
            reviews.populate(toPopulate).exec()
            res.send(reviews);
        })
    })
    .post(function(req, res, next){

        Review.create(req.body)
        .exec()
        .then(function(savedCar) {
            res.send(savedCar);
        })

    })
    .put(function(req, res, next){

        Review.findByIdAndUpdate(req.params.carId, req.body, {new: true, runValidators: true})
        .exec()
        .then(function(updatedCar) {
            res.send(updatedCar);
        })

    })
