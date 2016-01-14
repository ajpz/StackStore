app.directive('homeSidebar', function(DataFactory) {

    return {
        restrict : 'E',
        scope: {
            categories: '='
        },
        templateUrl : 'js/common/directives/home-sidebar/home-sidebar.html',
        link: function(scope, el, attrs) {

            var categories = el[0].querySelector('#categories');
            angular.element(categories).on("click", function (e) {
               e.preventDefault();
               if (scope.showCategories === true) {
                    scope.showCategories = false;
               } else {
                    scope.showCategories = true;
               }
            });
        },
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
