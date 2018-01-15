app.controller('dashboardController',function($scope,GlobalService,$rootScope){
	  
    $scope.cities =["Bengaluru","Delhi","Newyork","Washington","Ottawa","Berlin","Paris","London","California","Madrid","Beijing","Tokyo"];

    $scope.setData = function(data){
    	$rootScope.data = data;
    };  

    (function(){    	
        GlobalService.invokeAjax("","/api/getBulkData","GET").then(function(response){
            $scope.cities = response.data.data.area;
        });       
    })();
});