app.config(function($stateProvider, DataFactory) {
    $stateProvider.state('order', {
        url: '/admin-entry/',
        controller: 'AdminEntryCtrl',
        templateUrl: 'js/admin-entry/admin-entry.html',
        scope: {
            car: "="
        }
        link: function(scope) {
            scope.submit = DataFactory.addCar
        }
    })
})

app.controller('AdminEntryCtrl', function($scope, $stateParams, DataFactory) {
        DataFactory.fetchOrder($stateParams.orderId)
        .then(function(order){
            $scope.order = order;
            $scope.car = order.car;
        })

})
