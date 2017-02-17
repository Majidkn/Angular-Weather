angular.module('angularWeather').directive("apiForecast", function() {
    return {
        restrict : 'AE',
        templateUrl : 'assets/script/apiForecast/api-forecast.tpl.html',
        scope : {
            forecastData: '='
        },
        controller : function($scope) {
            $scope.Data = {

            };
            $scope.Func = {

            };

            $scope.Apis = {

            };

            var Run = function() {
                console.log($scope.forecastData)
            };
            Run();

        },
        link : function(scope, element, attrs) {
        }
    };
});