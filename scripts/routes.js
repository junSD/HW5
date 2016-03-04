(function() {
	'use strict';

	angular.module('noteriousApp')
		.config(['$routeProvider', config])

	function config ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'templates/boards.html',
				controller: 'BoardsCtrl',
				controllerAs: 'boardsCtrl'
			})
			.when('/board/:id', {
				templateUrl: 'templates/notes.html',
				controller: 'NotesCtrl',
				controllerAs: 'notesCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
	config.$inject = ['$routeProvider'];

})();