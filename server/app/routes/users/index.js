'use strict';
var router = require('express').Router();
var User = require("mongoose").model('User');
module.exports = router;

router.route('/')
    .get(function (req, res, next) {
        User.find({}).exec()
        .then(function (users){
            res.send(users)
        })
        .then(null, next)
    })
    .post(function(req, res, next) {
        User.create(req.body).exec()
        .then(function (user){
            res.status(201).send(user)
        })
        .then(null, next)
    });

router.route('/:userId')
    .get(function (req, res, next){
        Used.findById(req.params.userId).exec()
        .then(function (user){
            if(!user) return res.status(404).end();
            res.send(user)
        }).then(null, next)
    })
    .put(function (req, res, next) {
        User.findByIdAndUpdate(req.params.userId, req.body, {new: true, runValidators: true})
        .exec()
        .then(function (updatedUser){
            res.status(200).send(updatedUser)
        }).then(null, next)
    })
    .delete(function (req, res, next) {
        User.findByIdAndRemove(req.params.userId).exec()
        .then(function (user){
            res.status(204).end()
        }).then(null, next)
    });
