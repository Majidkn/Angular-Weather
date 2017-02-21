angular.module('angularWeather', ['restangular','ui.select','ngSanitize']).controller('angularWeatherCtrl',['$scope','Restangular','$sce', function ($scope,Restangular,$sce) {

    $scope.Data = {
        selectedCity: 'tehran',
        locationData: [],
        apiLocation: {},
        apiWind: {},
        apiAtmosphere: {},
        apiForecast: {},
        isDataGotten: false,
        anotherCity: false,
        unknownCity: false,
        currentData: {},
        littleDayNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        completeDayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        DetailsClasses: ['wi-tornado','wi-hurricane','wi-hurricane','wi-thunderstorm','wi-thunderstorm','wi-night-rain-mix','wi-night-rain-mix','wi-night-rain-mix'],
        detailsClass: ''
    };

    $scope.Func = {
        trustAsHtml: function(value) {
            return $sce.trustAsHtml(value);
        },
        getWeatherData: function() {
            if($scope.Data.unknownCity)
                $scope.Data.tempCity = $scope.Data.selectedCity;
            // console.log(Restangular.oneUrl('api', 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + $scope.Data.selectedCity + '")&format=json').get());
            return Restangular.oneUrl('api', 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+ $scope.Data.selectedCity +'")&format=json').get();

        },
        getCitiesData: function () {
            return Restangular.oneUrl('city', 'https://restcountries.eu/rest/v1/all').get();
        },
        showCitiesData: function () {
            $scope.Func.getCitiesData().then(function (response) {
                angular.forEach(response, function (key) {
                    $scope.Data.locationData.push(key.name +', '+key.capital);
                });
            });
        },
        showWeatherData: function () {
            $scope.Func.getWeatherData().then(function (response) {
                $scope.Data.DetailsClasses[32] = 'wi-day-sunny';
                if (response.query.results != null) {

                    $scope.Data.unknownCity = false;

                    $scope.Data.apiLocation = response.query.results.channel.location;
                    $scope.Data.apiWind = response.query.results.channel.wind;
                    $scope.Data.apiAtmosphere = response.query.results.channel.atmosphere;
                    $scope.Data.apiForecast = response.query.results.channel.item.forecast;
                    $scope.Data.isDataGotten = true;

                    // for(var i = 0 ; i < )
                    for(var i = 7 ; i < 10 ; i++)
                        delete $scope.Data.apiForecast[i]

                    $scope.Data.currentData = $scope.Data.apiForecast[0];
                    angular.forEach($scope.Data.apiForecast, function (value, key) {
                        // console.log(value, ' = ', key);

                        for(var i = 0 ; i < 7 ; i++){

                            // Change Little Day Names To Complete Ones
                            if(value.day == $scope.Data.littleDayNames[i]){
                                value.day = $scope.Data.completeDayNames[i];
                            }

                            // Set The Detail Icon
                            for(var j = 0 ; j < 48 ; j++){
                                if(value.code == j){
                                    $scope.Data.detailsClass = $scope.Data.DetailsClasses[i];
                                }
                            }
                            // if(value.code == 32)
                        }
                        value.high = Math.floor((value.high - 32) * (5 / 9));
                        value.low = Math.floor((value.low - 32) * (5 / 9));
                    });
                }
                else
                    $scope.Data.unknownCity = true;

            });
        }

    };
    
    $scope.Apis = {
        
    };

    var Run = function () {
        $scope.Func.showCitiesData()
    };

    Run();
}]);