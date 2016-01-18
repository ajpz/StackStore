app.config(function($stateProvider) {
    $stateProvider.state('order', {
        url: '/orders/:orderId',
        controller: 'OrderDetailCtrl',
        templateUrl: 'js/order-detail/order-detail.html'
    })
})

app.controller('OrderDetailCtrl', function($scope, $stateParams, $state, DataFactory, CartFactory, AuthService) {

        var status;

        DataFactory.fetchOrder($stateParams.orderId)
        .then(function(order){
            $scope.order = order;
            $scope.car = order.car;
            console.log('the status is ', $scope.order.status)
            // orderIsACart = $scope.order.status === 'Created';
            status = $scope.order.status;
            console.log('order is ', order)
            $scope.subtotal = order.car.reduce(function(sum, car){
                return sum + car.price;
            }, 0)
        })

        $scope.isCart = function() {
            return status === 'Created';
        }

        $scope.isProcessing = function() {
            return status === 'Processing';
        }

        $scope.purchaseCart = function() {
            CartFactory.purchaseCart()
            .then(function() {
                $state.go('orders');
            })
        }

        $scope.deleteCart = function() {
            CartFactory.deleteCart()
            .then(function(response) {
                $state.go('orders');
            })
        }

        $scope.removeFromCart = function(carId) {
            console.log('removed invoked with: ', carId);
            CartFactory.updateCart(carId)
            .then(function(updatedOrder) {
                console.log('in promise return', updatedOrder)
                $state.go('order', {orderId: updatedOrder._id}, {reload: true});
            })
        }

        $scope.cancelOrder = function(orderId){
            DataFactory.deleteOrder(orderId)
            .then(function(response) {
                $state.go('orders');
            })
        }

        $scope.completeOrder = function(orderId) {
            DataFactory.updateOrder(orderId, {status: 'Completed'})
            .then(function(response) {
                $state.go('orders');
            })
        }

        $scope.isAdmin = function() {
            return AuthService.isAdmin();
            // CartFactory.getCurrentCart.user.isAdmin;
        }


})
