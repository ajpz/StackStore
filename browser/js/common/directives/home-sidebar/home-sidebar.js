app.directive('homeSidebar', DataFactory => {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/home-sidebar/home-sidebar.html',
        link(scope, el, attrs) {
        },
        controller($scope, DataFactory, Selection) {
            $scope.test = (make) => {
                console.log(make);
            }
            $scope.categories = false;
            $scope.showMakes = false;
            $scope.showModels = false;
            $scope.toggleCategory = () => {
                Selection.reset();
                if ($scope.showCategories === false) {
                    $scope.showCategories = true
                } else {
                    $scope.showCategories = false;
                }
            };
            $scope.toggleMake = () => {
                Selection.reset();
                if ($scope.showMakes === false) {
                    $scope.showMakes = true
                } else {
                    $scope.showMakes = false;
                }
            };
            $scope.changeCategory = category => {
                Selection.filterOnCategory(category._id)
            };
            $scope.selectMake = () => {
                Selection.filterOnMake($scope.select.make);
                $scope.models = JSON.parse($scope.select.make).models;
            };
            $scope.selectModel = () => {
                Selection.filterOnModel($scope.select.model);
            }
            DataFactory.fetchCategories()
                .then(categories => {
                    $scope.categories = categories;
                });
            //TODO UNCOMMENT WHEN ROUTE IS UP
            // DataFactory.fetchMakesAndModels()
            //     .then(makes => {
            //         $scope.makes = makes;
            //     });
            $scope.makes = [
            {
                make: "toyota",
                models: ["corolla", "prius"]
            },
            {
                make: "ford",
                models: ["Mustang", "focus"],
                _id: "56985b576ceafdce3729cd44"
            }
        ]

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
