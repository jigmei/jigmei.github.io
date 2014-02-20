var app = angular.module('myApp', []);

app.controller('AppController', function ($scope, $http, $templateCache) {

        $scope.tabs = [
            { title: 'Currently Information',
                url: 'currently.tpl.html' },
            { title: 'Minutely Forecast',
                url: 'minutely.tpl.html'},
            { title: 'Hourly Forecast',
                url: 'hourly.tpl.html'},
            { title: 'Daily Forecast',
                url: 'daily.tpl.html' }
        ];

        $scope.currentTab = 'currently.tpl.html';

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.url;
        }

        $scope.isActiveTab = function (tabUrl) {
            return tabUrl == $scope.currentTab;
        }

        $scope.loadData = function () {
            //AJAX call to get json data
            $http.get("data.json", {cache: $templateCache})
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
                .error(function (data) {
                    $scope.jsonData = data;
                    return;
                })
        }

        $scope.loadData();


    }
)