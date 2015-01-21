var App = angular.module("cicisasa", ["ionic"]);

App.service("activity", ["$http", "$log", activity]);

App.controller("AppCtrl", ["$scope", "$ionicSideMenuDelegate" , "activity", "$log", AppCtrl]);
//App.controller("AppCtrl", ["$scope", "activity", "$log", AppCtrl]);

function AppCtrl($scope, $ionicSideMenuDelegate, activity, $log) {
//function AppCtrl($scope, activity, $log) {
	$scope.artworks = [];

	$scope.refresh = function() {
		activity.getBoardactivity($scope);
	}
	
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft()
	}
}

function activity($http, $log){
	this.getBoardactivity = function($scope){
		$http.get('http://cagdev.104tw.org/getArtworks').then(function(resp) {
			console.log('Success', resp);
			//console.log('Success', JSON.parse(resp.boardactivity));
			// For JSON responses, resp.data contains the result
			console.log('Success', JSON.stringify(resp.data.boardactivity));
			//var res = JSON.parse(resp.data);
			$scope.artworks = resp.data.boardactivity;
			$scope.$broadcast("scroll.refreshComplete");
		}, function(err) {
			console.error('ERR', err);
			// err.status will contain the status code
		})
		//$http.get("http://cicisasa.com/Serverdata")
			//.success(function(result){
				//$log.info(JSON.stringify(result.boardactivity));
			//});
	}
}


		//$http.jsonp("https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts?callback=JSON_CALLBACK")