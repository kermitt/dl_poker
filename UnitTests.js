var Card = require("./PokerLib").Card;
var Deck = require("./PokerLib").Deck;
var Player = require("./PokerLib").Player;
var HandOdds = require("./PokerLib").HandOdds;



var deck = new Deck();
var table = [];
var flop = [];

function matching_values_count() {

    var hole = [];
    var community = [];

    hole.push(new Card( 2, "H"));
    hole.push(new Card( 2, "D"));
    hole.push(new Card( 4, "H"));

    community.push(new Card( 5, "H"));
    community.push(new Card( 6, "H"));
    community.push(new Card( 7, "H"));

    var handodds = new HandOdds( hole, community);

    var result = handodds.count_matching_values();
    var isOk = false;
    if ( result[2] == 2 ) {
        isOk = true; 
    }
    verdict( isOk, "matching_values_count");
}

function verdict( isOk, msg ) { 
    var verdict = isOk ? "PASS" : "FAIL";
    console.log( verdict + "\t" + msg); 
}

function init() {


/* 
    table.push( new Player("Alpha",100));
    table.push( new Player("Bravo",50));
    table.push( new Player("Charlie",66));
    table.push( new Player("Delta",20));
    table.push( new Player("Echo",26));
    table.push( new Player("Foxtrox",83));

    // set hole cards
    for ( var i = 0; i < 2; i++ ) {
        for ( var j in table ) {
            table[j].addCard(deck.deck[0]); 
            deck.deck.splice(0,1);
        }
    }
    for ( var i = 0; i < 3; i++ ) {
        flop.push(deck.deck[0]); 
        deck.deck.splice(0,1);
    }

//    showRound();
*/
    matching_values_count(); 
}

function countOuts( player ) {
    // erm How to count outs?
    return player.stack; 


}

function showRound() {
    console.log("Deck size " + deck.deck.length );
    console.log("Flop is:");
    for ( var i in flop ) {
        console.log("\t" + flop[i].human);
    }
    console.log("");
    for ( var i in table ) {
        var p = table[i];
        var msg = "Stack: " + p.stack + "\t\tWho: " + p.name + "\t\t";
        for ( var j in p.cards ) {
            msg += p.cards[j].human + " : ";
        }
        var outs = countOuts( p );
        //msg += outs;
        console.log( msg ); 
    }


}
/*
    Backdoor: A straight or flush draw where you need two cards to help your hand out.
    You have [A K]. Flop shows [T 2 5]. You need both a [J] and [Q] for a straight.

    Overcard Draw: When you have a card above the flop.
    You have [A 3]. Flop shows [K 5 2]. You need a [A] overcard to make top pair. 3 total outs.

    Inside Straight Draw (aka 'Gutshot'): When you have one way to complete a straight.
    You have [J T]. Flop shows [A K 5]. You need a [Q] to complete your straight. 4 total outs.

    Open Straight Draw: When you have two ways to complete a straight.
    You have [5 6]. Flop shows [7 8 A]. You need a [4] or [9] to complete your straight. 8 total outs.

    Flush Draw: Having two cards to a suit with two suits already on the flop.
    You have [A♥ K♥]. Flop shows [7♥ 8♥ J♣]. You need any heart to make a flush. 9 total outs.
*/


    console.log("\n\n");

init();
    console.log("\n\n");
