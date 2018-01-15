var app = angular.module('WeatherApp',['ngRoute','ui.bootstrap']);
app.config(init);

app.run(function($rootScope,$location,GlobalService){
	$rootScope.currentView = $location.$$url;
	$rootScope.toggleView = function(){
		if($location.$$url == '/'){
			$location.path('/mapView');	
		}else{
		 	$location.path('/');	
		}
		$rootScope.currentView = $location.$$url;
	};
    $rootScope.getData = function(loc){       
        var d = {loc:loc};
        GlobalService.invokeAjax(d,"/api/getData","POST").then(function(response){
            $rootScope.data = response.data.data;
        });
    };
});

function init ($routeProvider,$locationProvider){
	 $routeProvider
    .when("/", {
         templateUrl : "partials/dashboard.html",	
         controller : "dashboardController"
    })
    .when("/mapView", {
         templateUrl : "partials/map.html",
         controller : "mapController"
    })
    .when("/predict", {
         templateUrl : "partials/travelPrediction.html",
         controller : "predictionController"
    })
  	
  /*	$locationProvider.html5Mode({
	  enabled: true
	});*/
};