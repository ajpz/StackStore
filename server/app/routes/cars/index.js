'use strict';
var router = require('express').Router();
var Car = require("mongoose").model('Car');
module.exports = router;

router.route('/')
    .get(function (req, res, next) {
        Car.find({})
        .populate('categories')
        .populate('make')
        .exec()
        .then(function (cars){
            res.send(cars)
        })
        .then(null, next)
    })
    .post(function (req, res, next) {
        Car.create(req.body).exec()
        .then(function (car){
            res.status(201).send(car)
        })
        .then(null, next)
    });

router.route('/:carId')
    .get(function (req, res, next){
        Car.findById(req.params.carId)
        .populate('categories')
        .populate('make')
        .exec()
        .then(function (car){
            if(!car) return res.status(404).end();
            res.send(car)
        }).then(null, next)
    })
    .put(function (req, res, next) {
        Car.findByIdAndUpdate(req.params.carId, req.body, {new: true, runValidators: true})
        .exec()
        .then(function (updatedCar){
            res.status(200).send(updatedCar)
        }).then(null, next)
    })
    .delete(function (req, res, next) {
        Car.findByIdAndRemove(req.params.carId).exec()
        .then(function (car){
            res.status(204).end()
        }).then(null, next)
    });
