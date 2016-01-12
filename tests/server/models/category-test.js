var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Category = mongoose.model('Category');

describe('Category model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Category).to.be.a('function');
    });

    it('should make a car document in the database', function (done) {
        Category.create({
            name : "50's Cars"
        })
        .then(function(category) {
            expect(category.name).to.equal("50's Cars");
            done();
        });
    });
});
