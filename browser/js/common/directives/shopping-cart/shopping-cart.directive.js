app.directive('shoppingCart', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/shopping-cart/shopping-cart.html',
        controller: function($scope, $rootScope, CartFactory, $state) {

            $rootScope.$on('LoadCart', function(event, cart) {
                $scope.cart = cart;
            });

            $scope.cart = CartFactory.getCurrentCart();

            $scope.goToOrderDetail = function(cartId) {
                console.log('id is ', cartId)
                if(!cartId) $state.go('login');
                $state.go('dashboard.order', {cartId: cartId})
            }
        }
    };
});
