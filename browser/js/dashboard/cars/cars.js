app.config($stateProvider => {

    $stateProvider.state('dashboard.cars', {
        url: '/cars',
        controller: 'CarsCtrl',
        templateUrl: 'js/dashboard/cars/cars.html',
        resolve: {
            cars(DataFactory) {
                return DataFactory.fetchCars();
            }
        }
    });

});

app.controller('CarsCtrl', ($scope, DataFactory, cars) => {
    $scope.cars = cars;
    $scope.makes;
    $scope.models;
    $scope.newCar = {
        make: null,
        model: null,
        year: null,
        color: "Black",
        condition: "Excellent",
        mileage: null,
        categories: [],
        horespower: null,
        acceleration: null,
        price: null,
        count: null,
        rawUrls: null
    };

    $scope.removeCar = carId => {
        let len = $scope.cars.length;
        let indexOfSelected;
        for (let i = 0; i < len; i++) {
            if ($scope.cars[i]._id === carId) {
                indexOfSelected = i;
                break;
            }
        }
        $scope.cars.splice(indexOfSelected, 1);
        return DataFactory.deleteCar(carId);
    }

    DataFactory.fetchMakesAndModels()
        .then(makes => {
            $scope.makes = makes;
        });

    DataFactory.fetchCategories()
        .then(categories => {
            $scope.categories = categories
        });

    $scope.addCar = () => {
        let car = {
            make: (() => $scope.newCar.make._id)(),
            model: $scope.newCar.model,
            year: $scope.newCar.year,
            color: $scope.newCar.color,
            condition: $scope.newCar.condition,
            mileage: $scope.newCar.mileage,
            photos: (() => $scope.newCar.rawUrls.trim().split(","))(),
            categories: (() => [$scope.newCar.categories._id])(),
            horsepower: $scope.newCar.horsepower,
            acceleration: $scope.newCar.acceleration,
            price: $scope.newCar.price,
            count: $scope.newCar.count,
        }
        DataFactory.addCar(car)
            .then((car) => {
                $scope.cars.push(car);
            });
    }

})
