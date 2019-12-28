let scores, roundScore, activePlayer, gamePlaying, prevDiceRoll;

init();

document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1; // random number between 1 and 6.
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = '../src/assets/dice-' + dice + '.png'

        if (prevDiceRoll === 6 && dice === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        prevDiceRoll = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gamePlaying) {
        // add current score to the global score
        scores[activePlayer] += roundScore;
    
        // Update the DOM
         document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //check if player won the game, The first player to reach 100 points on GLOBAL score wins the game
        let winningScore = document.getElementById('winning-score').value;
        winningScore ? winningScore = 20 : winningScore;

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('.winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('.winner');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    prevDiceRoll = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
} 

document.querySelector('.btn-new').addEventListener('click', init);
