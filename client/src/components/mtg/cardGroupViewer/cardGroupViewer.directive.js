angular.module('components')
    .directive('cardGroupViewer', [
    	'CardGroup',
        cardGroupViewer
    ]);

function cardGroupViewer(CardGroup){


	function link(scope){

        scope.visibleCardCount = 10;

        scope.getVisibleCards = function(){
            if(!scope.cardGroup){return [];}
            return scope.cardGroup.children.slice(0, scope.visibleCardCount);
        };

	}

    return {
        scope: {
        	cardGroup: '='
        },
        templateUrl: 'components/mtg/cardGroupViewer/cardGroupViewer.tpl.html',
        link: link
    };

}