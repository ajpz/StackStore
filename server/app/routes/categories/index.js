'use strict';
var router = require('express').Router();
var Category = require("mongoose").model('Category');
module.exports = router;

router.route('/')
    .get(function (req, res, next) {
        Category.find({}).exec()
        .then(function (orders) {
            res.status(200).json(orders);
        })
        .then(null, next)
    })
    .post(function (req, res, next) {
        Category.create(req.body).exec()
        .then(function (order) {
            res.status(200).json(order);
        })
        .then(null, next);
    });
