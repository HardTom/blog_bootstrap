/**
 * Created by tom on 16/5/9.
 */
var myAppModule = angular.module('blog', ['ngRoute']).
    config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when('/',{
            templateUrl: 'home.html'
        })
        .when('/computers', {template:'这是电脑分类页面'})
        .when('/printers',{template:'这是打印机页面'})
        .otherwise({redirectTo:'/'});
    }]);

myAppModule.controller('layoutCtrl',function ($scope) {
    $scope.click = function () {
        console.info("---click---");
        $.post("about",function (data) {
            console.log(data);
        })
    }
});