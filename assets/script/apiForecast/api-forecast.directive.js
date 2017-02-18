angular.module('angularWeather').directive("apiForecast", function() {
    return {
        restrict : 'AE',
        templateUrl : 'assets/script/apiForecast/api-forecast.tpl.html',
        scope : {
            forecastData: '=',
            locationData: '='
        },
        controller : function($scope) {
            $scope.Data = {
                dataGotten: true,
                showToday: false,
                showTomorrow: false,

            };
            $scope.Func = {

            };

            $scope.Apis = {

            };

            var Run = function() {
                if($scope.forecastData.apiTodayForecast.length == undefined) {
                    $scope.Data.dataGotten = false;
                    $scope.forecastData = {};

                }

            };
            Run();

        },
        link : function(scope, element, attrs) {
        }
    };
});