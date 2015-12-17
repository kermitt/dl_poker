
var Card = function(value, face, human ) {
	this.value = value;
	this.face = face;
	if ( value === 14) {// ace
		this.human = "Ace_" + face;
	} else if ( value === 13) {// king
		this.human = "King_" + face;
	} else if ( value === 12 ) {// queen
		this.human = "Queen_" + face;
	} else if ( value === 11) {// jack
		this.human = "Jack_" + face;
	} else {		// normal card
		this.human = value + "_" + face;
	}
}
var Deck = function() {
	this.setup();
}
Deck.prototype = {
	setup : function() { 
		values = [2,3,4,5,6,7,8,9,10,11,12,13,14];
		faces  = ["A","C","S","D"];
    	this.weights = [];
    	this.inputs = [];

    	this.deck = [];
    	for ( var i = 0; i < values.length; i++ ) {
    		for ( var j = 0; j < faces.length; j++ ) {
    			this.deck.push( new Card( values[i], faces[j] ))
    		}
    	}
    	this.deck = this.shuffle( this.deck ); 
    },
    shuffle : function( ary ) {
		var currentIndex = ary.length, tmp, randIndex ;

		while (0 !== currentIndex) {
    		randIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;

    		tmp = ary[currentIndex];
    		ary[currentIndex] = ary[randIndex];
    		ary[randIndex] = tmp;
  		}
  		return ary;
  	}
}







var Player = function( name, stack ) {
	this.name = name;
	this.stack = stack;
	this.cards = []; 
}
Player.prototype = {
	addCard : function( card ) {
		this.cards.push( card );
	} 
}

var HandOdds = function( cards_in_hand, flop, card_count_left_in_deck ) {
	/// Given cards_in_hand + flop how many outs to the follows hands?
	this.cards_in_hand = cards_in_hand;
	this.flop = flop;
	this.card_count_left_in_deck = card_count_left_in_deck;

	this.odds = {};
	this.odds["pair"] = this.pair();
	this.odds["overCard"] = overCard();
	this.odds["twoPair_to_Fullhouse"] = this.twoPair_to_Fullhouse();
	this.odds["onePair_to_twoPair"] = this.onePair_to_twoPair();
	this.odds["onePair_to_set"] = this.onePair_to_set();
	this.odds["noPair_to_pair"] = this.noPair_to_pair();
	this.odds["twoOverCards_to_overCardPair"] = this.twoOverCards_to_overCardPair();
	this.odds["set_to_fullHouse"] = this.set_to_fullHouse();
	this.odds["flush"] = this.flush();
	this.odds["insideStraight_twoOverCards"] = this.insideStraight_twoOverCards();
	this.odds["flush_and_insideStraight"] = this.flush_and_insideStraight();
	this.odds["flush_and_openStraight"] = this.flush_and_openStraight();
}
HandOdds.prototype = {
	//http://www.wikihow.com/Calculate-Pot-and-Hand-Odds-in-Limit-Hold-'Em-Poker
	pair : function() {
		//given 4spade and 4heart : 
		//flop 6club 7diamond Tspade
		//looking for 4diamond or 4club
		//better return 2	
		return -1
	},
	overCard : function() {
		return -1
	},
	twoPair_to_Fullhouse : function() { 
		return -1
	},
	onePair_to_twoPair : function(){ return -1; },
	onePair_to_set : function(){ return -1; },
	noPair_to_pair : function(){ return -1; },
	twoOverCards_to_overCardPair : function(){ return -1; },
	set_to_fullHouse : function(){ return -1; },
	flush : function(){ return -1; },
	insideStraight_twoOverCards : function(){ return -1; },
	flush_and_insideStraight : function(){ return -1; },
	flush_and_openStraight : function(){ return -1; },

};
try {
    module.exports.Deck = Deck;
    module.exports.Card = Card;
    module.exports.Player = Player;
} catch ( ignore ) {
    // This will be tripped only if loaded into a webpage.
}
