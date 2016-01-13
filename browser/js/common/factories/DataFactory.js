app.factory('DataFactory', function($http) {

    var extractData = res => res.data;

    return {
        fetchCars() {
            return $http.get('/api/cars/')
            .then(extractData)
        },
        fetchCar(carId) {
            return $http.get('/api/cars/' + carId.toString())
            .then(extractData);
        },
        addCar(car) {
            return $http.post('/api/cars/', car)
            .then(extractData);
        },
        updateCar(carId, update) {
            return $http.put('/api/cars/' + carId.toString(), update)
            .then(extractData);
        },
        deleteCar(carId) {
            return $http.delete('/api/cars/' + carId.toString())
            .then(extractData);
        },
        fetchCategory() {
            return $http.get('/api/categories')
            .then(extractData)
        },
        addCategory(){
            return $http.post('api/categories', category)
            .then(extractData)
        }
    };
});
