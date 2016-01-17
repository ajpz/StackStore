'use strict';
var router = require('express').Router();
var Review = require('mongoose').model('Review');
module.exports = router;
//finds all reviews for a car, or by a user -- uses search query
router.route('/')
    .get(function (req, res, next) {
        var query = req.query || {};
        var map = { car: 'user', user: 'car'};
        var toPopulate = map[Object.keys(query)[0]];

        Review.find(query).populate(toPopulate).exec()
        .then(function (reviews) {
            if(reviews.length === 0) return res.status(404).end();
            res.send(reviews)
        })
        .then(null, next)
    })
    .post(function (req, res, next){
        Review.create(req.body).exec()
        .then(function (savedReview) {
            res.status(201).send(savedReview)
        }).then(null, next)
    });

//updates an individual review
router.route('/:reviewId')
    .get(function (req, res, next){
        Review.findById(req.params.reviewId).exec()
        .then(function (review){
            if(!review) return res.status(404).end();
            res.send(review)
        }).then(null, next)
    })
    .put(function (req, res, next){
        Review.findByIdAndUpdate(req.params.reviewId, req.body, {new: true, runValidators: true})
        .exec()
        .then(function(updatedReview) {
            res.status(200).send(updatedReview)
        })
        .then(null, next)
    })
    .delete(function (req, res, next) {
        Review.findByIdAndRemove(req.params.reviewId).exec()
        .then(function(review){
            res.status(204).end()
        }).then(null, next)
    });
