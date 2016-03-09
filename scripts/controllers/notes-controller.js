(function() {
	'use strict';

	angular.module('noteriousApp')
		.controller('NotesCtrl', NotesCtrl)

	function NotesCtrl($routeParams, $location, $log, BoardsService) {
		var vm = this,
			defaults = {
				title: '',
				content: '',
				tags: {}	
				};
		vm.newNote = angular.copy(defaults);
		

		vm.add = function (note, noteForm) {
			BoardsService
				.createNote(note.title, note.content, $routeParams.id)
				.then(function(result) {
					_updateNotes();
					_reset(noteForm);
				})
				.catch(_showError);
		};
		vm.remove = function (noteId) {
			BoardsService.removeNote($routeParams.id, noteId)
				.then(_updateNotes)
				.catch(_showError);
		};

		function _showError(error) {
			$log.error(error);
		}
		function _updateNotes() {
			var promiseFromNote = BoardsService.getCurrentBoard($routeParams.id);

			promiseFromNote.then(function(result){
				vm.board = result.data;
			}).catch(_showError);
		}
		function _reset(form) {
			form.$setPristine();
			vm.newNote = angular.copy(defaults);
		}
	
		_updateNotes();
		
	}
	NotesCtrl.$inject = ['$routeParams', '$location', '$log','BoardsService'];

})();