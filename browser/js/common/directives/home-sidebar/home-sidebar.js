app.directive('homeSidebar', function(DataFactory) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/home-sidebar/home-sidebar.html',
        link: function(scope, el, attrs) {
        },
        controller: function($scope, DataFactory, Selection) {
            $scope.changeCategory = function(category) {
                Selection.category(category._id)
            };
            $scope.showCategories = false;
            $scope.toggle = function() {
                if ($scope.showCategories === false) {
                    $scope.showCategories = true
                } else {
                    $scope.showCategories = false;
                }
            };
            DataFactory.fetchCategories()
                .then(function(categories) {
                    $scope.categories = categories;
                });
        }
    }
});
// MAKE TWO SIDEBARS.....

// in Homepage(cars) view....

// categories dropdown
// price slider (min/max)
// make dropdown
// model dropdown
// year slider (min/max)
// color (drop down)
// kickassfactor
// in Account Maintenance USER view...
// (buttons/links to show user...)

// order history
// preferences
// reviews
// contact information
// passwords
// in Account Maintenance ADMIN view...

// user management
// order management : filter by status in view itself
// product management: takes you to product list with options to edit existing or create new (plus add inventory information)
