app.directive('wishList', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/wish-list/wish-list.html',
        controller: function($scope, $rootScope, WishListFactory, $state) {
            console.log("DAN in wishlist controller")
            $rootScope.$on('LoadWishList', function(event, wishlist) {
                $scope.wishlist = wishlist;
            });

            $scope.wishlist = WishListFactory.getCurrentWishList();

            $scope.goToWishListDetail = function(wishListId) {
                console.log("the wishList ID: ", wishListId)
                if(!wishListId) {
                    console.log('no id registered')
                    return $state.go('login');
                }
                console.log('id was there redirecting; ')
                $state.go('dashboard.order', {orderId: wishListId})
            }
        }
    };
});
