'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnrollEl = document.querySelector('.btn--roll');
const btnholdEl = document.querySelector('.btn--hold');
const btnNewEl = document.querySelector('.btn--new');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let currentValue = 0;
let score = [0, 0];
let activePlayer = 0;
let playing = true;

//Inital Game Condition
const ResetGame = () => {
  playing = true;
  currentValue = 0;
  score = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  showCurrentValue(0);
  activePlayer = 0;
};

//Show Current Value
const showCurrentValue = value => {
  document.querySelector(`#current--${activePlayer}`).textContent = value;
};
//switch active player
const switchPlayer = () => {
  showCurrentValue(0);
  activePlayer = activePlayer == 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
  currentValue = 0;
};

//Roll the Dice
const RollDice = () => {
  if (playing) {
    let diceValue = Math.floor(Math.random() * 6 + 1);
    if (diceEl.classList.contains('hidden')) {
      diceEl.classList.remove('hidden');
    }
    diceEl.src = `dice-${diceValue}.png`;
    if (diceValue == 1) switchPlayer();
    else {
      currentValue += diceValue;
      showCurrentValue(currentValue);
    }
  }
};
const HoldScore = () => {
  if (playing) {
    score[activePlayer] += currentValue;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
};
ResetGame();

btnrollEl.addEventListener('click', RollDice);
btnholdEl.addEventListener('click', HoldScore);
btnNewEl.addEventListener('click', ResetGame);
