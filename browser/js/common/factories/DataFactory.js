app.factory('DataFactory', function($http) {

    var extractData = res => res.data;

    return {
        // cars....
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
        // categories...
        fetchCategories() {
            return $http.get('/api/categories')
            .then(extractData)
        },
        addCategory(category){
            return $http.post('api/categories', category)
            .then(extractData)
        },
        updatedCategory(categoryId, update){
            return $http.poast('api/categories' + categoryId.toString(), update)
            .then(extractData);
        },
        deleteCategory(categoryId) {
            return $http.delete('/api/cars/' + categoryId.toString())
            .then(extractData);
        },
        // orders...
        fetchOrders() {
            return $http.get('/api/orders/')
            .then(extractData)
        },
        fetchOrder(orderId) {
            return $http.get('/api/orders/' + orderId.toString())
            .then(extractData)
        },
        addOrder(order) {
            return $http.post('/api/orders/', order)
            .then(extractData)
        },
        updateOrder(orderId, update) {
            return $http.put('/api/orders/' + orderId.toString(), update)
            .then(extractData)
        },
        deleteOrder(orderId) {
            return $http.delete('/api/cars/' + orderId.toString())
            .then(extractData);
        },
        // users...
        fetchUsers() {
            return $http.get('/api/users/')
            .then(extractData)
        },
        fetchUser(userId) {
            return $http.get('/api/users/' + userId.toString())
            .then(extractData);
        },
        addUser(userId) {
            return $http.post('/api/users/', car)
            .then(extractData);
        },
        updateUser(userId, update) {
            return $http.put('/api/users/' + userId.toString(), update)
            .then(extractData);
        },
        deleteUser(userId) {
            return $http.delete('/api/users/' + userId.toString())
            .then(extractData);
        },


    };
});
