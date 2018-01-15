app.controller('dashboardController',function($scope,GlobalService,$rootScope){
	  
    $scope.cities =["Bengaluru","Delhi","Newyork","Washington","Ottawa","Berlin","Paris","London","California","Madrid","Beijing","Tokyo"];

    $scope.setData = function(data){
    	$rootScope.data = data;
    };

    $rootScope.getData = function(loc){    	
        var d = {loc:loc};
        GlobalService.invokeAjax(d,"/api/getData","POST").then(function(response){
            $rootScope.data = response.data.data;
        });
    };

    (function(){    	
        GlobalService.invokeAjax("","/api/getBulkData","GET").then(function(response){
            $scope.cities = response.data.data.area;
        });       
    })();
});