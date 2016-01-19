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
    $scope.editCar = {
        make: null,
        model: null,
        year: null,
        color: null,
        condition: null,
        mileage: null,
        categories: [],
        horespower: null,
        acceleration: null,
        price: null,
        count: null,
        rawUrls: null
    };

    $scope.show = {
        add: false,
        edit: false
    };
    $scope.showAddForm = () => {
        $scope.show.add === true ? $scope.show.add = false : $scope.show.add = true;
    };
    $scope.showEditForm = () => {
        $scope.show.edit === true ? $scope.show.edit = false : $scope.show.edit = true;
    };

    $scope.removeCar = carId => {
        DataFactory.deleteCar(carId)
            .then(car => {
                let len = $scope.cars.length;
                let indexOfSelected;
                for (let i = 0; i < len; i++) {
                    if ($scope.cars[i]._id === car._id) {
                        indexOfSelected = i;
                        break;
                    }
                }
                $scope.cars.splice(indexOfSelected, 1);
            })

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
            make: $scope.newCar.make._id,
            model: $scope.newCar.model,
            year: $scope.newCar.year,
            color: $scope.newCar.color,
            condition: $scope.newCar.condition,
            mileage: $scope.newCar.mileage,
            photos: $scope.newCar.rawUrls.trim().split(","),
            categories: [$scope.newCar.categories._id],
            horsepower: $scope.newCar.horsepower,
            acceleration: $scope.newCar.acceleration,
            price: $scope.newCar.price,
            count: $scope.newCar.count,
        }
        DataFactory.addCar(car)
            .then((car) => {
                $scope.cars.push(car);
                $scope.show.add = false;
                $scope.show.edit = false;
            });
    }

    $scope.editCurrentCar = (car) => {
        $scope.showEditForm();
        $scope.show.add = false;
        $scope.show.edit = true;
        $scope.editCar = {
            make: car.make.make,
            model: car.model,
            year: car.year,
            color: car.color,
            condition: car.color,
            mileage: car.mileage,
            categories: car.categories,
            horespower: car.horespower,
            acceleration: car.acceleration,
            price: car.price,
            count: car.count,
            photos: car.photos.join(", ")
        };
    }

})
