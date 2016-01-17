app.factory('Selection', $rootScope => {
    return {
        cars: null,
        makes: null,
        currentMake: null,
        currentModel: null,
        display: [],
        init(config) { //
            if (config.preferences) {
                //do something if user preferences
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
                return car.make._id === this.currentMake._id;
            });
            $rootScope.$broadcast('refreshSelection');
        },
        filterOnModel(model) {
            this.display = this.cars.filter(car => {
                return car.make._id === this.currentMake._id && car.model === model;
            });
            $rootScope.$broadcast('refreshSelection');
        },
        filterOnYear(start, end) {
            this.display = this.cars.filter(car => {
                if (end < start) return end <= car.year <= start;
                return start <= car.year && car.year <= end;
            });
            $rootScope.$broadcast('refreshSelection');
        },
        filterOnColor(color) {
            if (this.currentMake) {
                this.display = this.display.filter(car => {
                    return car.color.toLowerCase() === color.toLowerCase();
                });
            } else {
                this.display = this.cars.filter(car => {
                    return car.color.toLowerCase() === color.toLowerCase();
                });
            }
            $rootScope.$broadcast('refreshSelection');

        }
    }
});
