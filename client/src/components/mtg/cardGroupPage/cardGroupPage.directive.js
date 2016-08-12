angular.module('components')
    .directive('mtgCardGroupPage', [
    	'Mtg',
        mtgCardGroupPage
    ]);

function mtgCardGroupPage(){


	function link(scope){
        _.extend(scope, {
            showCardPicker: true,
            pickCard: function(card){
                console.log(card)
            }
        });

	}

    return {
        scope: {
        	cardGroup: '='
        },
        templateUrl: 'components/mtg/cardGroupPage/cardGroupPage.tpl.html',
        link: link
    };

}