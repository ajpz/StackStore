app.config(function($stateProvider){
    $stateProvider.state('dashboard.acctDetails', {
        url: '/account-details/:userId',
        templateUrl: '/js/dashboard/acctDetails/acct-details.html',
        resolve: {
            user: function(DataFactory, $stateParams) {
                return DataFactory.fetchUser($stateParams.userId);
            },
            categories: function(DataFactory) {
                return DataFactory.fetchCategories();
            }
        },
        controller: 'AccountCtrl',
        data: {
            autheticate: true
        }
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
        .then(function(updatedUser){
            $scope.user = updatedUser;
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

        if(addressId) {
            DataFactory.updateAddress(addressId, update)
            .then(function(address){
                $scope.address = address;
                updateArray[form] = true;
            })
        } else {
            DataFactory.addAddress(update)
            .then(function(address){
                $scope[form] = address;
                var update = {};
                update[form] = address._id;
                return DataFactory.updateUser($scope.user._id, update)
            })
            .then(function(user){
                updateArray[form] = true;
            })
        }
    }

    $scope.updateCategories = function() {

        var update = {
                categories: $scope.categoryPicks.map(category => category._id)
            },
            userId = $scope.user._id;

        DataFactory.updateUser(userId, update)
        .then(function(){
            return DataFactory.fetchUser(userId);
        })
        .then(function(updatedUser){
            $scope.user = updatedUser;
            updateArray.categories = true;
            $scope.categoryPicks = updatedUser.categories;
            $scope.categoryPicksByName = $scope.categoryPicks.map(category=> category.name);
        })
    }


})
