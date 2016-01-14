var router = require('express').Router();
var mongoose = require('mongoose')
var Review = mongoose.model('Review')


module.exports = router;


//finds all reviews for a car, or by a user -- uses search query
router.route('/')
    .get(function(req, res, next) {
        var map = { car: 'user', user: 'car'};
        var toPopulate = map[Object.keys(req.query)[0]];

        Review.find(req.query).populate(toPopulate).exec()
        .then(function(reviews) {
            if(reviews.length === 0) return res.status(404).end();
            res.send(reviews);
        }).then(null, next)
    })
    .post(function(req, res, next){

        Review.create(req.body)
        .then(function(savedCar) {
            res.send(savedCar);
        }).then(null, next);

    })

//updates an individual review
router.route('/:reviewId')
    .put(function(req, res, next){
        Review.findOneAndUpdate(req.params.reviewId, req.body, {new: true, runValidators: true})
        .exec()
        .then(function(updatedCar) {
            res.send(updatedCar);
        }).then(null, next);

    })
    .delete(function(req, res, next) {
        Review.remove({_id: req.params.reviewId}).exec()
        .then(function(review){
            res.status(204).end()
        }).then(null, next)
    })
