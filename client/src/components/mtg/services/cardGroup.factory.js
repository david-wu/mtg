angular.module('components')
	.factory('CardGroup', [
		'$http',
		'Rater',
		'Card',
		CardGroupFactory
	])

function CardGroupFactory($http, Rater, Card){

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

		addCard(card){
			this.children.push(card);
		},

		addCardCopy: function(card){
			this.children.push(new Card(card));
		},

		addCardByName: function(name){
			this.children.push(new Card({
				name: name
			}));
		},

		sortByQuery: function(query){
			rater.query = query;
			rater.array = this.children
			this.children = _.map(rater.sorted(), 'd');
			return this;
		},

		shuffle: function(){
			return new CardGroup({
				children: _.shuffle(this.children),
			});
		},

		filter: function(){
			return new CardGroup({
				children: _.filter(this.children)
			});
		}

	}

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

	return CardGroup
}