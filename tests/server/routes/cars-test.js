// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Car = mongoose.model('Car');
var MakeAndModel = mongoose.model('MakeAndModel');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var db;

describe('Cars Route', function() {
    before('Establish DB connection', function(done){
        if(!mongoose.connection.db) mongoose.connect(dbURI, done);
    });

    beforeEach('Seed sample data', function(done) {
        MakeAndModel.create({
            make: 'Ford',
            model: 'Mustang'
        })
        .then(function(mAndm) {
            return Car.create({
                make: mAndm._id,
                model: 'Mustang',
                year: 1967,
                color: 'Red',
                condition: 'Excellent',
                mileage: 86000,
                horsePower: 200,
                acceleration: 5.2,
                kickassFactor: 5,
                price: 93000,
                count: 1
            })
        })
        .then(function() {
            done();
        });
    });

    afterEach('Clear test database', function(done) {
      clearDB(done);
    });

    describe('Get /cars', function() {
        var guestAgent;

        beforeEach('Create guest agent', function() {
            guestAgent = supertest.agent(app);
        });

        it('should get a 200 response', function(done) {
            guestAgent.get('/api/cars/')
            .expect(200)
            .end(done);
        });

        it('should find a car', function(done) {
            guestAgent.get('/api/cars/').expect(200)
            .end(function(err, response) {
                if(err) return done(err);
                expect(response.body).to.be.an('array')
                done()
            });
        });
    });
})
