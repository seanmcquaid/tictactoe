// ====== Global Variables ======
// init game as player 1's turn
let whoseTurn = 1;
// make an array for both players and push each new square onto the appropriate array
let playerOneSquares = [];
let playerTwoSquares = [];

const winningCombos = [
    ["A1", "B1", "C1"], // row 1
    ["A2", "B2", "C2"], // row 2
    ["A3", "B3", "C3"], // row 3
    ["A1", "A2", "A3"], // col 1
    ["B1", "B2", "B3"], // col 2
    ["C1", "C2", "C3"], // col 3
    ["A1", "B2", "C3"], // diag 1
    ["A3", "B2", "C1"], // diag 2
];

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
                checkWin(playerOneSquares, 1);
            } else {
                this.innerHTML = "O";
                whoseTurn = 1;
                document.getElementById("message").innerHTML = "It's X's turn!";
                playerTwoSquares.push(this.id);
                checkWin(playerTwoSquares, 2);
            }
        } else{
            document.getElementById("message").innerHTML = "Sorry, this square is taken!!";
        }
    })
}

function checkWin(playerSquares, whoMarked){
    console.log("checking to see who won")
    // console.log(playerSquares);
    // console.log(whoMarked);
    // we just know who went
    // and we know what squares they have
    // outer loop= check each winning combination
    for(let i = 0; i < winningCombos.length; i++){
        // keep track of how many squares in THIS combo
        let squareCount = 0;
        // check each square inside of this winning combo
        // winningCombos[i] = the winning combo we are on
        for(j = 0; j < winningCombos.length; j++){
            // winning combos[i][j] = the square in the winningcombo we are on
            const winningSquare = winningCombos[i][j];
            if(playerSquares.includes(winningSquare)){
                // player has this square
                squareCount++;
            }
        } if(squareCount === 3){
            // console.log("player won!")
            // console.log(winningCombos[i]);
            endGame(winningCombos[i], whoMarked)
        }
    }
}

function endGame(winningCombo, whoWon){
    // if we get to end game.... WINNER WINNER, CHICKEN DINNER
    // so the game is over
    document.querySelector("#message").innerHTML = `CONGRATS TO PLAYER ${whoWon}!`;
    // we know which squares are the winning squares
    for(let i=0; i < winningCombo.length; i++){
        const winningSquare = winningCombo[i];
        const squareElem = document.getElementById(winningSquare);
        squareElem.className += " winning-square";
    }
}