angular.module('components')
    .directive('mtgCardPicker', [
    	'Mtg',
        'CardGroup',
        mtgCardPicker
    ]);

function mtgCardPicker(Mtg, CardGroup){

	function link(scope, element){

        var input = element.find('input.card-name');

        if(!scope.fromGroup){
            var mtg = new Mtg()
            mtg.getAllCards()
                .then(function(allCards){
                    scope.fromGroup = allCards;
                    scope.fromGroup.sortByQuery(scope.q);
                })
        }

        _.defaults(scope, {
            fromGroup: new CardGroup(),
            toGroup: new CardGroup(),
        });

        scope.$watch('q', function(q){
            scope.fromGroup.sortByQuery(q);
        });

        input.keypress(function(e){
            if(e.which===13){
                scope.toGroup.addCardCopy(scope.fromGroup.children[0]);
                scope.pick(scope.fromGroup.children[0]);
                input.select();
                scope.$evalAsync();
            }
        });

	}

    return {
        scope: {
            fromGroup: '=?',
            toGroup: '=?',
            pick: '=?',
        },
        templateUrl: 'components/mtg/cardPicker/cardPicker.tpl.html',
        link: link
    };

}