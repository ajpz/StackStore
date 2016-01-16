app.config(function($stateProvider) {
    $stateProvider.state('car', {
        url: '/cars/:carId',
        controller: 'CarCtrl',
        templateUrl: 'js/car-detail/car-detail.html',
        resolve: {
            car: function(DataFactory, $stateParams, CartFactory){
                return DataFactory.fetchCar($stateParams.carId)
            }
        }
    })
})

app.controller('CarCtrl', function($scope, car, CartFactory) {

    //ASK MARK: scope of shopping-cart is inside the scope of this template.
    //Does it make sense that the rendered cart borrows from shopping cart
    //scope, before the addToCart method is ever invoked. This allows for cart
    //to be populated early.

    $scope.car = car;

    $scope.addToCart = function(car) {

        CartFactory.addToCart(car)
        .then(function(cart) {
            $scope.cart = cart;
        })

    }

})
