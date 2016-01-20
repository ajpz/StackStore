app.config($stateProvider => {

    $stateProvider.state('dashboard.reviews', {
        url: '/reviews',
        controller: 'ReviewsCtrl',
        templateUrl: 'js/dashboard/reviews/reviews.html',
        resolve: {
            reviews(DataFactory, AuthService) {
                return AuthService.getLoggedInUser()
                    .then(user => {
                        let queryObj = {
                            name: "user",
                            id: user._id
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

app.controller('ReviewsCtrl', ($scope, reviews, DataFactory) => {
    let spliceOut = (reviewId, replaceWith) => {
        let len = $scope.reviews.length;
        let indexOfSelected;
        for (let i = 0; i < len; i++) {
            if ($scope.reviews[i]._id === reviewId) {
                indexOfSelected = i;
                break;
            }
        }
        if (replaceWith) {
            $scope.reviews.splice(indexOfSelected, 1, replaceWith);
        } else {
            $scope.reviews.splice(indexOfSelected, 1);
        }
    }
    $scope.reviews = reviews;
    $scope.showEditForm = false;
    $scope.reviewToEdit;
    $scope.deleteReview = reviewId => {
        DataFactory.deleteReview(reviewId)
            .then(() => {
                spliceOut(reviewId)
            });
    }
    $scope.editReview = review => {
        $scope.showEditForm = true;
        $scope.reviewToEdit = review;
    };
    $scope.showReviews = () => {
        $scope.showEditForm = false;
    };
    $scope.submitEdit = () => {
        DataFactory.updateReview($scope.reviewToEdit._id, $scope.reviewToEdit)
            .then(review => {
                spliceOut(review._id, review);
                $scope.showReviews();
            });

    };
})
