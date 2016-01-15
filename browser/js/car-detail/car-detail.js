app.config(function($stateProvider) {
    $stateProvider.state('car', {
        url: '/cars/:carId',
        controller: 'CarCtrl',
        templateUrl: 'js/car-detail/car-detail.html'
    })

})

app.controller('CarCtrl', function($scope, $stateParams, $state, DataFactory, CartFactory) {

    $scope.cart;

    DataFactory.fetchCar($stateParams.carId)
    .then(function(car){
        $scope.car = car;
    })

    $scope.addToCart = function(car) {
      CartFactory.addToCart(car)
      .then(function(cart) {
        $scope.cart = cart;
        // $state.go('car');
      })
    }

})
