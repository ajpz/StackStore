app.directive('shoppingCart', function(CartFactory, AuthService){
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/shopping-cart/shopping-cart.html',
        scope: {
            cart: "="
        }
    }
})
