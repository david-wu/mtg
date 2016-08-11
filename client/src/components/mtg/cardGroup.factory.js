angular.module('components')
	.factory('CardGroup', [
		'$http',
		'Rater',
		'Card',
		CardGroupFactory
	])

function CardGroupFactory($http, Rater, Card){


	var rater = new Rater();
	rater.transform = function(d){return d;};
	rater.factors = [
		{
			weight:1,
			score: function(d){
				if(!rater.query){return 0;}
				return Rater.wordScore.call(rater, d.name.toLowerCase())
			},
		},
		{
			weight: 0.1,
			score: function(d){
				return -d.name.length
			},
		},
	];


	function CardGroup(options){
		_.defaults(this, {
			children: []
		});
		_.extend(this, options);
	}

	CardGroup.makeWithNames = function(names){
		var cardGroup = new CardGroup();
		_.each(names, (name)=>{
			cardGroup.addCardByName(name);
		});
		return cardGroup;
	}

	CardGroup.prototype = {

		addCardByName: function(name){
			this.children.push(new Card({
				name: name
			}));
		},

		search: function(query){
			rater.query = query;
			rater.array = this.children
			return _.map(rater.sorted(), 'd');
		},

		shuffle: function(){
			return new CardGroup({
				children: _.shuffle(this.children),
			})
		},

		filter: function(){
			return new CardGroup({
				children: _.filter(this.children)
			});
		}

	}

	return CardGroup
}