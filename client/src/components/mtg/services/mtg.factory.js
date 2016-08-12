angular.module('components')
	.factory('Mtg', [
		'$http',
		'$q',
		'CardGroup',
		MtgFactory
	])

function MtgFactory($http, $q, CardGroup){

	function Mtg(){

	}


	var myCards = new CardGroup();
	var wishlist = new CardGroup();
	var myDecks = new CardGroup();


	Mtg.prototype = {

		getAllCards: function(cards){
			if(this.allCards){
				return $q.resolve(this.allCards);
			}

			return $http.get('api/card')
				.then(function(res){
					return res.data;
				})
				.then((cardNames)=>{
					return CardGroup.makeWithNames(cardNames);
				})
		},

		getWishlist: function(){
			return $q.resolve(wishlist);
		},

		getMyCards: function(){
			return $q.resolve(myCards);
		},

		getMyDecks: function(){
			return $q.resolve(myDecks);
		}

	}


	return Mtg;
}