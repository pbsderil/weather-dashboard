app.service('GlobalService',function($q,$http){
	this.invokeAjax = function(data,url,type){
		var defer = $q.defer();
		$http({
			data : data,
			url : url,
			method : type
		}).then(function(response){
			defer.resolve(response);
		},function(response){
			defer.reject(response);
		});

		return defer.promise;
	}
});