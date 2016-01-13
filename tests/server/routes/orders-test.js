// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Order = mongoose.model('Order');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Order Route', function() {

    beforeEach('Establish DB connection', function(done) {
        if (!mongoose.connection.db) db = mongoose.connect(dbURI).connection;

        var carId;
        var userId;
        db.on('open', function() {
            MakeAndModel.create({
                    make: 'Ford',
                    model: 'Mustang'
                })
                .then(function(mAndm) {
                    console.log('Saved DOC is: ', mAndm);
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
                .then(function(car) {
                    carId = car._id;
                    return User.create({
                        email: 'alan@hotmail.com',
                        password: 'alanalan'
                    })
                })
                .then(function(user) {
                    return Order.create({
                        status: 'Created',
                        userId: user._id,
                        carId: [carId],
                        orderDate: Date.now(),
                        amount: 5
                    })
                });
        })
    });








    afterEach('Clear test database', function(done) {
        clearDB(done);
    });

    describe('Orders route', function() {
        var guestAgent;

        beforeEach('Create guest agent', function() {
            guestAgent = supertest.agent(app);
        });

        it('should get a 200 response', function(done) {
            guestAgent.get('/api/orders')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body).to.have.length();
                    done()
                });
        });
    });

    describe('Unauthenticated request', function() {

        var guestAgent;

        beforeEach('Create guest agent', function() {
            guestAgent = supertest.agent(app);
        });

        it('should get a 401 response', function(done) {
            guestAgent.get('/api/orders')
                .expect(401)
                .end(done);
        });

    });

    xdescribe('Authenticated request', function() {

        var loggedInAgent;

        var userInfo = {
            email: 'joe@gmail.com',
            password: 'shoopdawoop'
        };

        beforeEach('Create a user', function(done) {
            User.create(userInfo, done);
        });

        beforeEach('Create loggedIn user agent and authenticate', function(done) {
            loggedInAgent = supertest.agent(app);
            loggedInAgent.post('/login').send(userInfo).end(done);
        });

        it('should get with 200 response and with an array as the body', function(done) {
            loggedInAgent.get('/api/orders').expect(200).end(function(err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                done();
            });
        });

    });

});
