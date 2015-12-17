
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
    shuffle : function( array ) {
    	// Thanks Stackoverflow! I did not write it - cut paste : Profs to SOF!
		var currentIndex = array.length, temporaryValue, randomIndex ;

		while (0 !== currentIndex) {
    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;

    		temporaryValue = array[currentIndex];
    		array[currentIndex] = array[randomIndex];
    		array[randomIndex] = temporaryValue;
  		}
  		return array;
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
try {
    module.exports.Deck = Deck;
    module.exports.Card = Card;
    module.exports.Player = Player;
} catch ( ignore ) {
    // This will be tripped only if loaded into a webpage.
}
