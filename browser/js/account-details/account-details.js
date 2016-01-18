app.config(function($stateProvider){
    $stateProvider.state('account-details', {
        url: '/account-details/:userId',
        templateUrl: '/js/account-details/account-details.html',
        resolve: {
            user: function(DataFactory, $stateParams) {
                return DataFactory.fetchUser($stateParams.userId);
            },
            categories: function(DataFactory) {
                return DataFactory.fetchCategories();
            }
        },
        controller: 'AccountCtrl'
    })
})

app.controller('AccountCtrl', function($scope, user, categories, DataFactory) {

    var updateArray = {
        email: false,
        shippingAddress: false,
        billingAddress: false,
        categories: false
    }
    $scope.wasUpdated = function(form) {
        return updateArray[form];
    }

    $scope.user = user;
    $scope.shippingAddress = user.shippingAddress;
    $scope.billingAddress = user.billingAddress;

    $scope.categoryPicks = user.categories;
    $scope.categoryPicksByName = $scope.categoryPicks.map(category=> category.name);
    $scope.categories = categories

    $scope.updateEmail = function(){

        var update = {
                email: $scope.user.email,
                password: $scope.user.password
            },
            userId = $scope.user._id;

        DataFactory.updateUser(userId, update)
        .then(function(user){
            $scope.user = user;
            updateArray.email = true;
        })
    }


    //needs to reference underlying address document, not userId
    $scope.updateAddress = function(form){

        var update = {
                street1: $scope[form].street1,
                street2: $scope[form].street2,
                city: $scope[form].city,
                state: $scope[form].state,
                zip: $scope[form].zip
            },
            addressId = $scope[form]._id;

        DataFactory.updateAddress(addressId, update)
        .then(function(address){
            $scope.address = address;
            updateArray[form] = true;
        })
    }

    $scope.updateCategories = function() {

        var update = {
                categories: $scope.categoryPicks.map(category => category._id)
            },
            userId = $scope.user._id;

        DataFactory.updateUser(userId, update)
        .then(function(user){
            return DataFactory.fetchUser(userId);
        })
        .then(function(user){
            $scope.user = user;
            updateArray.categories = true;
            $scope.categoryPicks = user.categories;
            $scope.categoryPicksByName = $scope.categoryPicks.map(category=> category.name);
        })
    }


})
