angular.module('components')
    .directive('mtgCardGroupViewer', [
    	'Mtg',
        mtgCardGroupViewer
    ]);

function mtgCardGroupViewer(){


	function link(scope){
		_.extend(scope.cardGroup, {

		})
	}

    return {
        scope: {
        	cardGroup: '='
        },
        templateUrl: 'components/mtg/cardGroupViewer/cardGroupViewer.tpl.html',
        link: link
    };

}