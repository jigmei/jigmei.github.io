var app = angular.module('myApp', ['ui.router']);
//ui router is alternative routing mechanism for angular js, nested view
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/currently");
//dynamic routing
    $stateProvider
        .state('weather', {
            url: "/:dataType",
            templateUrl: function ($stateParam) {
                return "partial/" + $stateParam.dataType + ".html"
            }
        })

        .state('testing', {
            url: "/testing",
            templateUrl:"partial/testing.html"

        })

    /*
     .state('currently', {
     url: "/currently",
     templateUrl: "partial/currently.html"
     })
     .state('daily', {
     url: "/daily",
     templateUrl: "partial/daily.html"
     })
     .state('hourly', {
     url: "/hourly",
     templateUrl: "partial/hourly.html"
     })
     .state('minutely', {
     url: "/minutely",
     templateUrl: "partial/minutely.html"
     })*/
})

app.controller('AppController', function ($scope, $http, $templateCache) {
        //console.log("before: " + $scope.activeState);

        $scope.states = [
            {
                name: 'currently',
                label: 'Currently'

            },
            {
                name: 'minutely',
                label: 'Minutely'
            },
            {
                name: 'hourly',
                label: 'Hourly'
            },
            {
                name: 'daily',
                label: 'Daily'
            }
        ];

        $scope.activeState = 'currently';

        $scope.makeActive = function (str) {
            $scope.activeState = str;
            // console.log($scope.activeState);
        }


        $scope.loadData = function () {
            //AJAX call to get json data
            $http.get("data/data.json", {cache: $templateCache})
                .success(function (data) {
                    $scope.jsonData = data;


                    //google map
                    $(function () {
                        console.log("")
                        var latlng = new google.maps.LatLng(data.latitude, data.longitude);
                        var mapOptions = {
                            zoom: 16,
                            center: latlng,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                        var map = new google.maps.Map(
                            document.getElementById("mapView"), mapOptions);
                        var marker = new google.maps.Marker({
                            position: latlng,
                            title: data.timezone,
                            map: map
                        });
                    });
                    return;
                })
                .error(function (message) {
                    $scope.jsonData = message;
                    console.log(message);
                    return;
                })
        }

        $scope.loadData();
    }
)