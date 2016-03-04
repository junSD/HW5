(function() {
	'use strict';

	angular.module('noteriousApp')
		.controller('BoardsCtrl', BoardsCtrl)

	function BoardsCtrl($log, BoardsService) {
		var vm = this,
			defaults = {
				title: '',
				description: '',
				author: '',
				isPublic: false,
				notes: []
			};
		vm.newBoard = angular.copy(defaults);
		vm.boards = [];

		vm.add = function(board, boardForm) {
			BoardsService
				.createBoard(board.title, board.description, board.author, board.isPublic)
				.then(function() {
					_updateBoards();
					_reset(boardForm);
				})
				.catch(_showError);
		}
		vm.remove = function(boardId) {
			BoardsService.removeBoard(boardId)
				.then(_updateBoards)
				.catch(_showError);
		}

		function _showError(error) {
			$log.error(error);
		}
		function _updateBoards() {
			var promiseFromBoard = BoardsService.find();

			promiseFromBoard.then(function(result){
				vm.boards = result.data;
			}).catch(_showError);
		}
		function _reset(form) {
			form.$setPristine();
			vm.newBoard = angular.copy(defaults);
		}

		_updateBoards();
	}
	BoardsCtrl.$inject = ['$log', 'BoardsService'];

})();