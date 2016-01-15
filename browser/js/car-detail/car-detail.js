app.config(function($stateProvider) {
    $stateProvider.state('car', {
        url: '/cars/:carId',
        controller: 'CarCtrl',
        templateUrl: 'js/car-detail/car-detail.html'
    })

})

app.controller('CarCtrl', function($scope, $stateParams, DataFactory) {
    DataFactory.fetchCar($stateParams.carId)
    .then(function(car){
        $scope.car = car;
    })

})
