app.config(function($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });

});

app.controller('AboutController', function($scope, FullstackPics, DataFactory) {
    // $scope.images = _.shuffle(FullstackPics);
    // DataFactory.fetchCategories()
    //     .then(categories => {
    //         $scope.categories = categories;
    //     });

});
