app.config( $stateProvider => {

    $stateProvider.state('dashboard.reviews', {
        url: '/reviews',
        controller: 'ReviewsCtrl',
        templateUrl: 'js/dashboard/reviews/reviews.html',
        resolve : {
            reviews (DataFactory, AuthService) {
                return AuthService.getLoggedInUser()
                    .then(user => {
                        let queryObj = {
                            name: "user",
                            id : user._id
                        }
                        return DataFactory.fetchReviews(queryObj);
                    })
                    .then(null, err => {
                        console.error(err);
                    });
            }
        }
    });
});

app.controller('ReviewsCtrl', ($scope, reviews) => {
    $scope.reviews = reviews;
    console.log($scope.reviews);
})
