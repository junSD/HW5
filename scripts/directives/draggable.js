(function() {
	'use strict';

	angular.module('noteriousApp')
		.directive('draggable', draggable)

	function draggable() {
		function linker($scope, $element, $attr){
			$element.draggable();
		}
		return {
			restrict: 'A',
			link: linker
		};
	}

})();