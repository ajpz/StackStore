app.filter('orderFilter', function() {
  return function(orders, filterCriteria) {
    if(!orders) return null;

    var filteredOrders = orders;
    var filterTypes = Object.keys(filterCriteria);

    for(var i = 0; i < filterTypes.length; i++) {
        filteredOrders = filteredOrders.filter(function(order){
            return order.user[filterTypes[i]] === filterCriteria[filterTypes[i]];
        })
    }

    return filteredOrders;
  }
})
