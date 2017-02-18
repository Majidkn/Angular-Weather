angular.module('angularWeather', ['restangular','ui.select','ngSanitize']).controller('angularWeatherCtrl',['$scope','Restangular','$sce', function ($scope,Restangular,$sce) {

    $scope.Data = {
        selectedCity: '',
        locationData: [],
        apiLocation: {},
        apiWind: {},
        apiAtmosphere: {},
        apiForecast: {},
        isDataGotten: false,
        anotherCity: false,
        unknownCity: false,
        currentData: {}
    };

    $scope.Func = {
        trustAsHtml: function(value) {
            return $sce.trustAsHtml(value);
        },
        getWeatherData: function() {
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
                if (response.query.results != null) {

                    $scope.Data.unknownCity = false;

                    $scope.Data.apiLocation = response.query.results.channel.location;
                    $scope.Data.apiWind = response.query.results.channel.wind;
                    $scope.Data.apiAtmosphere = response.query.results.channel.atmosphere;
                    $scope.Data.apiForecast = response.query.results.channel.item.forecast;
                    $scope.Data.isDataGotten = true;

                    for(var i = 7 ; i < 10 ; i++)
                        delete $scope.Data.apiForecast[i]
                    $scope.Data.currentData = $scope.Data.apiForecast[0];
                    angular.forEach($scope.Data.apiForecast, function (key) {
                        key.high = Math.floor((key.high - 32) * (5 / 9));
                        key.low = Math.floor((key.low - 32) * (5 / 9));
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