app.factory('DataFactory', function($http) {

    var extractData = res => res.data;

    return {
        // cars....
        fetchCars() {
            return $http.get('/api/cars')
            .then(extractData)
        },
        fetchCar(carId) {
            return $http.get(`/api/cars/${carId}`)
            .then(extractData);
        },
        addCar(car) {
            return $http.post('/api/cars', car)
            .then(extractData);
        },
        updateCar(carId, update) {
            return $http.put(`/api/cars/${carId}`, update)
            .then(extractData);
        },
        deleteCar(carId) {
            return $http.delete(`/api/cars/${carId}`)
            .then(extractData);
        },
        // categories...
        fetchCategories() {
            return $http.get('/api/categories')
            .then(extractData)
        },
        fetchCategory(categoryId) {
            return $http.get(`/api/categories/${categoryId}`)
            .then(extractData)
        },
        addCategory(category){
            return $http.post('/api/categories', category)
            .then(extractData)
        },
        updateCategory(categoryId, update){
            return $http.put(`/api/categories/${categoryId}`, update)
            .then(extractData);
        },
        deleteCategory(categoryId) {
            return $http.delete(`/api/categories/${categoryId}`)
            .then(extractData);
        },
        // orders...
        fetchOrders() {
            return $http.get('/api/orders/')
            .then(extractData)
        },
        fetchOrdersForUser(userId, orderStatus) {
            var query = {
                user: userId
            };
            if(orderStatus) query.status = orderStatus;
            return $http.get('/api/orders/', {params: query})
            .then(extractData)
        },
        fetchOrder(orderId) {
            return $http.get(`/api/orders/${orderId}`)
            .then(extractData)
        },
        addOrder(order) {
            return $http.post('/api/orders/', order)
            .then(extractData)
        },
        updateOrder(orderId, update) {
            return $http.put(`/api/orders/${orderId}`, update)
            .then(extractData)
        },
        deleteOrder(orderId) {
            return $http.delete(`/api/orders/${orderId}`)
            .then(extractData);
        },
        sendEmail(order, emailObj) {
            var body = {order: order, emailObj: emailObj}
            return $http.post('/api/orders/sendEmail', body)
            .then(extractData)
        },
        // users...
        fetchUsers() {
            return $http.get('/api/users/')
            .then(extractData)
        },
        fetchUser(userId) {
            return $http.get(`/api/users/${userId}`)
            .then(extractData);
        },
        addUser(user) {
            return $http.post('/api/users/', user)
            .then(extractData);
        },
        updateUser(userId, update) {
            return $http.put(`/api/users/${userId}`, update)
            .then(extractData);
        },
        deleteUser(userId) {
            return $http.delete(`/api/users/${userId}`)
            .then(extractData);
        },
        // reviews...
        // query --> {name: <car/user>, id: <carId/userId> }
        fetchReviews(queryObj) {
            var queryString = queryObj.name + '=' + queryObj.id;
            console.log('dtaFactory ', queryString)
            return $http.get('/api/reviews' + '?' + queryString)
            .then(extractData)
        },
        addReview(review) {
            return $http.post('/api/reviews', review)
            .then(extractData);
        },
        updateReview(reviewId, update) {
            return $http.put(`/api/reviews/${reviewId}`, update)
            .then(extractData);
        },
        deleteReview(reviewId) {
            return $http.delete(`/api/reviews/${reviewId}`)
            .then(extractData);
        },
        //makesAndModels
        fetchMakesAndModels() {
            return $http.get('/api/makes')
            .then(extractData);
        },
        //address...
        updateAddress(addressId, update) {
            return $http.put(`/api/addresses/${addressId}`, update)
            .then(extractData);
        }
    };
});
