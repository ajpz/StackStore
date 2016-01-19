app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            cars: function(DataFactory) {
                return DataFactory.fetchCars();
            }
        }
    });
});

app.controller('HomeCtrl', function($scope, cars, DataFactory, Selection, CartFactory, WishListFactory) {
    Selection.init({
        cars: cars,
        preferences : false
    });
    $scope.message;

    $scope.cars = Selection.display;
    $scope.$on('refreshSelection', function() {
        $scope.cars = Selection.display;
    });

    $scope.addToCart = function(car){
        CartFactory.addToCart(car._id)
        .then(function(){
            $scope.message = 'You added the ' + car.year + ' ' + car.make.make + ' ' + car.model + ' to your cart!';
            return;
        }).then(null, function (err) {
            $scope.message = 'Ooops! We are sorry, your cart was not updated.';
        });
    };

    $scope.addToWishList = function(car){
        WishListFactory.addToWishList(car._id)
        .then(function(){
            $scope.message = 'You added the ' + car.year + ' ' + car.make.make + ' ' + car.model + ' to your Wish List!';
            return;
        }).then(null, function (err) {
            $scope.message = 'Ooops! We are sorry, your Wish List was not updated.';
        });
    };
});
