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
                showDay: [true]
            };
            $scope.Func = {
                showTheDay: function (day) {
                    $scope.currentData = $scope.forecastData[day];
                    for(var i = 0 ; i < 7 ; i++)
                        if(i != day)
                            $scope.Data.showDay[i] = false;
                        else
                            $scope.Data.showDay[i] = true;
                }
            };

            $scope.Apis = {

            };

            var Run = function() {
                /*if($scope.forecastData.apiTodayForecast.length == undefined) {
                    $scope.Data.dataGotten = false;
                    $scope.forecastData = {};

                }*/

            };
            Run();

        },
        link : function(scope, element, attrs) {
        }
    };
});