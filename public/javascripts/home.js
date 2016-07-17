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
        .otherwise({
            redirectTo: '/home',
            activetab: 'home'
        });
}]);

myAppModule.controller('layoutCtrl', function ($scope,$location,$route,$routeParams) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.click = function () {
        $.post("about", function (data) {
        })
    }

    $scope.mainMenu = [
        {page:'home',name:"首页"},
        {page:'blog',name:"博文"},
        {page:'game',name:"游戏"},
        {page:'other',name:"其他"}];
    
    $scope.menuClick = function (data) {
        // console.info("path : " + $location.path());
        // console.info("templateUrl : " + $route.current.templateUrl);
        // console.info("activetab : " + $route.current.activetab);
        // var mainMenu = $scope.mainMenu;
        // for(var i = 0;i < mainMenu.length;i++){
        //     if(mainMenu[i].index == data){
        //         if(!mainMenu[i].isSelect){
        //             mainMenu[i].isSelect = true;
        //         }
        //     }
        //     else {
        //         mainMenu[i].isSelect = false;
        //     }
        // }
    }
});