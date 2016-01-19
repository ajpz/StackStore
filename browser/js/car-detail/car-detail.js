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
            },
            user : function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('CarCtrl', function($scope, car, reviews, user, CartFactory, WishListFactory, DataFactory) {

    //ASK MARK: scope of shopping-cart is inside the scope of this template.
    //Does it make sense that the rendered cart borrows from shopping cart
    //scope, before the addToCart method is ever invoked. This allows for cart
    //to be populated early.

    $scope.message;
    $scope.car = car;
    $scope.reviews = reviews.slice(0,5);
    $scope.showForm = false;
    $scope.newReview;
    $scope.addToCart = function(car) {
        CartFactory.addToCart(car)
        .then(function(cart) {
            $scope.cart = cart;
        })
        .then(null, function(err) {
            console.log('caught error here!')
            $scope.message = err.message;
        })
    };


    $scope.toggleForm = function() {
        $scope.showForm === true ? $scope.showForm = false : $scope.showForm = true;
    };

    $scope.messageExists = function() {return $scope.message; };

    $scope.submitReview = function() {
        if (!user) {
            alert("Sorry, you must be logged in to leave a review!");
            return;
        }
        $scope.newReview.user = user._id;
        $scope.newReview.car = $scope.car._id
        DataFactory.addReview($scope.newReview)
            .then(function(review) {
                $scope.reviews.pop();
                $scope.reviews.unshift(review);
                $scope.toggleForm();
            })
            .then(null, console.error.bind(console));
    };
    $scope.addToWishList = function(car) {
        WishListFactory.addToWishList(car)
        .then(function(wishlist) {
            $scope.wishlist = wishlist;
        });
    };
});
