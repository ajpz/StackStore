app.config(function($stateProvider) {
    $stateProvider.state('dashboard.orders', {
        url: '/orders',
        controller: 'OrderCtrl',
        templateUrl: 'js/dashboard/orders/orders.html',
        data: {
            authenticate: true
        }
    })

})

app.controller('OrderCtrl', function($scope, DataFactory, AuthService) {

    $scope.orderByField = '-date';
    $scope.reverseSort = false;
    $scope.filterCriteria = {};

    var getAppropriateOrders = function() {
        return AuthService.getLoggedInUser()
        .then(function(user){
            if(!user.isAdmin) return DataFactory.fetchOrdersForUser(user._id)
            return DataFactory.fetchOrders();
        });
    }

    getAppropriateOrders()
    .then(function(orders){
        $scope.orders = orders;
        $scope.emails = orders.reduce(function(emails, order) {
            var email = order.user.email;
            if(emails.indexOf(email) === -1) emails.push(email);
            return emails;
        }, [])


    })


})

