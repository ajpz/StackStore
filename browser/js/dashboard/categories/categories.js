app.config( $stateProvider => {

    $stateProvider.state('dashboard.categories', {
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

    $scope.removeCategory = categoryId => {
        DataFactory.deleteCategory(categoryId)
            .then(() => {
                let len = $scope.categories.length;
                let indexOfSelected;
                for (let i=0; i < len; i++) {
                    if ($scope.categories[i] === categoryId) {
                        indexOfSelected = i;
                        break;
                    }
                }
                $scope.categories.splice(indexOfSelected, 1);
            })
            .then(null, console.error);
    }

});
