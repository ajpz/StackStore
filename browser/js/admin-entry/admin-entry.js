app.config(function($stateProvider) {
    $stateProvider.state('admin-entry', {
        url: '/admin-entry/',
        controller: 'AdminEntryCtrl',
        templateUrl: 'js/admin-entry/admin-entry.html'
    })
})

app.controller('AdminEntryCtrl', function($scope, $stateParams, DataFactory) {

        $scope.submit = function() {
            return DataFactory.addCar($scope.car)
        }
})

