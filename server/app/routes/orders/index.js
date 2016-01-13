'use strict';
var router = require('express').Router();
var Order = require("../../../db/models/order.js");
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
        Order.create(req.body)
        .then(function (order) {
            res.status(200).json(order);
        })
        .then(null, next);
    });
