'use strict';
var router = require('express').Router();
var Order = require("../../db/models/order.js");
module.exports = router;

router.route('/orders')
    .get(function (req, res, next) {
        Order.find().exec()
        .then(function (orders) {
            res.status(200).json(orders);
        });
    })
    .put(function (req, res, next) {
    })
    .post(function (req, res, next) {
    })

