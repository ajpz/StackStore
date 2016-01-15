app.factory('Selection', $rootScope => {
    return {
        cars : null,
        makes : null,
        currentMake : null,
        display : [],
        init(config) { //
            if (config.preferences) {
                //do something
            } else {
                this.cars = config.cars;
                this.reset();
            }
        },
        reset() {
            this.display = this.cars;
            this.currentMake = null;
            $rootScope.$broadcast('refreshSelection');
        },
        filterOnCategory(categoryId) {
            this.display = this.cars.filter(car => {
                return car.categories.indexOf(categoryId) > -1;
            });
            $rootScope.$broadcast('refreshSelection');
        },
        filterOnMake(make) {
            this.currentMake = JSON.parse(make);
            this.display = this.cars.filter(car => {
                return car.make === this.currentMake._id;
            });
            $rootScope.$broadcast('refreshSelection');
        },
        filterOnModel(model) {
            this.display = this.cars.filter(car => {
                return car.make === this.currentMake._id && car.model === model;
            });
            $rootScope.$broadcast('refreshSelection');
        },
        filterOnYear(start, end) {
            this.display = this.cars.filter(car => {
                return start <= car.year <= end;
            });
            $rootScope.$broadcast('refreshSelection');
        }
    }
});
