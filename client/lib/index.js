_ = require('lodash');
$ = jQuery = require('jquery');
// require('bootstrap');
angular = require('angular');
// require('./ace.js');
// datepicker = require('bootstrap-datepicker');

angular.module('lib', [
	require('angular-sanitize'),
	require('angular-ui-router')
]);

angular.module('lib')
	// .factory('hljs', function(){
	// 	return require('highlight.js');
	// })
	.factory('Rater', function(){
		return require('rater');
	})
	.factory('MarkdownIt', function(){
		return require('markdown-it');
	})
	.factory('d3', function(){
		return require('d3');
	})
	// .factory('fuzzy', function(){
	// 	return require('fuzzy');
	// })

// scriptLoader = require('./scriptLoader.js')