app.controller('mapController',function(GlobalService,$rootScope,$scope){
	       

        var uluru = {lat: -25.363, lng: 131.044},map,marker;

        navigator.geolocation.getCurrentPosition((position)=>{
            uluru.lat = position.coords.latitude;
            uluru.lng = position.coords.longitude;
            map = new google.maps.Map(document.getElementById('map'), {
              zoom: 8,
              center: uluru
            });
            marker = new google.maps.Marker({
              position: uluru,
              map: map
            });
            google.maps.event.addListener(map, "click", clickHandler);
        });
        
        
        var geocoder = new google.maps.Geocoder;
       
        function clickHandler(e){         
              uluru.lat = e.latLng.lat();
              uluru.lng = e.latLng.lng();
              marker.setPosition(e.latLng);
       
              geocoder.geocode({'location': e.latLng}, function(results, status) {
                  console.log(results[0].formatted_address);   
              });                   
        }

        $scope.getData = function(){
             var url = "http://api.worldweatheronline.com/premium/v1/weather.ashx?q="+uluru.lat+","+uluru.lng+"&key=6aacf8851d6b4c3699184223180501&format=json&fx=no&mca=no&fx24=no";
              GlobalService.invokeAjax("",url,"GET").then(function(response){
                  $rootScope.data = response.data.data;
              });
        }
});