var _ = require('lodash');
var express = require('express');
var router = express.Router();

var fuzzyTutor = require('fuzzy-tutor');

var allCards = require('../../mtg/allCards.js');
var cardNames = Object.keys(allCards);
router.get('/card', function(req, res){
	res.json(cardNames)
})

var cardCache = {};
router.get('/card/:name', function(req, res){
	var name = req.params.name;

	if(cardCache[name]){
		return res.json(cardCache[name])
	}

	fuzzyTutor.query(name)
		.then(function(card){
			cardCache[name] = card;
			res.json(card)
		})
})

router.get('/card/:names', function(req, res){
	var name = req.params.names;

	Promise.all(_.map(req.params.names, function(name){
		if(cardCache[name]){
			return res.json(cardCache[name])
		}else{
			return fuzzyTutor.query(name)
				.then(function(card){
					cardCache[name] = card;
					res.json(card)
				});
		}
	}))

})



module.exports = router;
