angular.module('components')
    .directive('mtgCardViewer', [
    	'Mtg',
        mtgCardViewer
    ]);

function mtgCardViewer(Mtg){

	function link(scope){
        scope.card.fetch();
	}

    return {
        scope: {
            card: '=',
        },
        templateUrl: 'components/mtg/cardViewer/cardViewer.tpl.html',
        link: link,
    };

}