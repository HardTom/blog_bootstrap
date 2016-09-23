/**
 * Created by tom on 16/7/10.
 */
var network = {};
(function(){

    function httpGetConnect($http,url,success,fail){
        var p = $http({
            method: 'GET',
            url: url
        });
        p.success(function(data, status, header, config){
            // $scope.name = response.name;
            if(success){
                success(data, status, header, config);
            }
        });
        p.error(function (data, status, header, config) {
            if(fail){
                fail(data, status, header, config);
            }
        });
    }

    function httpPostConnect($http,url,success,fail){
        var p = $http({
            method: 'POST',
            url: url
        });
        p.success(function(data, status, header, config){
            // $scope.name = response.name;
            if(success){
                success(data, status, header, config);
            }
        });
        p.error(function (data, status, header, config) {
            if(fail){
                fail(data, status, header, config);
            }
        });

    }

    //接口
    network.about = function ($http,success,fail) {
        httpPostConnect($http,"/about",success,fail);
    }
    
    


})();