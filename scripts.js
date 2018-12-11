
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
    document.querySelector("#message").innerHTML = `CONGRATS TO PLAYER ${whoWon}!`;

    let friendButton = document.createElement("button");
    friendButton.textContent = "Play Against Your Friend";
    document.querySelector(".buttons-section").appendChild(friendButton);
    friendButton.classList.add("play-again");

    let compButton = document.createElement("button");
    compButton.textContent = "Play Against the Computer";
    document.querySelector(".buttons-section").appendChild(compButton);
    compButton.classList.add("play-again");
    
    for(let i=0; i < winningCombo.length; i++){
        const winningSquare = winningCombo[i];
        const squareElem = document.getElementById(winningSquare);
        squareElem.className += " winning-square";
    }
    gameOn = false;
}


function playAgain(){
    gameOn = true;
    for(let i = 0; i < playerOneSquares; i++){
        playerOneSquares.pop(i);
        console.log(playerOneSquares);
    }
    for(let i = 0; i < playerTwoSquares; i++){
        playerTwoSquares.pop(i);
        console.log(playerTwoSquares);
    }
}

// generate computer moves via random numbers and letters

// 