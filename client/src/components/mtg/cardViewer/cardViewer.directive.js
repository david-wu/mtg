angular.module('components')
    .directive('cardViewer', [
    	'Mtg',
        cardViewer
    ]);

function cardViewer(Mtg){

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