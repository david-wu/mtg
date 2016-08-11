var fs = require('fs');
var _ = require('lodash');

var path = require('path');

// function loadAllCards(){
// 	return new Promise(function(resolve, reject){
// 		fs.readFile('./allCards.json', function(err, data){
// 			if(err){reject(err);}
// 			resolve(JSON.parse(data));
// 		})
// 	})
// }

// function getNames(cards){
// 	return _.keys(cards);
// 	return _.mapValues(cards, function(card){
// 		return '';
// 	});
// }

// loadAllCards()
// 	.then(getNames)
// 	.then(function(names){
// 		var now = Date.now()
// 		_.times(100, function(){
// 			var results = fuzzy.filter('test', names)
// 			// console.log(results[0])
// 		})
// 		console.log(Date.now() - now)
// 	})
// 	.then(console.log);


function Mtg(){
	_.defaults(this, {
		dir: __dirname,
		path: __dirname+'/allCards.json'
	});
}

Mtg.prototype = {

	setAllCards: function(cards){
		return this.loadAllCards()
			.then((cards)=>{
				this.allCards = new CardGroup({
					children: _.keys(cards)
				});
			})
	},

	loadAllCards: function(){
		return new Promise((resolve, reject)=>{
			fs.readFile(this.path, function(err, data){
				if(err){
					return reject(err);
				}
				resolve(JSON.parse(data));
			});
		});
	},

	saveNames: function(names){
		return new Promise((resolve, reject)=>{
			fs.writeFile(this.dir+'/names.json', JSON.stringify(names), function(err){
				if(err){
					return reject(err);
				}
				resolve(names);
			});
		})
	}

}


var Rater = require('./rater.js');
function CardGroup(options){
	_.extend(this, options);
}
CardGroup.prototype = {
	search: function(query){
		var rater = new Rater();
		rater.query = query;
		rater.array = this.children
		return _.map(rater.sorted(), 'd');
	}
}

module.exports = Mtg;