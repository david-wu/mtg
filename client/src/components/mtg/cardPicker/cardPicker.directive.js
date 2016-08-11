angular.module('components')
    .directive('mtgCardPicker', [
    	'Mtg',
        mtgCardPicker
    ]);

function mtgCardPicker(Mtg){

	function link(scope, element){

        if(!scope.fromGroup){
            var mtg = new Mtg()
            mtg.getAllCards()
                .then(function(allCards){
                    scope.fromGroup = allCards;
                })
        }

        _.defaults(scope, {
            fromGroup: [],
            toGroup: [],
        });


        scope.$watch('q', function(q){
            if(!scope.fromGroup.search){return;}
            scope.cards = scope.fromGroup.search(q).slice(0,10);
        })

        var input = element.find('input.card-name');
        input.keypress(function (e) {
            if(e.which === 13){
                scope.toGroup.push(scope.cards[0]);
                input.select();
                scope.$evalAsync();
            }
        });

	}

    return {
        scope: {
            fromGroup: '=?',
            toGroup: '=?'
        },
        templateUrl: 'components/mtg/cardPicker/cardPicker.tpl.html',
        link: link
    };

}