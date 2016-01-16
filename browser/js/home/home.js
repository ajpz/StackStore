app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            cars: function(DataFactory, CartFactory) {
                return DataFactory.fetchCars();
            }
        }
    });
});

app.controller('HomeCtrl', function($scope, cars, DataFactory, Selection) {
    Selection.init({
        cars: cars,
        preferences : false
    });
    $scope.cars = Selection.display;
    $scope.$on('refreshSelection', function() {
        $scope.cars = Selection.display;
    });
})
