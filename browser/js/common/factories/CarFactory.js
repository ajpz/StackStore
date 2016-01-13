app.factory('CarFactory', function($http) {

    var extractData = res => res.data;

    return {
        fetchCars: function() {
            return $http.get('/api/cars/')
            .then(extractData)
        },
        fetchCar: function(carId) {
            return $http.get('/api/cars/' + carId.toString())
            .then(extractData);
        },
        addCar: function(car) {
            return $http.post('/api/cars/', car)
            .then(extractData);
        },
        updateCar: function(carId, update) {
            return $http.put('/api/cars/' + carId.toString(), update)
            .then(extractData);
        },
        deleteCar: function(carId) {
            return $http.delete('/api/cars/' + carId.toString())
            .then(extractData);
        }
    }
})
