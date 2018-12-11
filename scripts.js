// ====== Global Variables ======
// init game as player 1's turn
let whoseTurn = 1;
// make an array for both players and push each new square onto the appropriate array
let playerOneSquares = [];
let playerTwoSquares = [];

const squares = document.getElementsByClassName("square");

// squares is an array with 9 objects in it
// each element is an html button element
// this will return the window
// this refers to the element referenced
// console.log(this);

for(let i = 0; i < squares.length; i++){
    // console.log(squares[i]);
    // now that we have all the squares individually (squares[i]),
    // we can add an event listener to each one
    // to add event listener:
    // 1) what to listen to
    // 2) add the event listener 
    // 3) first arg: what event to listen for 
    // 4) second arg: function to run if that event happens
    // adds listener for EACH INDIVIDUAL SQUARE
    squares[i].addEventListener("click", function(event){
        // every JS event will give you the event object
        // console.log(event);
        // this in JS is the equiv of self in python
        // this will return the squares[i]
        // this is the thing clicked on
        // console.log(this);
        // check to see if the square is taken
        if(this.innerHTML === "-"){
            // it's not taken so see whose turn it is 
            if(whoseTurn === 1){
                this.innerHTML = "X"; // update the DOM
                whoseTurn = 2; // update JS
                document.getElementById("message").innerHTML = "It's O's turn!"; // update the DOM
                playerOneSquares.push(this.id); // this is referring to squares[i]'s id
            } else {
                this.innerHTML = "O";
                whoseTurn = 1;
                document.getElementById("message").innerHTML = "It's X's turn!";
                playerTwoSquares.push(this.id);
            }
        } else{
            document.getElementById("message").innerHTML = "Sorry, this square is taken!!";
        }
        console.log(playerOneSquares);
        console.log(playerTwoSquares);
    })
}