app.config(function($stateProvider) {
    $stateProvider.state('car', {
        url: '/cars/:carId',
        controller: 'CarCtrl',
        templateUrl: 'js/car-detail/car-detail.html',
        resolve: {
            car: function(DataFactory, $stateParams){
                return DataFactory.fetchCar($stateParams.carId)
            },
            reviews: function(DataFactory, $stateParams){
                return DataFactory.fetchReviews({name: "car", id: $stateParams.carId})
            }
        }
    })
})

app.controller('CarCtrl', function($scope, car, reviews, CartFactory) {

    //ASK MARK: scope of shopping-cart is inside the scope of this template.
    //Does it make sense that the rendered cart borrows from shopping cart
    //scope, before the addToCart method is ever invoked. This allows for cart
    //to be populated early.

    $scope.message;
    $scope.car = car;
    $scope.reviews = reviews.slice(0,5);

    $scope.addToCart = function(car) {

        CartFactory.addToCart(car)
        .then(function(cart) {
            $scope.cart = cart;
        }).then(null, function(err) {
            $scope.message = err.message;
        })

    }

    $scope.messageExists = function() {return $scope.message; };

})
