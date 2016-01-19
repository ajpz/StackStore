app.factory('CartFactory', function($http, AuthService, $q, $rootScope, AUTH_EVENTS, DataFactory) {

    console.log('GOT TO CART FACTORY')
    //SUPER IMPORTANT: to have CartFactory actually
    //register listeners on loginSuccess, CartFactory
    //must be injected into a state. If not, it won't be
    //loaded upon refresh, and the state won't ahve access
    //to the refreshed cart. Better way to handle this?

    var cartFromLocal = JSON.parse(localStorage.getItem('visitingUserCart'));
    var shoppingCart = cartFromLocal ?
        cartFromLocal : {
            status: 'Created',
            car: []
        };

    var saveToDb = function(cart) {
        console.log('save to db invoked')
        if (cart._id) {
            return DataFactory.updateOrder(cart._id, cart);
        } else {
            return DataFactory.addOrder(cart)
                .then(function(savedCart) {
                    shoppingCart = savedCart;
                    return shoppingCart;
                });
        }
    };

    var saveToLocal = function(cart) {
        localStorage.setItem('visitingUserCart', JSON.stringify(cart));
        return $q.when(cart);
    };

    var saveLocalOrDb = function(cart) {
        if (AuthService.isAuthenticated()) {
            return $q.when(saveToDb(cart));
        } else {
            return saveToLocal(cart); //NEED TO PROMISIFY?
        }
    };

    var refresh = function() {
        // used to refresh upon browser restart, and to reset user
        AuthService.getLoggedInUser()
            .then(function(user) {
                //gets user's db cart
                shoppingCart.user = user._id;
                return DataFactory.fetchOrdersForUser(user._id, 'Created');
            })
            .then(function(dbCartArr) {
                //merges local cart into db cart
                var dbCart = dbCartArr[0];
                if (dbCart) {
                    dbCart.car = dbCart.car.concat(shoppingCart.car);
                    shoppingCart = dbCart;
                }
                return saveToDb(shoppingCart);
            })
            .then(function(databaseCart) {
                //saves merged cart to db
                shoppingCart = databaseCart;
                localStorage.removeItem('visitingUserCart');
                $rootScope.$broadcast('LoadCart', shoppingCart);
                return 'bob';
            })
            .then(null, console.error.bind(console));

    };

    var deleteLocalOrDb = function(shoppingCart) {
        if (AuthService.isAuthenticated()) {
            return DataFactory.deleteOrder(shoppingCart._id);
        } else {
            return $q.when(localStorage.removeItem('visitingUserCart'));
        }
    };

    var destroy = function() {
        shoppingCart = {
            status: 'Created',
            car: []
        };
        $rootScope.$broadcast('LoadCart', shoppingCart);
    };

    $rootScope.$on(AUTH_EVENTS.loginSuccess, refresh);
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, destroy);

    return {
        getCurrentCart: function() {
            return shoppingCart; //synchronous!
        },
        addToCart: function(car) {
            shoppingCart.car.push(car._id);
            return saveLocalOrDb(shoppingCart);
        },
        updateCart: function(carId) {
            var indexToRemove = shoppingCart.car.indexOf(carId);
            shoppingCart.car.splice(indexToRemove, 1);
            return saveLocalOrDb(shoppingCart);
        },
        deleteCart: function() {
            return deleteLocalOrDb(shoppingCart)
                .then(function() {
                    destroy();
                    return refresh();
                });
        },
        purchaseCart: function() {
            console.log('Got here!!!!!!!!!!!!!!!!!!!!')
            alert("blah");
            shoppingCart.status = 'Processing';
            console.log('about to update to processing', shoppingCart);
            return saveToDb(shoppingCart)
                .then(function(order){
                    console.log('aboout to fetch');
                    return DataFactory.fetchOrder(order._id)
                })
                // .then(function(populatedOrder){
                //     console.log('about to send email');
                //     var emailText = {
                //         greeting: 'Hello!',
                //         body: 'Thank you for your recent purchase!',
                //         goodbye: "You'll hear from us again once the order is complete",
                //         message: 'Is now in process'
                //     }
                //     return DataFactory.sendEmail(order, emailText);
                // })
                .then(function() {
                    destroy();
                    return refresh();
                }).then(null, console.error.bind(console));
        }
    };
});
