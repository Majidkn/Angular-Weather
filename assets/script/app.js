angular.module('angularWeather', ['restangular']).controller('angularWeatherCtrl',['$scope','Restangular', function ($scope,Restangular) {

    $scope.Data = {
        selectedCity: '',
        apiLocation: {},
        apiWind: {},
        apiAtmosphere: {},
        apiForecast: {
            apiTodayForecast: {},
            apiTomorrowForecast: {}
        },
        isDataGotten: false
    };

    $scope.Func = {
        getData: function() {
            return Restangular.oneUrl('api', 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+ $scope.Data.selectedCity +'")&format=json').get();
        },
        showData: function () {
            $scope.Func.getData().then(function (response) {
                $scope.Data.apiLocation = response.query.results.channel.location;
                $scope.Data.apiWind = response.query.results.channel.wind;
                $scope.Data.apiAtmosphere = response.query.results.channel.atmosphere;
                $scope.Data.apiForecast.apiTodayForecast = response.query.results.channel.item.forecast[0];
                delete $scope.Data.apiForecast.apiTodayForecast.code;
                $scope.Data.apiForecast.apiTomorrowForecast = response.query.results.channel.item.forecast[1];
                delete $scope.Data.apiForecast.apiTomorrowForecast.code;
                $scope.Data.isDataGotten = true;

                // $scope.Data.apiLocation = response.query.results.channel.location;
            });
        }

    };
    
    $scope.Apis = {
        
    };
    
    var Run = function () {
    };

    Run();
}]);