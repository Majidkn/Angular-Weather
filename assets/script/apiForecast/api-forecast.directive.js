angular.module('angularWeather').directive("apiForecast", function() {
    return {
        restrict : 'AE',
        templateUrl : 'assets/script/apiForecast/api-forecast.tpl.html',
        scope : {
            forecastData: '=',
            locationData: '=',
            currentData: '='
        },
        controller : function($scope) {
            $scope.Data = {
                dataGotten: true,
                showToday: true,
                showTomorrow: false,
                currentData: {},
                showDay: [true],
                tempSelectedIndex: 0
            };
            $scope.Func = {
                showTheDay: function (day) {
                    $scope.currentData = $scope.forecastData[day];
                    $scope.Data.showDay[day] = true;
                    $scope.Data.showDay[$scope.Data.tempSelectedIndex] = false;
                    $scope.Data.tempSelectedIndex = day;
                }
            };

            $scope.Apis = {

            };

            var Run = function() {

            };
            Run();

        },
        link : function(scope, element, attrs) {
        }
    };
});