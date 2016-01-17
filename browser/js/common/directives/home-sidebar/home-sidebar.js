app.directive('homeSidebar', DataFactory => {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/home-sidebar/home-sidebar.html',
        link(scope, el, attrs) {},
        controller($scope, DataFactory, Selection) {

            DataFactory.fetchCategories()
                .then(categories => {
                    $scope.categories = categories;
                });

            DataFactory.fetchMakesAndModels()
                .then(makes => {
                    $scope.makes = makes;
                });

            $scope.colors = ['Black', 'White', 'Silver', 'Grey', 'Red', 'Blue'];

            $scope.show = {
                categories : false,
                year : false,
                makes : false,
                color: false,
            };

            $scope.year = {
                min : 1920,
                max : 2016
            };

            $scope.toggle = menuOption => {
                Selection.reset();
                if ($scope.show[menuOption]) {
                    $scope.show[menuOption] = false;
                }
                else {
                    $scope.show[menuOption] = true;
                }
            }

            $scope.selectCategory = category => {
                Selection.filterOnCategory(category._id);
            };

            $scope.selectMake = () => {
                Selection.filterOnMake($scope.select.make);
                $scope.models = JSON.parse($scope.select.make).models;
            };

            $scope.selectModel = () => {
                Selection.filterOnModel($scope.select.model);
            };

            $scope.selectYear = () => {
                Selection.filterOnYear($scope.year.min, $scope.year.max);
            },

            $scope.selectColor = () => {
                Selection.filterOnColor($scope.select.color);
            }

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
