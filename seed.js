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

// setting global references to mongoose database ids --once they have
// been created.
var address1, address2, category1, category2, make1, make2, model1, model2, reviews1, reviews2, car1, car2, user1, user2;

var seedCategories = function() {

    var categories = [
        {
            name: 'Muscle Cars'
        },
        {
            name: 'French Cars'
        }
    ]
}

var seedMakeAndModel = function() {

    var makesAndModels = [
        {
            make: 'Ford',
            model: ['Mustang', 'Model-T']
        },
        {
            make: 'Voisin',
            model: ['Aerosport', 'C28']
        }
    ]
}

var seedCars = function() {

    var cars = [
        {
            make: make1 // ID to MakeANdModel
            model: 'Mustang',
            year: 1967,
            color: 'Red',
            condition: 'Excellent',
            mileage: 86000,
            photos: ,
            categoryIds: [category1],
            horsePower: 200,
            acceleration: 5.2,
            kickassFactor: 5,
            price: 93000,
            count: 1,
        },
        {
            make: make2,
            model: 'Aerosport',
            year: 1934,
            color: 'Black',
            condition: 'Good',
            mileage: 30000,
            photos: ,
            categoryIds: [category2],
            horsePower: 400,
            acceleration: 12,
            kickAssFactor: 4,
            price: 123500,
            count: 2
        }
    ];

    return Car.createAsync(cars);
}

var seedAddress = function() {

    var addresses = [
        {
            streetNumber: 5,
            street: 'Hanover Street',
            unit: '25th Floor',
            city: 'New York',
            state: 'NY',
            zip: 10038
        },
        {
            streetNumber: 85,
            street: 'Broad Street',
            unit: '21st Floor',
            city: 'New York',
            state: 'NY',
            zip: 10037
        },
    ]

    return Address.createAsync(addresses);
}

var seedUsers = function() {

    var users = [
        {
            email: 'admin@gmail.com',
            password: 'admin',
            google: 'googleAdmin',
            shippingAddress: address1 ,
            billingAddress: address2,
            photos: ,
            categories: category1,
            orders: TODO,
            isAdmin: true,
            reviews: [reviews2]
        },
            var users = [
        {
            email: 'user@gmail.com',
            password: 'user',
            google: 'googleUser',
            shippingAddress: address2,
            billingAddress: address1,
            photos: ,
            categories: category2,
            orders: TODO,
            isAdmin: false,
            reviews: [reviews1]
        },
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ]
    ]
    return User.creaeAsync(users);
}

var seedReviews = function() {

    var reviews = [
        {
            car: car1,
            user: user1,
            comment: 'This thing is a classic fantastic!',
            rating: 5
        },
        {
            car: car2,
            user: user2,
            comment: "Wow. Can't say that enough. I mean, wow!",
            rating: 5
        }
    ]
}


function seed () {
    var docs = generateAll();
    return Promise.map(docs, function (doc) {
        return doc.save();
    });
}

db.drop = Promise.promisify(db.db.dropDatabase.bind(db.db));


connectToDb.then(function () {
    db.drop()
    .then(function(){

    })


    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
