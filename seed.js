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
var csvParserAsync = Promise.promisify(csvParser);

var chance = require('chance')(123);
var numUsers = 75;
var numOrders = 600;
var numReviews = 300;

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
            name: 'French'
        },
        {
            name: 'Foreign'
        },
        {
            name: 'Classic'
        },
        {
            name: 'USA'
        },
        {
            name: 'Muscle'
        },
        {
            name: 'Italian'
        },
        {
            name: 'Movie'
        },
        {
            name: 'Sports'
        },
        {
            name: 'German'
        },
        {
            name: 'Supercar'
        },
        {
            name: 'British'
        },
        {
            name: 'Villain'
        },
        {
            name: 'Hero'
        }
    ];
    return Category.createAsync(categories);
};

var seedMakeAndModels = function() {

    var makesAndModels = [
        {
            make: 'Ford',
            models: ['Mustang', 'Model-T']
        },
        {
            make: 'Voisin',
            models: ['Aerosport', 'C28']
        },
        {
            make: 'AlfaRomeo',
            models: ['Spider']
        },
        {
            make: 'Pontiac',
            models: ['GTO']
        },
        {
            make: 'Plymouth',
            models: ['RoadRunner']
        },
        {
            make: 'Porsche',
            models: ['911']
        },
        {
            make: 'Chevrolet',
            models: ['Corvette', 'Impala']
        },
        {
            make: 'MercedesBenz',
            models: ['SLSAMG']
        },
        {
            make: 'BMW',
            models: ['M3']
        },
        {
            make: 'Jaguar',
            models: ['CX75']
        },
        {
            make: 'AstonMartin',
            models: ['DB10']
        }
    ];
    return MakeAndModels.createAsync(makesAndModels);
};

var seedCars = function(makes, categories) {

    var makeMap = makes.reduce(function(result, MM){
        result[MM.make] = MM._id;
        return result;
    }, {});

    var categoriesMap = categories.reduce(function(result, category) {
        result[category.name] = category._id;
        return result;
    }, {})

    var mapCategoryToId = function(categoryString) {
        return JSON.parse(categoryString).map(function(categoryName) {
            var categoryId = categoriesMap[categoryName];
            return categoryId;
        })
    }

    return csvParserAsync('./cars.csv')
    .then(function(cars) {

        carArray = cars.map(function(car){
            car.make = makeMap[car.make];
            car.year = Number(car.year);
            car.mileage = Number(car.mileage);
            car.horsePower = Number(car.horsePower)
            car.acceleration = Number(car.acceleration)
            car.kickassFactor = Number(car.kickassFactor)
            car.price = Number(car.price)
            car.count = Number(car.count)
            car.categories = mapCategoryToId(car.categories);
            car.photos = JSON.parse(car.photos);
            return car;
        });
        return Car.createAsync(carArray)
    })
    .then(null, console.error.bind(console));
}

var seedAddresses = function() {

    function randAddress () {
        return new Address({
            street1: chance.address(),
            street2: '',
            city: chance.city(),
            state: chance.state(),
            zip: chance.zip()
        })
    };

    var addresses = _.times(numUsers, randAddress);

    addresses.push(new Address({
        street1: '5 Hanover Street',
        street2: '25th Floor',
        city: 'New York',
        state: 'NY',
        zip: 10038
    }));
    addresses.push(new Address({
        street1: '85 Broad Street',
        street2: '21st Floor',
        city: 'New York',
        state: 'NY',
        zip: 10037
    }))

    return Address.createAsync(addresses);
}

var seedUsers = function(addresses, categories) {

    function randUser () {
        return new User({
            photos: [randPhoto()],
            email: emails.pop(),
            password: chance.word(),
            isAdmin: chance.weighted([true, false], [5, 95]),
            shippingAddress: chance.pick(addresses),
            billingAddress: chance.pick(addresses),
            categories: chance.pick(categories),
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
        photos: [randPhoto()],
        categories: categories[0]._id,
        isAdmin: true,
        // reviews: [reviews2]
    }));

    users.push(new User({
        email: 'user@gmail.com',
        password: 'user',
        google: 'googleUser',
        shippingAddress: addresses[1]._id,
        billingAddress: addresses[0]._id,
        photos: [randPhoto()],
        categories: categories[1]._id,
        isAdmin: false,
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
    //not sure why min: 1 doesn't work
    function randOrder() {
        var order = new Order({
            status: chance.weighted(['Processing', 'Cancelled', 'Completed'], [20,5,75]),
            user: chance.pick(users)._id,
            car: chance.pick(cars, chance.integer({min:2, max:3})),
            amount: 0,
            date: chance.birthday({ year: chance.year({min: 2010, max:2015})})
        })
        order.car = order.car.map(function(car) {
            order.amount = order.amount + car.price;
            return car._id
        })
        return order;
    }

    var orders = _.times(numOrders, randOrder);

    orders.push(new Order({
        status: 'Created',
        user: users[0]._id,
        car: cars[0]._id,
        amount: 93000
    }));
    orders.push(new Order({
        status: 'Processing',
        user: users[1]._id,
        car: cars[1]._id,
        date: new Date(2015, 11, 23),
        amount: 93000
    }))

    return Order.createAsync(orders);
}

var seedReviews = function(users, cars) {

    var randReview = function() {
        return new Review({
            car: chance.pick(cars),
            user: chance.pick(users),
            comment: chance.sentence(),
            rating: chance.integer({min:1, max:5})
        })
    }

    var reviews = _.times(numReviews, randReview);
    reviews.push(new Review({
        car: cars[0]._id,
        user: users[0]._id,
        comment: 'This thing is a classic fantastic!',
        rating: 5
    }));
    reviews.push(new Review({
        car: cars[1]._id,
        user: users[1]._id,
        comment: "Wow. Can't say that enough. I mean, wow!",
        rating: 5
    }));

    return Review.createAsync(reviews);
}

function giveUsersReviews() {
    var reviews = Review.findAsync({}),
        users = User.findAsync({});

    return Promise.all([reviews, users])
    .then(function(results){

        var remainingReviews = results[0],
            users = results[1],
            reviewsPerUser = Math.floor(remainingReviews.length / users.length),
            toId = review => review._id,
            addOneReview = () => remainingReviews.pop();

        users.forEach(function(user){
            user.reviews = _.times(reviewsPerUser, addOneReview).map(toId);
            remainingReviews = remainingReviews.filter(function(review){
                return user.reviews.indexOf(review) === -1;
            })
        })

        return users.map(function(user) {
            return User.findOneAndUpdate({_id: user._id}, {reviews: user.reviews}, {runValidators: true, new: true }).exec()
        })
    })
    .then(function(usersArray) {
        return Promise.all(usersArray);
    }).then(null, console.error.bind(console));
}

function seed () {
    return Promise.all([
        seedCategories(),
        seedMakeAndModels(),
        seedAddresses()
    ])
}

var dbClosure;

    connectToDb.then(function(db){
        db.drop = Promise.promisify(db.db.dropDatabase.bind(db.db));
        dbClosure = db;
    })
    .then(function () {
        dbClosure.drop()
    })
    .then(function(){
        return seed();
    })
    .then(function(seeds){

        var categories = seeds[0],
            makesAndModels = seeds[1],
            addresses = seeds[2];

        return Promise.all([
            seedUsers(addresses, categories),
            seedCars(makesAndModels, categories)
        ]);
    })
    .then(function(seeds) {

        var users = seeds[0],
            cars = seeds[1];

        return Promise.all([
            seedOrders(users, cars),
            seedReviews(users, cars)
        ]);
    })
    .then(function() {
        return giveUsersReviews();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
// });
