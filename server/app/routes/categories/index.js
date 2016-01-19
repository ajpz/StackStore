'use strict';
var router = require('express').Router();
var Category = require("mongoose").model('Category');
module.exports = router;

router.route('/')
    .get(function (req, res, next) {
        Category.find({}).exec()
        .then(function (categories){
            res.send(categories)
        })
        .then(null, next)
    })
    .post(function (req, res, next) {
        Category.create(req.body)
        .then(function (category){
            res.status(201).send(category)
        })
        .then(null, next)
    });

router.route('/:categoryId')
    .get(function (req, res, next){
        Category.findById(req.params.categoryId).exec()
        .then(function (category){
            if(!category) return res.status(404).end();
            res.send(category)
        }).then(null, next)
    })
    .put(function (req, res, next) {
        Category.findByIdAndUpdate(req.params.categoryId, req.body, {new: true, runValidators: true})
        .exec()
        .then(function (updatedCategory){
            res.status(200).send(updatedCategory)
        }).then(null, next)
    })
    .delete(function (req, res, next) {
        Category.findByIdAndRemove(req.params.categoryId).exec()
        .then(function (){
            res.status(204).end()
        }).then(null, next)
    });
