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