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

app.controller('HomeCtrl', function($scope, cars, DataFactory) {

    $scope.cars = cars;

    var newCarDetails = {"make":"5696b37ac64dfed61c8ca3a8","model":"Mustang","year":1970,"color":"Black","condition":"Poor","mileage":86000,"horsePower":200,"acceleration":5.2,"kickassFactor":5,"price":93000,"__v":0,"count":1,"categoryIds":["5696b37ac64dfed61c8ca3a6"],"photos":[]}

    var updateDetails = {"condition":"Good"};

    $scope.addCar = function() {
        DataFactory.addCar(newCarDetails)
        .then(function(savedCar) {
            console.log('the saved car is ', savedCar);
            $scope.newCar = savedCar;
        })
    }

    $scope.updateCar = function() {
        DataFactory.updateCar($scope.newCar._id, updateDetails)
        .then(function(updatedCar) {
            $scope.updatedCar = updatedCar;
        })
    }

    $scope.deleteCar = function() {
        DataFactory.deleteCar($scope.newCar._id)
        .then(function(deletedCar) {
            $scope.deletedCar = deletedCar;
        })
    }
})

/*************************/
/*TESTS FOR DataFactory!!!*/
/*************************/

