var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');

describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    it('should make an order document in the database', function (done) {
        Order.create({
            status: "inShoppingCart",
            userId: 1013,
            carId: 1234,
            orderDate: 789,
            amount: 5
        })
        .then(function(order) {
            expect(order.make).to.equal("inShoppingCart");
            expect(order.userId).to.equal(1013);
            expect(order.carId).to.equal(1234);
            expect(order.orderDate).to.equal(789);
            expect(order.amount).to.equal(5);
            done();
        });
    });
});
