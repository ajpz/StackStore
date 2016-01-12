var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');

// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');
var Car = mongoose.model('Car');
var User = mongoose.model('User');

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
        var car = Car.create({
            make: "Ford",
            year: 1948,
            color: "Black",
            condition: "Poor",
            mileage: 100400,
        }),
        user = User.create({
            email : "bobDole@gmail.com",
            password : "dolemite",
            isAdmin : true,
            photos : ["https://www.fillmurray.com/460/300", "https://www.fillmurray.com/460/400"]
        }), carId, userId;

        Promise.all([car, user])
        .then(function(prereqs) {
            carId = prereqs[0]._id;
            userId = prereqs[1]._id;
            return Review.create({
                car: carId,
                user: userId,
                comment: "This car rocked. I feel ten years younger!",
                rating: 5,
            })
        })
        .then(function(review) {
            expect(review.car).to.equal(carId);
            expect(review.user).to.equal(userId);
            expect(review.comment).to.equal("This car rocked. I feel ten years younger!");
            expect(review.rating).to.equal(5);
            done();
        });
    });
});
