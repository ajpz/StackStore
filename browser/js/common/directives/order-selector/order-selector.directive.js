app.directive('orderSelector', function() {
    return {
        restrict: 'E',
        templateUrl: '/js/common/directives/order-selector/order-selector.html',
        scope: {
            optionName: "@", //email or status
            optionValues: "=", // array of all orders
            optionChosen: "=", // object which will have optionName as key
        },
    }
})
