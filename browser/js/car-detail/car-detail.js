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
    });
});

app.controller('CarCtrl', function($scope, car, reviews, CartFactory, WishListFactory) {

    //ASK MARK: scope of shopping-cart is inside the scope of this template.
    //Does it make sense that the rendered cart borrows from shopping cart
    //scope, before the addToCart method is ever invoked. This allows for cart
    //to be populated early.

    $scope.car = car;
    $scope.reviews = reviews.slice(0,5);

    $scope.addToCart = function(car) {
        CartFactory.addToCart(car)
        .then(function(cart) {
            $scope.cart = cart;
        });
    };

    $scope.addToWishList = function(car) {
        CartFactory.addToWishList(car)
        .then(function(cart) {
            $scope.wishlist = wishlist;
        });
    };
});
