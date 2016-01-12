var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');
var Car = mongoose.model('Car');

describe('Review model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Review).to.be.a('function');
    });

    it('should make a review document in the database', function (done) {
        var carId;
        Car.create({
            make: "Ford",
            year: 1948,
            color: "Black",
            condition: "Poor",
            mileage: 100400,
        })
        .then(function(car) {
            carId = car._id;
            return Review.create({
                car: carId,
                comment: "This car rocked. I feel ten years younger!",
                rating: 5,
            })
        })
        .then(function(review) {
            expect(review.car).to.equal(carId);
            expect(review.comment).to.equal("This car rocked. I feel ten years younger!");
            expect(review.rating).to.equal(5);
            done();
        });
    });
});
