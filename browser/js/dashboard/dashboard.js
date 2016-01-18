app.config( $stateProvider => {

    $stateProvider.state('dashboard', {
        url: '/users/:userId/preferences',
        controller: 'DashboardCtrl',
        templateUrl: 'js/dashboard/dashboard.html',
        resolve : {
            user() {
                return DataFactory.fetchUser();
            }
        }
    });

});

app.controller('DashboardCtrl', ($scope, $stateParams, DataFactory, AuthService, user) => {
    $scope.user = user;
    $scope.goTo = {
        reviews() {
            $state.go('dashboard.reviews');
        },
        orders() {
            $state.go('dashboard.orders');
        },
        acctDetails() {
            $state.go('dashboard.acctDetails');
        },
        users() {
            $state.go('dashboard.users');
        },
        cars() {
            $state.go('dashboard.cars');
        },
        cars() {
            $state.go('dashboard.cars');
        }
    }

});
