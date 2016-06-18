/**
 *
 * @authors Benjamin(cuew1987@gmail.com)
 * @date    2014-07-03 13:48:08
 * @version $Id$
 */

//Create a module for our core AMail services
angular.module('Email', ["ngRoute"])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: "ListController",
				templateUrl: 'view/list.html'
			})

			.when("/view/:module/:id.html",{
				//controller: "NavController",
				controller: function($scope,$routeParams) {
					console.log($routeParams);
				},
				templateUrl: function(obj) {
					console.log("template");
					return "view/"+obj.module+"/"+obj.id+".html";
				}
			})
			// Notice that for the detail view, we specify a parameterized URL component by placing a colon in front of the id
			.when('/list-:id.html', {
				controller: "DetailController",
				templateUrl: 'view/detail.html'
			})

			.otherwise({
				redirectTo: '/'
			});
	});


//Some take emails
var messages = [{
	id         : 0,
	sender     : 'jean@somecompany.com',
	subject    : 'Hi there, old friend',
	date       : 'Dec 7, 2013 12:32:00',
	recipients : ['greg@somecompany.com'],
	message    : 'Hey, we should get together for lunch somet ime and catch up. There are many things we should collaborate on this year.'
}, {
	id         : 1,
	sender     : 'maria@somecompany.com',
	subject    : 'Where did you leave my laptop?',
	date       : 'Dec 7, 2013 8:15:12',
	recipients : ['greg@somecompany.com'],
	message    : 'I thought you were going to put it in my desk drawer. Buti t does not seem to be there. '
}, {
	id         : 2,
	sender     : 'bill@somecompany.com',
	subject    : 'Lost python',
	date       : 'Dec 6, 2013 20:35:02',
	recipients : ['greg@somecompany.com'],
	message    : "Nobody panic, but my pet python is missing from her cage.She doesn't move too fast, so just call me if you see her."
}];

/**
 * [ListController Publish our messages for the list template]
 * @param {[type]} $scope [description]
 */
function ListController($scope) {
	$scope.messages = messages;
}

/**
 * [DetailController Get the message id fron the route (parsed from the URL) and use it tofind the right message object.]
 * @param {[type]} $scope       [description]
 * @param {[type]} $routeParams [description]
 */
function DetailController($scope, $routeParams) {
	$scope.message = messages[$routeParams.id];
}

function NavController($scope, $routeParams) {
	console.log("fdasfdasf");
}