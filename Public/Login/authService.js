var app = angular.module('wedding');

app.service('authService', function($http, $q, $cookieStore, $location){
	
	var setUser = function(user){
		
		$cookieStore.put('currentUser', user);
	}

	this.setUser = function(user){
		setUser(user);
	};

	this.loginUser = function(userObj){
		//console.log("came here on login?")
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/login',
			data: userObj
		}).then(function(user){
			//console.log(user)
			setUser(user.data)
			return deferred.resolve(user.data);	
		})
		return deferred.promise;
	}

	this.signupUser = function(userObj){
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/newUser',
			data: userObj
		}).then(function(res){

			//console.log(res.data[0]);
			//$cookieStore.put('currentUser', res.data[0]);
			setUser(res.data[0]);
			return deferred.resolve(res.data[0]);
		})
		return deferred.promise;
	}


	this.getUser = function(){

		if($cookieStore.get('currentUser')){
			return $cookieStore.get('currentUser');
		}
	};

	this.updateUser = function(user){
		var deferred = $q.defer();
		$http({
			method: 'PUT',
			url: '/api/updateUser/' + user._id,
			data: user
		}).then(function(res){
			setUser(res.data)
			return deferred.resolve(res.data);
		})
		return deferred.promise;
	}

	// this.getUser = function(user){
	// 	if(user){
	// 		var deferred = $q.defer();
	// 		$http({
	// 			method: 'GET',
	// 			url: '/api/user/' + user._id 
	// 		}).then(function(res){
	// 			return deferred.resolve(res.data)
	// 		})
	// 			return deferred.promise;
	// 	} else {
	// 		$location.path('/login')
	// 	}
	// }
})