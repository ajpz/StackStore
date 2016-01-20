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

var guestAgent = supertest.agent(app);

describe('Cars Route', function() {
    var newCar;
    var carId;

    before('Establish DB connection', function(done){
        if(!mongoose.connection.db) return mongoose.connect(dbURI, function(err, data) {
            if(err) return done(err);
            done()
        });
        done()
    });

    beforeEach('Seed sample data', function(done) {

        MakeAndModel.create({
            make: 'Ford',
            model: 'Mustang'
        })
        .then(function(MM) {
            makeId = MM._id;
            return Car.create({
                make: makeId,
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
        .then(function(car) {
            carId = car._id;
            newCar = car;
            done();
        })
        .then(null, done);
    });

    afterEach('Clear test database', function(done) {
      clearDB(done);
    });

    after('Clear test database', function(done) {
        Car.find({}).exec()
        .then(function(carArray) {
            console.log('\n\nIN AFTER1, DB HAS CARS: ', carArray);
        })
        // done()
        clearDB(done);
    });

    describe('Cars have full CRUD capabilities', function() {

        // beforeEach('Create guest agent', function() {
        //     console.log('\n\nBEFOREEACH 1')

        //     guestAgent = supertest.agent(app);
        // });

        it('GET should return the car that was made', function(done) {

            guestAgent.get('/api/cars/' + carId)
                .expect(200)
                .end(function(err, response) {
                    if(err) return done(err);
                    expect(response.body.year).to.equal(1967);
                    done();
                })
        })

        it('POST should make a new car', function(done) {

            var carToPost;

            MakeAndModel.create({
                make: 'Ford',
                model: 'Mustang'
            })
            .then(function(MM) {
                var makeId = MM._id;
                var carToPost = ({
                    make: makeId,
                    model: 'Mustang',
                    year: 1970,
                    color: 'Black',
                    condition: 'Poor',
                    mileage: 86000,
                    horsePower: 200,
                    acceleration: 5.2,
                    kickassFactor: 5,
                    price: 93000,
                    count: 1
                })

                guestAgent.post('/api/cars')
                .send(carToPost)
                .expect(201)
                .end(function(err, res) {
                    if(err) return done(err);
                    expect(res.body.condition).to.equal('Poor')
                    Car.findOne({'condition': 'Poor'}).exec()
                    .then(function(car) {
                        carId = car._id;
                        expect(car.year).to.equal(1970);
                        done();
                    }).then(null, done);
                })
            })

        })

        it('PUT should update a car', function(done) {

            var updateCar = {
                condition: 'Good',
                color: 'White'
            }

            guestAgent.put('/api/cars/' + carId)
            .send(updateCar)
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
                expect(res.body.condition).to.equal('Good')
                Car.findOne({'condition': 'Good'}).exec()
                .then(function(car) {
                    carId = car._id;
                    expect(car.color).to.equal('White');
                    done();
                }).then(null, done);
            })
        })

        it('DELETE should delete a car', function(done) {

            guestAgent.delete('/api/cars/' + carId)
            .expect(204)
            .end(function(err, res) {
                if(err) return done(err);
                Car.findOne({'condition': 'Excellent'}).exec()
                .then(function(car) {
                    expect(car).to.equal(null);
                    done();
                }).then(null, done);
            })
        })
    })
})
