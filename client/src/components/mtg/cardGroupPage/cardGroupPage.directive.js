angular.module('components')
    .directive('cardGroupPage', [
        'CardGroup',
        cardGroupPage
    ]);

function cardGroupPage(CardGroup){

	function link(scope){

        scope.toGroup = new CardGroup();

        _.extend(scope, {
            showCardPicker: false,
            pickCard: function(card){
                scope.toGroup.addCardCopy(card);
            },

            form: {

            }
        });

	}

    return {
        scope: {},
        templateUrl: 'components/mtg/cardGroupPage/cardGroupPage.tpl.html',
        link: link
    };

}