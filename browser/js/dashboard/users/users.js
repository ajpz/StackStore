app.config( $stateProvider => {

    $stateProvider.state('dashboard.users', {
        url: '/dashboard/:userId/users',
        controller: 'UsersCtrl',
        templateUrl: 'js/dashboard/users/users.html',
        resolve : {
            users() {
                return DataFactory.fetchUsers();
            }
        }
    });

});

app.controller('UsersCtrl', (users) => {
    $scope.users = users;
})
