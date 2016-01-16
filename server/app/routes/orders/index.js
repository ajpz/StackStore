'use strict';
var router = require('express').Router();
var Order = require("mongoose").model('Order');
module.exports = router;

router.route('/')
    .get(function (req, res, next) {
        var query = req.query || {};
        Order.find(query).exec()
        .then(function (orders){
            res.send(orders)
        })
        .then(null, next)
    })
    .post(function(req, res, next) {
        Order.create(req.body)
        .then(function (order){
            res.status(201).send(order)
        })
        .then(null, next)
    });

router.route('/:orderId')
    .get(function (req, res, next){
        Order.findById(req.params.orderId).exec()
        .then(function (order){
            if(!order) return res.status(404).end();
            res.send(order)
        }).then(null, next)
    })
    .put(function (req, res, next) {
        Order.findByIdAndUpdate(req.params.orderId, req.body, {new: true, runValidators: true})
        .exec()
        .then(function (updatedOrder){
            res.status(200).send(updatedOrder)
        }).then(null, next)
    })
    .delete(function (req, res, next) {
        Order.findByIdAndRemove(req.params.orderId).exec()
        .then(function (order){
            res.status(204).end()
        }).then(null, next)
    });
