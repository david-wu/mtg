angular.module('components')
	.factory('Card', [
		'$http',
		CardFactory
	])


function CardFactory($http){

	function Card(options){
		_.extend(this, options);
		this.id = _.uniqueId();
	}

	Card.prototype = {
		fetch: function(){
			return $http.get('api/card/'+this.name)
				.then(function(res){return res.data;})
				.then((card)=>{
					var multiverseId = _.last(_.map(_.keys(card.versions), Number).sort());
					card.img = `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${multiverseId}&type=card`
					return _.extend(this, card);
				});
		}
	}

	return Card;
}