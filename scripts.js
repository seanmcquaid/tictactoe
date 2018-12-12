
let gameOn = true;
let whoseTurn = 1;
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

for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener("click", function(event){
        if (gameOn){
        if(this.innerHTML === "-"){
            if(whoseTurn === 1){
                this.innerHTML = "X";
                whoseTurn = 2;
                document.getElementById("message").innerHTML = "It's O's turn!";
                playerOneSquares.push(this.id);
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
        }
    })
}
    

function checkWin(playerSquares, whoMarked){
    console.log("checking to see who won")
    for(let i = 0; i < winningCombos.length; i++){
        let squareCount = 0;
        for(j = 0; j < winningCombos.length; j++){
            const winningSquare = winningCombos[i][j];
            if(playerSquares.includes(winningSquare)){
                squareCount++;
            }
        } if(squareCount === 3){
            endGame(winningCombos[i], whoMarked)
        }
    }
}

function endGame(winningCombo, whoWon){
    document.querySelector("#message").innerHTML = `${whoWon} Wins!`;

    let friendButton = document.querySelector("#friend-button");
    let computerButton = document.querySelector("#computer-button");
    // friendButton.style.visiblity = "visible";
    // computerButton.style.visiblity = "visible";
    friendButton.addEventListener("click", playAgain);
    computerButton.addEventListener("click", playAgain);

    for(let i=0; i < winningCombo.length; i++){
        const winningSquare = winningCombo[i];
        const squareElem = document.getElementById(winningSquare);
        squareElem.className += " winning-square";
    }
    gameOn = false;
}


function playAgain(){
    // let friendButton = document.querySelector("#friend-button");
    // let computerButton = document.querySelector("#computer-button");
    // friendButton.style.visiblity = "hidden";
    // computerButton.style.visiblity = "hidden";
    gameOn = true;
    whoseTurn = 1;
    playerOneSquares = [];
    playerTwoSquares = [];
    console.log("start again");
    for(let i = 0; i < squares.length; i++){
        squares[i].innerHTML = "-";
        squares[i].classList.remove("winning-square");
    }
}

// generate computer moves via random numbers and letters
// if board is full and neither player wins, offer the option to start over
// generate a nth sized grid?