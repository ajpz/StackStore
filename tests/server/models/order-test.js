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
            amount: 5
        })
        .then(function(order) {
            expect(order.status).to.equal("inShoppingCart");
            expect(order.amount).to.equal(5);
            done();
        })
        // .then(null, console.error.bind(console));
    });
});
