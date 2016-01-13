app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            cars: function(CarFactory) {
                return CarFactory.fetchCars();
            },
            car: function(CarFactory) {
                return CarFactory.fetchCar('5696b37bc64dfed61c8ca3b0');
            }
        }
    });
});

app.controller('HomeCtrl', function($scope, cars, car, CarFactory) {

    $scope.cars = cars;
    $scope.car = car;

    var newCarDetails = {"make":"5696b37ac64dfed61c8ca3a8","model":"Mustang","year":1970,"color":"Black","condition":"Poor","mileage":86000,"horsePower":200,"acceleration":5.2,"kickassFactor":5,"price":93000,"__v":0,"count":1,"categoryIds":["5696b37ac64dfed61c8ca3a6"],"photos":[]}

    var updateDetails = {"condition":"Good"};

    $scope.addCar = function() {
        CarFactory.addCar(newCarDetails)
        .then(function(savedCar) {
            console.log('the saved car is ', savedCar);
            $scope.newCar = savedCar;
        })
    }

    $scope.updateCar = function() {
        CarFactory.updateCar($scope.newCar._id, updateDetails)
        .then(function(updatedCar) {
            $scope.updatedCar = updatedCar;
        })
    }

    $scope.deleteCar = function() {
        CarFactory.deleteCar($scope.newCar._id)
        .then(function(deletedCar) {
            $scope.deletedCar = deletedCar;
        })
    }
})

/*************************/
/*TESTS FOR CarFactory!!!*/
/*************************/

