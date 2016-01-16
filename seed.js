/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Car = Promise.promisifyAll(mongoose.model('Car'));
var Category = Promise.promisifyAll(mongoose.model('Category'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var Address = Promise.promisifyAll(mongoose.model('Address'));
var MakeAndModels = Promise.promisifyAll(mongoose.model('MakeAndModels'));
var Review = Promise.promisifyAll(mongoose.model('Review'));

var _ = require('lodash');
var csvParser = require('./csvParser');

var chance = require('chance')(123);
var numUsers = 50;
var emails = chance.unique(chance.email, numUsers);

function randPhoto () {
    var g = chance.pick(['men', 'women']);
    var n = chance.natural({
        min: 0,
        max: 96
    });
    return 'http://api.randomuser.me/portraits/thumb/' + g + '/' + n + '.jpg'
}



var seedCategories = function() {

    var categories = [
        {
            name: 'Muscle Cars'
        },
        {
            name: 'French Cars'
        }
    ]

    return Category.createAsync(categories);
}

var seedMakeAndModels = function() {

    var makesAndModels = [
        {
            make: 'Ford',
            models: ['Mustang', 'Model-T']
        },
        {
            make: 'Voisin',
            models: ['Aerosport', 'C28']
        }
    ]
    return MakeAndModels.createAsync(makesAndModels);
}

var seedCars = function(makes, categories) {

    console.log(makes);
    var makeMap = makes.reduce(function(result, MM){
        console.log(result, MM.make, MM._id);
        result[MM.make] = MM._id;
        return result;
    }, {});

    console.log('makeMap is ', makeMap)
    csvParser('./cars.csv', function(err, data) {
        if(err) return console.error(err);
        console.log('cars: ', data);

        carArray = data.map(function(car){
            car.make = makeMap[car.make];
            return car;
        });

        console.log('mapped cars: ', carArray);
        return Car.createAsync(carArray);
    });

    // var cars = [
    //     {
    //         make: makes[0]._id, // ID to MakeAndModels
    //         model: 'Mustang',
    //         year: 1967,
    //         color: 'Red',
    //         condition: 'Excellent',
    //         mileage: 86000,
    //         // photos: ,
    //         categories: [categories[0]._id],
    //         horsePower: 200,
    //         acceleration: 5.2,
    //         kickassFactor: 5,
    //         price: 93000,
    //         count: 1,
    //     },
    //     {
    //         make: makes[1]._id,
    //         model: 'Aerosport',
    //         year: 1934,
    //         color: 'Black',
    //         condition: 'Good',
    //         mileage: 30000,
    //         // photos: ,
    //         categories: [categories[1]]._id,
    //         horsePower: 400,
    //         acceleration: 12,
    //         kickAssFactor: 4,
    //         price: 123500,
    //         count: 2
    //     }
    // ];

}

var seedAddress = function() {

    var addresses = [
        {
            street1: '5 Hanover Street',
            street2: '25th Floor',
            city: 'New York',
            state: 'NY',
            zip: 10038
        },
        {
            street1: '85 Broad Street',
            street2: '21st Floor',
            city: 'New York',
            state: 'NY',
            zip: 10037
        },
    ]

    return Address.createAsync(addresses);
}

var seedUsers = function(addresses, categories) {

    function randUser () {
        return new User({
            photos: [randPhoto()],
            email: emails.pop(),
            password: chance.word(),
            isAdmin: chance.weighted([true, false], [5, 95]),
            shippingAddress: addresses[0]._id,
            billingAddress: addresses[1]._id,
            categories: categories[0]._id,
            // reviews: []
        });
    }

    var users = _.times(numUsers, randUser);

    users.push(new User({
        email: 'admin@gmail.com',
        password: 'admin',
        google: 'googleAdmin',
        shippingAddress: addresses[0]._id,
        billingAddress: addresses[1]._id,
        // photos: ,
        categories: categories[0]._id,
        isAdmin: true
        // reviews: [reviews2]
    }));

    users.push(new User({
        email: 'user@gmail.com',
        password: 'user',
        google: 'googleUser',
        shippingAddress: addresses[1]._id,
        billingAddress: addresses[0]._id,
        // photos: ,
        categories: categories[1]._id,
        isAdmin: false
        // reviews: [reviews1]
    }));
    users.push(new User({
        email: 'testing@fsa.com',
        password: 'password'
    }));
    users.push(new User({
        email: 'obama@gmail.com',
        password: 'potus'
    }));
    return User.createAsync(users);
}

var seedOrders = function(users, cars) {

    var orders = [
        {
            status: 'Created',
            user: users[0]._id,
            car: cars[0]._id,
            amount: 93000
        },
        {
            status: 'Processing',
            user: users[1]._id,
            car: cars[1]._id,
            date: new Date(2015, 11, 23),
            amount: 93000
        }
    ]
    return Order.createAsync(orders);
}

var seedReviews = function(users, cars) {

    var reviews = [
        {
            car: cars[0]._id,
            user: users[0]._id,
            comment: 'This thing is a classic fantastic!',
            rating: 5
        },
        {
            car: cars[1]._id,
            user: users[1]._id,
            comment: "Wow. Can't say that enough. I mean, wow!",
            rating: 5
        }
    ]

    return Review.createAsync(reviews);
}


function seed () {
    var easySeeds = [seedCategories(), seedMakeAndModels(), seedAddress()];

    return Promise.all(easySeeds);

    // var docs = generateAll();
    // return Promise.map(docs, function (doc) {
    //     return doc.save();
    // });
}


var dbClosure;

    connectToDb.then(function(db){
        db.drop = Promise.promisify(db.db.dropDatabase.bind(db.db));
        dbClosure = db;
    })
    .then(function () {
        dbClosure.drop()
    .then(function(){
        return seed();
    })
    .then(function(easySeeds){

        var categories = easySeeds[0];
        var makes = easySeeds[1];
        var models = easySeeds[1];
        var addresses = easySeeds[2];
        var hardSeeds = [seedUsers(addresses, categories), seedCars(makes, categories)];

        return Promise.all(hardSeeds);
    })
    .then(function(hardSeeds) {

        var users = hardSeeds[0];
        var cars = hardSeeds[1];
        var hardestSeeds = [seedOrders(users, cars), seedReviews(users, cars)]

        return Promise.all(hardestSeeds);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
