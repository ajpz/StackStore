app.directive('sidebar', function(DataFactory) {

    return {
        restrict : 'E',
        scope: {
            categories: '='
        },
        templateUrl : 'js/common/directives/sidebar/sidebar.html',
        link: function(scope, el, attrs) {
            // DataFactory.fetchCategories()
            //     .then(categories => {
            //         scope.categories = categories;
            //     });
        },
    }
});
