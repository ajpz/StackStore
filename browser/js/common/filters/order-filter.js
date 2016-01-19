app.filter('orderFilter', function() {
  return function(orders, filterCriteria) {
    if(!orders) return null;

    var filteredOrders = orders;
    var filterTypes = Object.keys(filterCriteria);

    var compare = function(order, i){
        return order.user[filterTypes[i]] === filterCriteria[filterTypes[i]];
    }

    for(var i = 0; i < filterTypes.length; i++) {
        filteredOrders = filteredOrders.filter(compare);
    }

    return filteredOrders;
  }
})
