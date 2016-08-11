angular.module('components')
	.factory('Mtg', [
		'$http',
		'$q',
		'CardGroup',
		MtgFactory
	])

function MtgFactory($http, $q, CardGroup){

	function Mtg(){
		_.defaults(this, {
		});
	}

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

	}


	return Mtg;
}