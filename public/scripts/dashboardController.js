app.controller('dashboardController',function($scope,GlobalService,$rootScope){
	  
    $scope.cities =["Bengaluru","Delhi","Newyork","Washington","Ottawa","Berlin","Paris","London","California","Madrid","Beijing","Tokyo"];

    $scope.setData = function(data){
    	$rootScope.data = data;
    };

    $rootScope.getData = function(loc){
    	var url = "http://api.worldweatheronline.com/premium/v1/weather.ashx?q="+loc+"&key=6aacf8851d6b4c3699184223180501&format=json&fx=no&mca=no&fx24=no";
        GlobalService.invokeAjax("",url,"GET").then(function(response){
            $rootScope.data = response.data.data;
        });
    };

    (function(){    	
        GlobalService.invokeAjax("","default.json","GET").then(function(response){
            $scope.cities = response.data.data.area;
        });       
    })();
});