var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Address = mongoose.model('Address');

describe('Address model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Address).to.be.a('function');
    });

    it('should make a address document in the database', function (done) {
        Address.create({
            street1: "5 Hanover",
            street2: "25th floor",
            city: "New York",
            state: "NY",
            zip: 10038
        })
        .then(function(address) {
            expect(address.street1).to.equal("5 Hanover");
            expect(address.street2).to.equal("25th floor");
            expect(address.city).to.equal("New York");
            expect(address.state).to.equal("NY");
            expect(address.zip).to.equal(10038);
            done();
        });
    });
});
