app.factory('Selection', function($rootScope) {
    return {
        reset : function() {
            this.display = this.cars
        },
        cars : null,
        display : [],
        category : function(categoryId) {
            this.display = this.cars.filter(function(car) {
                return car.categories.indexOf(categoryId) > -1;
            });
            $rootScope.$broadcast('categorySelected');
        }
    }
});
