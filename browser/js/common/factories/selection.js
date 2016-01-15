app.factory('Selection', function($rootScope) {
    return {
        init : function(config) { //
            this.makes = config.makes;
            this.cars = config.cars;
            this.reset();
        },
        reset : function() {
            this.display = this.cars
            $rootScope.$broadcast('categorySelected');
        },
        cars : null,
        makes : null,
        display : [],
        category : function(categoryId) {
            this.display = this.cars.filter(function(car) {
                return car.categories.indexOf(categoryId) > -1;
            });
            $rootScope.$broadcast('categorySelected');
        },

        make : {

        }
    }
});
