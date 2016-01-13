app.directive('sidebar', function(DataFactory) {

    return {
        restrict : 'E',
        templateUrl : 'js/common/directives/sidebar/sidebar.html',
        link: function(scope, el, attrs) {
            scope.categories = attrs.categories;
        },
    }
});
