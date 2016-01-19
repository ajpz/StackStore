app.config(function ($stateProvider) {
    $stateProvider.state('dashboard.order', {
        url: '/orders/:orderId',
        controller: 'OrderDetailCtrl',
        templateUrl: 'js/dashboard/orders/order-detail.html'
    });
});

app.controller('OrderDetailCtrl', function ($scope, $stateParams, $state, DataFactory, CartFactory, AuthService) {

    var status;

    DataFactory.fetchOrder($stateParams.orderId)
        .then(function (order) {
            $scope.order = order;
            $scope.car = order.car;
            status = $scope.order.status;
            $scope.subtotal = order.car.reduce(function(sum, car) {
                return sum + car.price;
            }, 0);
        });

    $scope.isCart = function() {
        return status === 'Created';
    };

    $scope.isProcessing = function() {
        return status === 'Processing';
    };

    $scope.purchaseCart = function() {
        CartFactory.purchaseCart()
            .then(function () {
                $state.go('dashboard.orders');
            });
    };

    $scope.deleteCart = function() {
        CartFactory.deleteCart()
            .then(function () {
                $state.go('dashboard.orders');
            });
    };

    $scope.removeFromCart = function(carId) {
        CartFactory.updateCart(carId)
            .then(function (updatedOrder) {
                $state.go('dashboard.order', {
                    orderId: updatedOrder._id
                }, {
                    reload: true
                });
            });
    };

    $scope.cancelOrder = function(orderId) {
        DataFactory.updateOrder(orderId, {
                status: 'Cancelled'
            })
            .then(function () {
                $state.go('dashboard.orders');
            });
    };

    $scope.completeOrder = function(orderId) {
        DataFactory.updateOrder(orderId, {
                status: 'Completed'
            })
            .then(function () {
                $state.go('dashboard.orders');
            });
    };

    $scope.isAdmin = function() {
        return AuthService.isAdmin();
        // CartFactory.getCurrentCart.user.isAdmin;
    };
});