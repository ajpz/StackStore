var router = require('express').Router();
var mongoose = require('mongoose')
var Car = mongoose.model('Car')
module.exports = router;


router.route('/')
    .get(function(req, res, next) {
        Car.find({}).exec()
        .then(function(cars){
            res.status(200).send(cars)
        }).then(null, next)
    })
    .post(function(req, res, next) {
        Car.create(req.body)
        .then(function(car){
            res.status(201).send(car)
        }).then(null, next)
    })

router.route('/:carId')
    .get(function(req, res, next){
        console.log('ROUTE HIT with : ', req.params.carId)
        Car.findOne({_id:req.params.carId}).exec()
        .then(function(car){
            console.log('\n\n\nFOUND THE CAR: ', car)
            if(!car) return res.status(404).end()
            res.status(200).send(car)
        }).then(null, next)
    })
    .put(function(req, res, next) {
        Car.findOneAndUpdate({_id:req.params.carId}, req.body, {new: true, runValidators: true})
        .exec()
        .then(function(updatedCar){
            res.status(200).send(updatedCar)
        }).then(null, next)
    })
    .delete(function(req, res, next) {
        Car.remove({_id: req.params.carId}).exec()
        .then(function(car){
            res.status(204).end()
        }).then(null, next)
    })


