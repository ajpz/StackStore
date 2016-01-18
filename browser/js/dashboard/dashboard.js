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


});
