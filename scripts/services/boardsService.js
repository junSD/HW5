(function() {
	'use strict';

	angular.module('noteriousApp')
		.factory('BoardsService', BoardsService)

	function BoardsService($http, $q) {
		var baseUrl = 'https://radiant-torch-9549.firebaseio.com/',
			boardsService = {};

		boardsService.find = function() {
			var url = baseUrl + '/boards.json';
			return $http.get(url);
		}

		boardsService.createBoard = function(title, description, author, isPublic) {
			var url = baseUrl + '/boards.json';
			var params = {
				title: title,
				description: description,
				author: author,
				isPublic: isPublic
			};

			return $http.post(url, params);
		}

		boardsService.removeBoard = function (boardId) {
			var url = baseUrl + 'boards/' + boardId + '.json';
			return $http.delete(url);
		};

		boardsService.getCurrentBoard = function(boardId) {
			var url = baseUrl + 'boards/' + boardId + '.json';
			return $http.get(url);
		}

		boardsService.createNote = function(title, content, boardId) {
			var url = baseUrl + 'boards/' + boardId + '/notes.json';
			var params = {title: title, content: content};

			return $http.post(url, params);
		}

		boardsService.removeNote = function (boardId, noteId) {
			var url = baseUrl + 'boards/' + boardId + '/notes/' + noteId + '.json';
			return $http.delete(url);
		};

		return boardsService;
	}
	BoardsService.$inject = ['$http', '$q'];

})();