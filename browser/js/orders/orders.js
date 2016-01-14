app.config(function($stateProvider) {
    $stateProvider.state('orders', {
        url: '/orders?userId',
        controller: 'OrderCtrl',
        templateUrl: 'js/orders/orders.html'
    })

})

app.controller('OrderCtrl', function($scope, $stateParams, DataFactory) {
    DataFactory.fetchOrdersForUser($stateParams.userId)
    .then(function(orders){
        $scope.orders = orders;
    })


})

