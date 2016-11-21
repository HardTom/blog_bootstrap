/**
 * Created by tom on 16/5/9.
 */
var myAppModule = angular.module('blog', ['ngRoute']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            activetab: 'home'
        })
        .when('/blog', {
            templateUrl: 'blog.html',
            activetab: 'blog'
        })
        .when('/game', {
            templateUrl: 'game.html',
            activetab: 'game'
        })
        .when('/other', {
            templateUrl: 'other.html',
            activetab: 'other'
        })
        .when('/send', {
            templateUrl: 'send.html',
            activetab: 'send'
        })
        .otherwise({
            redirectTo: '/home',
            activetab: 'home'
        });
}]);

myAppModule.directive('script', function() {
    return {
        restrict: 'E',
        scope: false,
        link: function (scope, elem, attr) {
            if (attr.type === 'text/javascript') {
                var code = elem.text();
                var f = new Function(code);
                f();
            }
        }
    };
});

myAppModule.controller('layoutCtrl', function ($scope,$http,$location,$route,$routeParams) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.mainMenu = [
        {page:'home',name:"首页"},
        {page:'blog',name:"博文"},
        {page:'game',name:"游戏"},
        {page:'other',name:"其他"},
        {page:'send',name:"写博文"}
    ];

    network.about(
        $http,
        function (data, status, header, config) {
            console.log("data : " + JSON.stringify(data));
            console.log("about success");
        },
        function (data, status, header, config) {
            console.log("about fail");
        }
    );

});