app.config( $stateProvider => {

    $stateProvider.state('dashboard', {
        url: '/dashboard/:userId',
        controller: 'DashboardCtrl',
        templateUrl: 'js/dashboard/dashboard.html',
        resolve : {
            user($stateParams, DataFactory) {
                return DataFactory.fetchUser($stateParams.userId);
            }
        }
    });

});

app.controller('DashboardCtrl', ($scope, $state, DataFactory, AuthService, user) => {

    $scope.user = user;
    $scope.isAdmin = AuthService.isAdmin;

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
    };

});
