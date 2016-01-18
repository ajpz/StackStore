app.config( $stateProvider => {

    $stateProvider.state('dashboard.', {
        url: '/categories',
        controller: 'CategoriesCtrl',
        templateUrl: 'js/dashboard/categories/categories.html'
    });

});

app.controller('CategoriesCtrl', ($scope, DataFactory) => {
    $scope.categories;
    DataFactory.fetchCategories()
        .then(categories => {
            $scope.categories = categories;
        });

});
