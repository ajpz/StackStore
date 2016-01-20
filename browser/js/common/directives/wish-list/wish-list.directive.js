app.directive('wishList', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/wish-list/wish-list.html',
        controller: function($scope, $rootScope, WishListFactory, $state) {

            $rootScope.$on('LoadWishList', function(event, wishlist) {
                $scope.wishlist = wishlist;
            });

            $scope.wishlist = WishListFactory.getCurrentWishList();

            $scope.goToWishListDetail = function(wishListId) {
                if(!wishListId) {
                    return $state.go('login');
                }
                $state.go('dashboard.order', {orderId: wishListId});
            };
        }
    };
});
