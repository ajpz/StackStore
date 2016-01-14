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
var makeId;

describe('Cars Route', function() {
    before('Establish DB connection', function(done){
        if(!mongoose.connection.db) return mongoose.connect(dbURI, done);
        console.log('\n\nBEFORE 1')
        done()
    });

    // beforeEach('Seed sample data', function(done) {
    //     MakeAndModel.create({
    //         make: 'Ford',
    //         model: 'Mustang'
    //     })
    //     .then(function(mAndm) {
    //         // makeId = mAndm._id;
    //         return Car.create({
    //             make: mAndm._id,
    //             model: 'Mustang',
    //             year: 1967,
    //             color: 'Red',
    //             condition: 'Excellent',
    //             mileage: 86000,
    //             horsePower: 200,
    //             acceleration: 5.2,
    //             kickassFactor: 5,
    //             price: 93000,
    //             count: 1
    //         })
    //     })
    //     .then(function() {
    //         done();
    //     })
    //     .then(null, done);
    // });

    // afterEach('Clear test database', function(done) {
    //   clearDB(done);
    // });

    after('Clear test database', function(done) {
        console.log('\n\nAFTER 1')
        done()
        // clearDB(done);
    });

    // describe('Get /cars', function() {
    //     var guestAgent;

    //     beforeEach('Create guest agent', function() {
    //         guestAgent = supertest.agent(app);
    //     });

    //     xit('should get a 200 response', function(done) {
    //         guestAgent.get('/api/cars/')
    //         .expect(200)
    //         .end(done);
    //     });

    //     xit('should find a car', function(done) {
    //         guestAgent.get('/api/cars/').expect(200)
    //         .end(function(err, response) {
    //             if(err) return done(err);
    //             expect(response.body.length).to.equal(1)
    //             done()
    //         });
    //     });
    // });

    describe('Cars have full CRUD capabilities', function() {
        var guestAgent;
        var newCar;
        var carId;

        before('Get id for the "make" seeded above', function(done) {
            console.log('\n\nBEFORE 2')

            MakeAndModel.create({
                make: 'Ford',
                model: 'Mustang'
            })
            .then(function(MM){
                console.log('\n\n\n MM is ', MM);
                makeId = MM._id;
                newCar = {
                    make: makeId,
                    model: 'Mustang',
                    year: 1970,
                    color: 'Black',
                    condition: 'Poor',
                    mileage: 1000,
                    horsePower: 500,
                    acceleration: 4.2,
                    kickassFactor: 1,
                    price: 50000,
                    count: 1
                };
                done();
            }).then(null, done);
        });

        beforeEach('Create guest agent', function() {
            console.log('\n\nBEFOREEACH 1')

            guestAgent = supertest.agent(app);
        });

        it('POST should make a new car', function(done) {
            guestAgent.post('/api/cars')
            .send(newCar)
            .expect(201)
            .end(function(err, res) {
                if(err) return done(err);
                expect(res.body.condition).to.equal('Poor')
                Car.findOne({'condition': 'Poor'}).exec()
                .then(function(car) {
                    console.log('FOUND THE CAR', car)
                    carId = car._id;
                    expect(car.year).to.equal(1970);
                    done();
                }).then(null, done);
            })
        })

        it('GET should return the car that was made', function(done) {
            console.log('\n\n\n carId: ', carId)
            guestAgent.get('/api/cars/')
            .expect(200)
            .end(function(err, response) {
                console.log("HEREL: ", response.body)
                if(err) return done(err);
                // expect(response.body.year).to.equal(1970);
                done();
            })
        })
    })
})
