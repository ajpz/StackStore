app.factory('CartFactory', function($http, AuthService, $q, $rootScope, AUTH_EVENTS, DataFactory) {

    //SUPER IMPORTANT: to have CartFactory actually
    //register listeners on loginSuccess, CartFactory
    //must be injected into a state. If not, it won't be
    //loaded upon refresh, and the state won't ahve access
    //to the refreshed cart. Better way to handle this?

    var localStorageCart = JSON.parse(localStorage.getItem('visitingUserCart'));
    var shoppingCart = localStorageCart ?
            localStorageCart :
            { status: 'Created', car: [] };

    var saveShoppingCartToDb = function(cartToSave){
        if(cartToSave._id) {
            return DataFactory.updateOrder(cartToSave._id, cartToSave);
        } else {
            return DataFactory.addOrder(cartToSave)
            .then(function(savedCart) {
                shoppingCart = savedCart;
                return shoppingCart;
            })
        }
    };

    var refreshShoppingCart = function(){

        AuthService.getLoggedInUser()
        .then(function(user) {
            //gets user's db cart, ie. where orderStatus === 'Created'
            shoppingCart.user = user._id;
            return DataFactory.fetchOrdersForUser(user._id, 'Created')
        })
        .then(function(databaseCartArr) {
            //merges local cart into db cart
            var dbCart = databaseCartArr[0];
            if(dbCart) {
                dbCart.car = dbCart.car.concat(shoppingCart.car);
                shoppingCart = dbCart;
            }
            return saveShoppingCartToDb(shoppingCart);
        })
        .then(function(databaseCart) {
            //saves merged cart to db
            shoppingCart = databaseCart;
            localStorage.removeItem('visitingUserCart');
            $rootScope.$broadcast('LoadCart', shoppingCart);
            return;
        })
        .then(null, console.error.bind(console));

    };

    var destroyShoppingCart = function(){
        shoppingCart = { status: 'Created', car: [] };
        $rootScope.$broadcast('LoadCart', shoppingCart);
    }

    var updateLocalOrDbStorage = function(shoppingCart) {
        if(AuthService.isAuthenticated()) {
            return $q.when(saveShoppingCartToDb(shoppingCart))
        } else {
            localStorage.setItem('visitingUserCart', JSON.stringify(shoppingCart));
            return $q.when(shoppingCart);
        }
    };


    $rootScope.$on(AUTH_EVENTS.loginSuccess, refreshShoppingCart);
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, destroyShoppingCart);

    return {
        getCurrentCart: function(){
            return shoppingCart; //synchronous!
        },
        addToCart: function(car){
            shoppingCart.car.push(car._id);
            return updateLocalOrDbStorage(shoppingCart);
        },
        updateCart: function(carId){
            var indexToRemove = shoppingCart.car.indexOf(carId);
            shoppingCart.car.splice(indexToRemove, 1);
            return updateLocalOrDbStorage(shoppingCart);
        },
        deleteCart: function(){
            if(shoppingCart.user) return $q.when(localStorage.removeItem('visitingUserCart'));
            else return DataFactory.deleteOrder(shoppingCart._id);
        }
    }
});


/*

Shared functionality

-- can create new order
-- can add to existing order
-- can update order
-- can delete order

displays as shopping cart, when created
displays as purchase page
converts to firm order and sends/sets auto-emails

Order Routes:
- need to populate user/car(s) on GET routes
- need

*/
