'use strict';
var router = require('express').Router();
// var Order = require("../../../db/models/order.js");
var Order = require("mongoose").model('Order');
module.exports = router;

router.route('/')
    .get(function (req, res, next) {
        Order.find({}).exec()
        .then(function (orders) {
            res.status(200).json(orders);
        })
        .then(null, next)
    })
    .post(function (req, res, next) {
        Order.create(req.body).exec()
        .then(function (order) {
            res.status(200).json(order);
        })
        .then(null, next);
    });

router.route('/:orderId')
    .get(function (req, res, next) {
        Order.findById(req.params.orderId).exec()
        .then(function(order) {
            res.status(200).json(order);
        })
        .then(null, next);
    })
    .put(function (req, res, next) {
        Order.fundById(req.params.orderId).exec()
        .then(function(order) {


        })
        .then(function(order) {
            res.status(200).json(order);
        })
        .then(null, next);
    });
