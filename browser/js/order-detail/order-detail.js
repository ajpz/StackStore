app.config(function($stateProvider) {
    $stateProvider.state('order', {
        url: '/orders/:orderId',
        controller: 'OrderDetailCtrl',
        templateUrl: 'js/order-detail/order-detail.html'
    })
})

app.controller('OrderDetailCtrl', function($scope, $stateParams, DataFactory) {
        DataFactory.fetchOrder($stateParams.orderId)
        .then(function(order){
            $scope.order = order;
            $scope.car = order.car;
        })

})
