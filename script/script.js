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

function rollDice() {
    const diceOneFaces = Array.from(document.querySelectorAll(".face1"));
    const diceTwoFaces = Array.from(document.querySelectorAll(".face2"));
    const activeDice = document.querySelector(".face1");
    //const activeText = document.querySelector(".textColor-active");

    // Disable active dice/face 
    activeDice.classList.remove("active");

    // Deactivate the player-1 intial active score/turns state
    player1TextColor.classList.remove("textColor-active");
   
    // Generate a random face index between 0 and 5 (inclusive)
    const randomFaceOneIndex = Math.floor(Math.random() * 6);
    const randomFaceTwoIndex = Math.floor(Math.random() * 6);
    
    // Switch players
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    // Hide all dice faces and their child elements initially
    diceOneFaces.forEach(face => {
        face.style.display = "none";
        const dots = face.querySelectorAll(".dot");
        dots.forEach(dot => {
            dot.style.display = "none";
        });
    });

    diceTwoFaces.forEach(face => {
        face.style.display = "none";
        const dots = face.querySelectorAll(".dot");
        dots.forEach(dot => {
            dot.style.display = "none";
        });
    });

    // Show randomly selected dice face and its child dots
    if (playerOneCurrentTurns > 0 || playerTwoCurrentTurns > 0){
        diceOneFaces[randomFaceOneIndex].style.display = "grid";
        const dotsOneToShow = diceOneFaces[randomFaceOneIndex].querySelectorAll(".dot");
        dotsOneToShow.forEach(dot => {
            dot.style.display = "block";
        });
    
        diceTwoFaces[randomFaceTwoIndex].style.display = "grid";
        const dotsTwoToShow = diceTwoFaces[randomFaceTwoIndex].querySelectorAll(".dot");
        dotsTwoToShow.forEach(dot => {
            dot.style.display = "block";
        });
    }
    
    //Track players- scroes and turns
    if (turn === 0 && currentPlayer === 1){
        playerTurn.classList.add("player1");
        playerTurn.classList.remove("player2");
        playerTurn.innerHTML = "Now, Player-1's turn!";
        turn = 1;
        diceTwoFaces[randomFaceTwoIndex].classList.remove("player2-active-dice");
        diceOneFaces[randomFaceOneIndex].classList.add("player1-active-dice");
        player1TextColor.classList.add("player-1-text-color");
        player2TextColor.classList.remove("player-2-text-color");
        player2TurnsLeft();
        addScoreForPlayer2(randomFaceTwoIndex + 1);
    } else {
        playerTurn.classList.remove("player1");
        playerTurn.classList.add("player2");
        playerTurn.innerHTML = "Now, Player-2's turn!";
        turn = 0;
        diceTwoFaces[randomFaceTwoIndex].classList.add("player2-active-dice");
        diceOneFaces[randomFaceOneIndex].classList.remove("player1-active-dice");
        player2TextColor.classList.add("player-2-text-color");
        player1TextColor.classList.remove("player-1-text-color");
        player1TurnsLeft();
        addScoreForPlayer1(randomFaceOneIndex + 1);
    }

    displayResult();
}