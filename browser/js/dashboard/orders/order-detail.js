app.config(function ($stateProvider) {
    $stateProvider.state('dashboard.order', {
        url: '/orders/:orderId',
        controller: 'OrderDetailCtrl',
        templateUrl: 'js/dashboard/orders/order-detail.html'
    });
});

app.controller('OrderDetailCtrl', function ($scope, $stateParams, $state, DataFactory, CartFactory, AuthService) {

    var status;
    $scope.message;
    $scope.order = {};// replace with shopping cart

    console.log('state params is : ', $stateParams.orderId)
    if (!$stateParams.orderId) {
        console.log('in if')
        $scope.order = CartFactory.getCurrentCart();
        $scope.car = $scope.order.car;
        status = $scope.order.status;
        $scope.message = "This is a shopping cart!"

    } else {
        console.log('in else')
        DataFactory.fetchOrder($stateParams.orderId)
        .then(function (order) {
            console.log('got db order:', order)
            $scope.order = order;
            $scope.car = order.car;
            status = $scope.order.status;
            if($scope.car)
            $scope.subtotal = order.car.reduce(function(sum, car) {
                return sum + car.price;
            }, 0);
        });
    }

    $scope.messageExists = function() {return $scope.message; };

    $scope.isCart = function() {
        return status === 'Created';
    };

    $scope.isProcessing = function() {
        return status === 'Processing';
    };

    $scope.purchaseCart = function() {
        console.log('purhcase cart running')
        return CartFactory.purchaseCart()
            .then(function (result) {
                console.log('the result is ', result)
                console.log('redirecting to orders')
                $state.go('dashboard.orders');
            })
    };

    $scope.deleteCart = function() {
        CartFactory.deleteCart()
            .then(function () {
                $state.go('dashboard.orders');
            })
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
