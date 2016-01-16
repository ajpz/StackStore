app.directive('shoppingCart', function(){
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/shopping-cart/shopping-cart.html',
        controller: function($scope, $rootScope, CartFactory) {

            $rootScope.$on('LoadCart', function(event, cart) {
                $scope.cart = cart;
            });

            $scope.cart = CartFactory.getCurrentCart();

        }
    }
})
