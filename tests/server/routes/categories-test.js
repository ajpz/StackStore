// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Category = mongoose.model('Category');
var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var db;

describe('Categories Route', function() {
    before('Establish DB connection', function(done){
        if(!mongoose.connection.db) mongoose.connect(dbURI, done);
        done();
    });

    beforeEach('Seed sample data', function(done) {
        Category.create({
            name : "50's Cars"
        })
        .then(function() {
            done();
        });
    });

    afterEach('Clear test database', function(done) {
      clearDB(done);
    });

    describe('Get /api/categories', function() {
        var guestAgent;

        beforeEach('Create guest agent', function() {
            guestAgent = supertest.agent(app);
        });

        it('should get a 200 response', function(done) {
            guestAgent.get('/api/categories/')
            .expect(200)
            .end(done);
        });

        it('should find some categories', function(done) {
            guestAgent.get('/api/categories/').expect(200)
            .end(function(err, response) {
                if(err) return done(err);
                expect(response.body).to.be.an('array')
                done()
            });
        });
    });
})
