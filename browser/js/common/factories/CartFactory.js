app.factory('CartFactory', function($http, AuthService, $q, $rootScope, AUTH_EVENTS) {

    //need to refresh cart at browser load - either from
    //local storage or from server depending on User

    var user;

    console.log('CART FACTORY INVOKED', user);
    var cart = { car: [] };

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
        console.log('HEARD TAHT')
        AuthService.getLoggedInUser()
        .then(function(user) {
            user = user; //null or user object
        });
    })

    return {
        addToCart: function(car){

            // var user = AuthService.getLoggedInUser();
            cart.car.push(car._id);

            if(AuthService.isAuthenticated()) {
                // save changes to db
                console.log('CART FACTORY: USER AUTH AND HTTP')
            } else {
                // save changes to local storage
                console.log('CART FACTORY: USER n/a AND SAVE')
            }

            return $q.when(cart);
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
