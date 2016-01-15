app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            cars: function(DataFactory) {
                return DataFactory.fetchCars();
            }
        }
    });
});

app.controller('HomeCtrl', function($scope, cars, DataFactory, Selection) {
    Selection.cars = cars;
    Selection.reset();
    $scope.cars = Selection.display;
    $scope.$on('categorySelected', function() {
        $scope.cars = Selection.display;
    });
})

/*************************/
/*TESTS FOR DataFactory!!!*/
/*************************/

