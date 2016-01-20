app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, DataFactory, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendSignup = function (login) {

        $scope.error = null;

        DataFactory.checkUser(login.email)
        .then(function(user) {
            if (user.exists === true) throw new Error
            if (user.exists === false) {
                DataFactory.addUser(login)
            }
        }).then(function(newUser) {
            var loginInfo = {}
            loginInfo.email = newUser.email
            loginInfo.name = newUser.name
            AuthService.login(loginInfo)
        }).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
