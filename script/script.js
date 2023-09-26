//DOM
const playerTurn = document.querySelector(".whos-turn");
const titles = document.querySelectorAll(".title");
const player1Score = document.querySelector(".player1-score");
const player1TextColor = document.querySelector(".player-1-data");
const player2TextColor = document.querySelector(".player-2-data");
const player2Score = document.querySelector(".player2-score");
const player1Turns = document.querySelector(".player1-turnsLeft");
const player2Turns = document.querySelector(".player2-turnsLeft");
const playButton = document.querySelector(".play-btn");
const gameResult = document.querySelector(".result");
const mainContainer = document.querySelector(".main-container");

//game states
let turn = 0;
let currentPlayer = 1;
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let playerOneCurrentTurns = 10;
let playerTwoCurrentTurns = 10;

//functions- to track players turns
function player1TurnsLeft(){
    if (playerOneCurrentTurns > 0){
        playerOneCurrentTurns--;
        player1Turns.innerHTML = playerOneCurrentTurns;
    }
}
function player2TurnsLeft(){
    if (playerTwoCurrentTurns > 0){
        playerTwoCurrentTurns--;
        player2Turns.innerHTML = playerTwoCurrentTurns;
    }   
}

//functions- to add scores
function addScoreForPlayer1(addedScore){
    if (playerOneCurrentTurns > 0){
        player1CurrentScore += addedScore;
        player1Score.innerHTML = player1CurrentScore;
    }  
}
function addScoreForPlayer2(addedScore){
    if (playerTwoCurrentTurns > 0){
        player2CurrentScore += addedScore;
        player2Score.innerHTML = player2CurrentScore;    
    }  
}

// function- reload page/restart game
function tryAgain(){
    window.location.reload();
}

//function- to show result immediately
function displayResult() {
    if (playerOneCurrentTurns === 0 && playerTwoCurrentTurns === 0) {
        //Game restart button
        let tryButton = document.createElement("button");
        tryButton.className = "btn";
        tryButton.textContent = "Try Again";
        tryButton.addEventListener("click", tryAgain);

        if (player1CurrentScore > player2CurrentScore) {
            gameResult.innerHTML = "Player-1 Win!";
            player1TextColor.style.color = "red";
            player2TextColor.style.color = "#333";
        } else if (player2CurrentScore > player1CurrentScore) {
            gameResult.innerHTML = "Player-2 Win!";
            player2TextColor.style.color = "red";
            player1TextColor.style.color = "#333";
        } else if (player2CurrentScore === player1CurrentScore) {
            gameResult.innerHTML = "Game tie!";
            player1TextColor.style.color = "green";
            player2TextColor.style.color = "green";
        }
        gameResult.style.display = "flex";
        gameResult.classList.add("result-style");
        playerTurn.style.display = "none";
        titles.forEach(title => {
            title.style.display = "none";
        });
        playButton.style.display = "none";
        mainContainer.appendChild(tryButton);
    }
}