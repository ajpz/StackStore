var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Car = mongoose.model('Car');

describe('Car model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Car).to.be.a('function');
    });

    it('should make a car document in the database', function (done) {
        Car.create({
            make: "Ford",
            year: 1948,
            color: "Black",
            condition: "Poor",
            mileage: 100400,
        })
        .then(function(car) {
            expect(car.make).to.equal("Ford");
            expect(car.year).to.equal(1948);
            expect(car.color).to.equal("Black");
            expect(car.condition).to.equal("Poor");
            expect(car.mileage).to.equal(100400);
            done();
        });
    });
});
