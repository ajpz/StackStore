app.factory('WishListFactory', function($http, AuthService, $q, $rootScope, AUTH_EVENTS, DataFactory) {

    var wishListFromLocal = JSON.parse(localStorage.getItem('visitingUserWishList'));
    var wishList = wishListFromLocal ?
        wishListFromLocal : {
            status: 'In Wish List',
            car: []
        };

    var saveToDb = function(wishlist) {
        if (wishlist._id) {
            return DataFactory.updateOrder(wishlist._id, wishlist);
        } else {
            return DataFactory.addOrder(wishlist)
                .then(function(savedWishList) {
                    wishList = savedWishList;
                    return wishList;
                });
        }
    };

    var saveToLocal = function(wishlist) {
        localStorage.setItem('visitingUserWishList', JSON.stringify(wishlist));
        return $q.when(wishlist);
    };

    var saveLocalOrDb = function(wishlist) {
        if (AuthService.isAuthenticated()) {
            return $q.when(saveToDb(wishlist));
        } else {
            return saveToLocal(wishlist);
        }
    };

    var refresh = function() {
        // used to refresh upon browser restart, and to reset user
        AuthService.getLoggedInUser()
            .then(function(user) {
                //gets user's db wishlist
                wishList.user = user._id;
                return DataFactory.fetchOrdersForUser(user._id, 'In Wish List');
            })
            .then(function(dbWLArr) {
                //merges local wish list into db wish list
                var dbWL = dbWLArr[0];
                if (dbWL) {
                    dbWL.car = dbWL.car.concat(wishList.car);
                    wishList = dbWL;
                }
                return saveToDb(wishList);
            })
            .then(function(databaseWishList) {
                //saves merged wish list to db
                wishList = databaseWishList;
                localStorage.removeItem('visitingUserWishList');
                $rootScope.$broadcast('LoadWishList', wishList);
                return;
            })
            .then(null, console.error.bind(console));

    };

    var deleteLocalOrDb = function(wishList) {
        if (AuthService.isAuthenticated()) {
            return DataFactory.deleteOrder(wishList._id);
        } else {
            return $q.when(localStorage.removeItem('visitingUserWishList'));
        }
    };

    var destroy = function() {
        wishList = {
            status: 'In Wish List',
            car: []
        };
        $rootScope.$broadcast('LoadWishList', wishList);
    };

    $rootScope.$on(AUTH_EVENTS.loginSuccess, refresh);
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, destroy);

    return {
        getCurrentWishList: function() {
            return wishList; //synchronous!
        },
        addToWishList: function(carId) {
            return $q(function(resolve, reject) {
                if(wishList.car.indexOf(carId) > -1) {
                    reject(new Error('You already have this car in your wish list'));
                } else {
                    wishList.car.push(carId);
                    resolve(saveLocalOrDb(wishList));
                }
            })
        },
        updateWishList: function(carId) {
            var indexToRemove = wishList.car.indexOf(carId);
            wishList.car.splice(indexToRemove, 1);
            return saveLocalOrDb(wishList);
        },
        deleteWishList: function() {
            return deleteLocalOrDb(wishList)
                .then(function() {
                    destroy();
                    return refresh();
                });
        },
        purchaseWishList: function() {
            wishList.status = 'Processing';

            return saveToDb(wishList)
                .then(function() {
                    destroy();
                    return refresh();
                });
        }
    };
});
