
let gameOn = true;
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
                this.innerHTML = "X";
                playerOneSquares.push(this.id);
                checkWin(playerOneSquares, 1);
                computerMove();
                checkWin(playerTwoSquares, 2);
            } else{
                document.getElementById("message").innerHTML = "Sorry, this square is taken!!";
            }
        }
    })
}
    

function checkWin(playerSquares, whoMarked){
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
    let computerButton = document.querySelector("#again-button");
    computerButton.style.visibility = "visible";
    computerButton.addEventListener("click", playAgain);

    for(let i=0; i < winningCombo.length; i++){
        const winningSquare = winningCombo[i];
        const squareElem = document.getElementById(winningSquare);
        squareElem.className += " winning-square";
    }
    gameOn = false;
}


function playAgain(){
    let computerButton = document.querySelector("#again-button");
    computerButton.style.visibility = "hidden";
    gameOn = true;
    whoseTurn = 1;
    playerOneSquares = [];
    playerTwoSquares = [];
    for(let i = 0; i < squares.length; i++){
        squares[i].innerHTML = "-";
        squares[i].classList.remove("winning-square");
    }
}

function computerMove() {
    const letter = ["A", "B", "C"]
    let randomLet = Math.floor(Math.random() * 3)
    let randomNum =  Math.ceil(Math.random() * 3)
    let computerPlay = letter[randomLet] + randomNum.toString()
        if(!playerOneSquares.includes(computerPlay) && !playerTwoSquares.includes(computerPlay)){
            playerTwoSquares.push(computerPlay);
            squares[computerPlay].innerHTML = "O";
        } else {
            computerMove();
        }
    }


// if board is full and neither player wins, offer the option to start over
// generate a nth sized grid?