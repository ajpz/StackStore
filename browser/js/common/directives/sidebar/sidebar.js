app.directive('sidebar', function(categoryFactory) {

    return {
        restrict : 'E',
        // scope: {
        //     categories: '@'
        // },
        templateUrl : 'js/common/directives/sidebar/sidebar.html',
        link: function(scope, el, attrs) {

        },
    }
});
