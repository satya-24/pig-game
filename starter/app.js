/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice1Score,dice2Score, finalScore;
init();
$('.btn-new').on('click', init);
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdValue);
function rollDice() {
    if (!isThereAWinner()) {
        dice1Score = Math.ceil(Math.random() * 6);
        dice2Score = Math.ceil(Math.random() * 6);
        if(dice1Score == 1 || dice2Score == 1){
            changePlayer();
        }
        else if(dice1Score == 6 && dice2Score == 6){
            changePlayer();
        }
        else{
            continuePlaying();
        }
    }
}
function holdValue() {
    if (!isThereAWinner()) {
        addCurrentScoreToTotalScore();
        finalScore = document.querySelector('.final-score').value;
        if(!finalScore){
           finalScore = 100; 
        }
        if (scores[activePlayer] >= finalScore) {
            stopGame();
        } else {
            changePlayer();
        }
    }
}
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    player0Init();
    player1Init();
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    finalScore = 100;
    document.querySelector('.final-score').value = finalScore;
}
function player0Init() {
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-0').textContent = roundScore;
    document.getElementById('name-0').textContent = 'Player 1';
    document.querySelector('.player-0-panel').classList.remove('active');
}
function player1Init() {
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-1').textContent = roundScore;
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-1-panel').classList.remove('active');
}
function continuePlaying() {
    document.querySelector('#dice-1').style.display = 'block';
    document.querySelector('#dice-2').style.display = 'block';
    document.querySelector('#dice-1').src = 'dice-' + dice1Score + '.png';
    document.querySelector('#dice-2').src = 'dice-' + dice2Score + '.png';
    roundScore += dice1Score + dice2Score;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
}

function changePlayer() {
    roundScore = 0;
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.getElementById('current-' + activePlayer).textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function isThereAWinner() {
    return (document.getElementById('name-0').textContent === 'Winner' || document.getElementById('name-1').textContent === 'Winner');
}

function addCurrentScoreToTotalScore() {
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
}

function stopGame() {
    document.getElementById('name-' + activePlayer).textContent = 'Winner';
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
}

