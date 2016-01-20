app.directive('shoppingCart', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/shopping-cart/shopping-cart.html',
        controller: function($scope, $rootScope, CartFactory, $state) {
            console.log("JON in Cart controller");
            $rootScope.$on('LoadCart', function(event, cart) {
                $scope.cart = cart;
            });

            $scope.cart = CartFactory.getCurrentCart();

            $scope.goToOrderDetail = function(cartId) {
                console.log("the shoppingCart ID: ", cartId);
                if(!cartId) {
                    return $state.go('login');
                }
                $state.go('dashboard.order', {orderId: cartId});
            };
        }
    };
});
