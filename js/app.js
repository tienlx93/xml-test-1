/**
 * Created by tienl_000 on 28/01/15.
 */
var app = angular.module('musicLibrary', [
    'ngRoute', 'ngAnimate', 'xml', 'dndLists',
    'controllers', 'services', 'directives'
]);

app.config(['$routeProvider',
    function ($routeProvider) {

        $routeProvider.
            when('/main', {
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

app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
});

var BACK_END_URL = "http://localhost:8080/YourPlaylist/";