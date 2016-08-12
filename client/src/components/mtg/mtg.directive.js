angular.module('components')
    .directive('mtg', [
    	'CardGroup',
        mtg
    ]);


function mtg(CardGroup){

	function link(scope){

		_.extend(scope, {
			topBar: {
				links: [
					{
						sref: 'mtg.myCards',
						label: 'My Cards',
					},
					{
						sref: 'mtg.myDecks',
						label: 'My Decks',
					},
					{
						sref: 'mtg.wishlist',
						label: 'Wishlist',
					},
				],
			},
		});

	}


	return {
       scope: {},
        templateUrl: 'components/mtg/mtg.tpl.html',
        link: link
	}
}