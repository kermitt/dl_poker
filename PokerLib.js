/*
Deck
HandOdds
Player
Logic
Card
*/
var Deck = function() {
	this.setup();
}


var HandOdds = function( hole_cards, community_cards  ) {
	this.hole_cards = hole_cards;
	this.community_cards = community_cards;

	this.hand = [];
	for ( c in hole_cards ) {
		this.hand.push( hole_cards[c]);
	}
	for ( c in community_cards) {
		this.hand.push( community_cards[c]);
	}
	this.odds = {};
}
var Player = function( name, stack ) {
	this.name = name;
	this.stack = stack;
	this.cards = []; 
}




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
Deck.prototype = {
	setup : function() { 
		values = [2,3,4,5,6,7,8,9,10,11,12,13,14];
		faces  = ["H","C","S","D"];
    	this.weights = [];
    	this.inputs = [];

    	this.deck = [];
    	for ( var i = 0; i < values.length; i++ ) {
    		for ( var j = 0; j < faces.length; j++ ) {
    			this.deck.push( new Card( values[i], faces[j] ));
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


Player.prototype = {
	addCard : function( card ) {
		this.cards.push( card );
	}
}

var Logic = function( player, community_cards  ) {

	this.player = player; 
	this.community_cards = community_cards;

	this.hand = [];
	for ( var c in community_cards ) {
		this.hand.push( community_cards[c]);
	}
	for ( var c in player.cards) {
		this.hand.push( player.cards[c]);
	}

	this.HoL = {}; // hash of lists
	this.HoL["straightflush"] = this.isStraightFlush();
	this.HoL["is_4_of_a_kind"] = this.is_4_of_a_kind(); 
	this.HoL["fullhouse"] = this.isFullHouse();
	this.HoL["flush"] =  this.isFlush();
	this.HoL["straight"] = this.isStraight();
	this.HoL["3_of_a_kind"] =  this.is_3_of_a_kind();
	this.HoL["2_pair"] =  this.is_2_pair();
	this.HoL["pair"] =  this.is_pair();
}

Logic.prototype = {
	/* this will be logic around the 'made hands' */
	isStraightFlush : function( ) {
		var _isStraightFlush = isf;
		var highestCard_inStraightFlush = hcis;
	},
	is_4_of_a_kind : function() {
		var _is_4_of_a_kind = false;
		var value_of_the_4_of_a_kind = -1;
	},
	isFullHouse : function() {},
	isFlush : function() {},
	isStraight : function() {},
	is_3_of_a_kind : function() {},
	is_2_pair : function() {}, 
	is_pair : function() {},

	handFinder : function() {
		var seen = {}; 
		for ( var c in this.hand ) {
			var v = this.hand[c].value;  
			if ( seen.hasOwnProperty( v ) ) {
				seen[v]++;
			} else {
				seen[v] = 1;
			}
		}

		for ( var observed in seen ) {
			if ( seen[observed] == 4 ) {
	
				// OK, so we have a 4 of a kind.
				// Does the player hold _any_ of these cards?
				var playerHasCardInThe4 = false;
				for ( var c in this.player.cards ) {
					if ( this.player.cards[c].value == seen[observed] ) {
						playerHasCardInThe4 = true;
					}
				}
				this.getHighestCC_notInQuad(seen[observed]);
			}
		}
	},
	getCommunityKicker : function( target6 ) {
		var communityKicker = -1;
		for ( var i in this.community_cards ) {
			var card = this.community_cards[i];

			if ( card.value != target6 ) {
				if ( card.value > communityKicker ) {
					communityKicker = card.value;
				}
			}
		} 
		var holeKicker = -1; 
		for ( var i in this.player.cards ) {
			if ( this.player.cards[i].value > holeKicker  ) {
				holeKicker = this.player.cards[i].value;
			}
		}
		var I_have_a_higher_kicker_biggen_than_the_board = false; 

		if ( holeKicker > communityKicker ) {
			I_have_a_higher_kicker_biggen_than_the_board = true; 		
		}
		return I_have_a_higher_kicker_biggen_than_the_board; 
	}
};


HandOdds.prototype = {
	//http://www.wikihow.com/Calculate-Pot-and-Hand-Odds-in-Limit-Hold-'Em-Poker
	count_matching_values : function() {
		var seen = {}; 
		for ( var c in this.hand ) {
			var v = this.hand[c].value;  
			if ( seen.hasOwnProperty( v ) ) {
				seen[v]++;
			} else {
				seen[v] = 1;
			}
		}
		return seen; 
	},
};

try {
    module.exports.Deck = Deck;
    module.exports.Card = Card;
    module.exports.Player = Player;
    module.exports.HandOdds = HandOdds;
} catch ( ignore ) {
    // This will be tripped only if loaded into a webpage.
}
