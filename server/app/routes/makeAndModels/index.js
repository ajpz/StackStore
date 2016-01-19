'use strict';
var router = require('express').Router();
var MakeAndModels = require("mongoose").model('MakeAndModels');
module.exports = router;

router.route('/')
    .get(function (req, res, next) {
        MakeAndModels.find({}).exec()
        .then(function (makeAndModels){
            res.send(makeAndModels)
        })
        .then(null, next)
    })
    .post(function (req, res, next) {
        MakeAndModels.create(req.body)
        .then(function (makeAndModels){
            res.status(201).send(makeAndModels)
        })
        .then(null, next)
    });

router.route('/:makeAndModelsID')
    .get(function (req, res, next){
        MakeAndModels.findById(req.params.makeAndModelsID).exec()
        .then(function (makeAndModels){
            if(!makeAndModels) return res.status(404).end();
            res.send(makeAndModels)
        }).then(null, next)
    })
    .put(function (req, res, next) {
        MakeAndModels.findByIdAndUpdate(req.params.makeAndModelsID, req.body, {new: true, runValidators: true})
        .exec()
        .then(function (updatedMakeAndModels){
            res.status(200).send(updatedMakeAndModels)
        }).then(null, next)
    })
    .delete(function (req, res, next) {
        MakeAndModels.findByIdAndRemove(req.params.makeAndModelsID).exec()
        .then(function (){
            res.status(204).end()
        }).then(null, next)
    });
