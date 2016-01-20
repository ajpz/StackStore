'use strict';
var router = require('express').Router();
var Address = require("mongoose").model('Address');
module.exports = router;

router.route('/')
    .get(function (req, res, next) {
        Address.find({})
        .exec()
        .then(function (addresses){
            res.send(addresses);
        })
        .then(null, next);
    })
    .post(function (req, res, next) {
        Address.create(req.body)
        .then(function (address){
            res.status(201).send(address);
        })
        .then(null, next)
    })

router.route('/:addressId')
    .get(function (req, res, next) {
        Address.findById(req.params.addressId)
        .exec()
        .then(function (address){
            res.send(address);
        })
        .then(null, next);
    })
    .put(function (req, res, next) {
        Address.findOneAndUpdate({_id: req.params.addressId}, req.body, {runValidators:true, new: true})
        .then(function (updatedAddress){
            res.status(201).send(updatedAddress);
        })
        .then(null, next);
    })
