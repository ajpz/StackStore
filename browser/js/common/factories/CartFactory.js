app.factory('CartFactory', function($http, AuthService, $q, $rootScope, AUTH_EVENTS, DataFactory) {


    // var self = this;
    var currentUser = null;
    var shoppingCart = { status: 'Created', car: [] };

    var refreshShoppingCart = function(user){
        AuthService.getLoggedInUser()
        .then(function(user) {
            currentUser = user;
            return DataFactory.fetchOrdersForUser(user._id, 'Created')
        })
        .then(function(cart) {
            if(cart.length > 0) shoppingCart = cart[0];
            $rootScope.$broadcast('LoadCart', shoppingCart);
            return shoppingCart;
        })
        .then(null, console.error.bind(console));

    };

    var destroyShoppingCart = function(){
        currentUser = null;
        shoppingCart = { status: 'Created', car: [] };
    }

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
        refreshShoppingCart();
    });
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
        destroyShoppingCart();
    });

    return {
        getCurrentCart: function(){
            return shoppingCart; //synchronous!
        },
        addToCart: function(car){

            shoppingCart.car.push(car._id);

            if(AuthService.isAuthenticated()) {

                var saveShoppingCartToDb = function(cartToSave){
                    if(cartToSave._id) {
                        return DataFactory.updateOrder(cartToSave._id, cartToSave);
                    } else {
                        return DataFactory.addOrder(cartToSave);
                    }
                };

                return $q.when(saveShoppingCartToDb(shoppingCart))
                .then(function(savedOrder){
                    console.log("SAVED order: ",  savedOrder);
                    return shoppingCart = savedOrder;
                })

            } else {
                // save changes to local storage
                console.log('order FACTORY: USER n/a AND SAVE');
                return $q.when(order);
            }
        },
        updateCart: function(){},
        deleteCart: function(){}
    }
});


/*
UnAuth Users [local storage or session storage]




Auth Users [user object on server has reference to order]


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
