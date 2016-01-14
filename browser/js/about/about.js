app.config(function($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });

});

app.controller('AboutController', function($scope, FullstackPics, DataFactory) {
    $scope.images = _.shuffle(FullstackPics);
    // DataFactory.fetchCategories()
    //     .then(categories => {
    //         $scope.categories = categories;
    //     });
    $scope.showCategories = false;
    $scope.categories = [
    {
        _id: "5696bb29d4d75381230664af",
        name: "French Cars",
        __v: 0,
        hide: true,
        subcategories: false,
        cars: []
    }, {
        _id: "5696bb29d4d75381230664af",
        name: "american Cars",
        __v: 0,
        hide: true,
        subcategories: false,
        cars: []
    }, {
        _id: "5696bb29d4d75381230664af",
        name: "japanese Cars",
        __v: 0,
        hide: true,
        subcategories: false,
        cars: []
    }, {
        _id: "5696bb29d4d75381230664af",
        name: "german Cars",
        __v: 0,
        hide: true,
        subcategories: false,
        cars: []
    }]

});
