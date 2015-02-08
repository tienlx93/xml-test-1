/**
 * Created by tienl_000 on 28/01/15.
 */
var app = angular.module('musicLibrary', [
    'ngRoute', 'ngAnimate', 'xml', 'dndLists',
    'controllers', 'services', 'directives'
]);

app.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;

        $routeProvider.
            when('/main', {
                templateUrl: 'template/main.html',
                controller: 'MainController'
            }).
            when('/search/:query', {
                templateUrl: 'template/main.html',
                controller: 'MainController'
            }).
            when('/playlist', {
                templateUrl: 'template/main.html',
                controller: 'PlaylistController'
            }).
            when('/myplaylist', {
                templateUrl: 'template/main.html',
                controller: 'PlaylistController'
            }).
            when('/topsongs', {
                templateUrl: 'template/main.html',
                controller: 'MainController'
            }).
            otherwise({
                redirectTo: '/main'
            });
    }]);

var controllers = angular.module('controllers', []);
var services = angular.module('services', []);
var directives = angular.module('directives', []);

controllers.controller('AppController', ['$rootScope', '$scope',
    function ($rootScope, $scope) {
        $rootScope.d = {};
        $rootScope.d.showLyrics = false;
    }]);


app.filter('to_trusted', ['$sce', function ($sce) {
    return function (text, data) {
        var result = text;
        if (text && data) {
            var unmarkText = bodau(text);
            var i = unmarkText.indexOf(bodau(data));
            var length = data.length;
            if (i >= 0) {
                result = text.substring(0, i)
                    + "<strong>" + text.substring(i, i + length) + "</strong>"
                    + text.substring(i + length);
            }
        }
        return $sce.trustAsHtml(result);

    };
}]);


app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
});

var BACK_END_URL = "http://localhost:8080/YourPlaylist/";
