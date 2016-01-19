app.directive('wishList', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/wish-list/wish-list.html',
        controller: function($scope, $rootScope, WishListFactory) {
            $rootScope.$on('LoadWishList', function(event, wishlist) {
                $scope.wishlist = wishlist;
            });
            $scope.wishlist = WishListFactory.getCurrentWishList();
        }
    };
});
