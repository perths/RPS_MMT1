/**
 * @author Parth Surti
 * @summary Script for Rock Paper Scissor game
 * 
 * This script is developed for a simple Rock Scissors game.
 * The game is 1 verus 1, where Player 1 is the User and Player 2 is the Computer.
 * Each player selects one object i.e. Rock or Paper or Scissor.
 * Rock beats Scissor, Scissors beats Paper, Paper beats Rock.
 * There is no Best of 3 or Best or X condition, every round is final and determines if one loses or wins.
 * The overall score is stored in the browser's local storage.
 * 
 * This game has the following display states
 * 1)Play State
 *    The user i.e. Player 1 has to select one of the three objects by clicking on them
 *     Scores Div, Play Game Div & Rules(Button & List) are visible in this state
 * 
 * 2)Result State
 *    This state is triggerd once both the Players have selected a object.
 *    This state shows the outcome depending upon the selection of both players.
 *    It can have the three outcomes:
 *      i)Player 1 Wins & Player 2 Loses
 *      ii)Player 1 Loses & Player 2 Wins
 *      iii)Tie up 
 *    Scores Div, Result Div(which displays the object selected by each Player & Play Again or Replay button)
 *    & Rules(Button & List) are visible in this state.
 * 
 * 3)Victory State
 *    This state is shown when Player 1 wins and clicks on the Next button
 *    This state shows a Trophy image, Play Again button & Rules(Button & List)
 */

/**
 * Initialising all the HTML elements
 */

/** Buttons */
const rulesBtn = document.querySelectorAll('#rules-btn');
const nextBtn = document.getElementById('next-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const replayBtn = document.getElementById('replay-btn');

/** Play Game Div */
const playBoard = document.getElementById('play-board-div');

/** Scores Div */
const computerScore = document.getElementById('computer-score');
const userScore = document.getElementById('user-score');

/** Result Div */
const resultParentDiv = document.getElementById('result-parent-div');
const userResult = document.querySelector('.user-result');
const computerResult = document.querySelector('.computer-result');
const resultText = document.getElementById('result-text-1');
const resultText2 = document.getElementById('result-text-2');
const selectionHeading = document.querySelectorAll('.selection-heading');

/** Player focus borders  */
const userFocusBorder1 = document.querySelector('.user-focus-border-1');
const userFocusBorder2 = document.querySelector('.user-focus-border-2');
const userFocusBorder3 = document.querySelector('.user-focus-border-3');
const computerFocusBorder1 = document.querySelector('.computer-focus-border-1');
const computerFocusBorder2 = document.querySelector('.computer-focus-border-2');
const computerFocusBorder3 = document.querySelector('.computer-focus-border-3');
const userFocusBorders = [userFocusBorder1, userFocusBorder2, userFocusBorder3];
const computerFocusBorders = [computerFocusBorder1, computerFocusBorder2, computerFocusBorder3];

/** Rules Div */
const rulesDiv = document.getElementById('rules-div');
const closeRulesDiv = document.getElementById('rules-close-div');

/** Game Won Div */
const wonGameDiv = document.querySelector('.won-game-div');



let score = {
  user: 0,
  computer: 0,
};

/** 
 * Check for score in Local Storage
 * Set score if score found in local storage
 */
if (localStorage.getItem('rpsScore')) {
  score = JSON.parse(localStorage.getItem('rpsScore'));
}

/** Set score counters */
userScore.innerHTML = score.user;
computerScore.innerHTML = score.computer;

/** Mapping game outcome texts */
const result = {
  win: 'YOU WIN',
  lose: 'YOU LOSE',
  tie: 'TIE UP',
};

/** Trigger Play State */
const playAgain = () => {
  playBoard.style.display = 'grid';
  resultParentDiv.style.display = 'none';
  wonGameDiv.style.display = 'none';
  nextBtn.style.display = 'none';
}

/**
 * @summary generates a random number between 0 to 2 and fetches element at position in the objects array
 * @returns {String} rock OR paper OR scissor
 */
const getComputerSelection = () => {
  const objects = ['rock', 'paper', 'scissor'];
  const number = Math.floor(Math.random() * (2 - 0 + 1) + 0);
  return objects[number];
}

/**
 * @param {String} selection rock OR paper OR scissor 
 * @returns img tag with the selected object
 */
const createImage = (selection) => {
  return `<img src='./images/${selection}.png' alt=${selection} width='60px'/>`;
}

/**
 * @summary Clears the previous Results so that new Result can be rendered
 */
const clearResultState = () => {

  resultParentDiv.style.marginTop = '4.5%';

  selectionHeading.forEach((element) => element.style.top = '320px');

  userResult.classList.remove('rock-div');
  userResult.classList.remove('paper-div');
  userResult.classList.remove('scissor-div');

  computerResult.classList.remove('rock-div');
  computerResult.classList.remove('paper-div');
  computerResult.classList.remove('scissor-div');

  playAgainBtn.style.display = 'none';
  resultText2.style.display = 'none';
  replayBtn.style.display = 'none';
  nextBtn.style.display = 'none';
}

/**
 * @summary Checks the object selection of both players and renders result screen accordingly
 * @param {String} userSelection rock OR paper OR scissor
 */
const computeGame = (userSelection) => {

  clearResultState();

  const computerSelection = getComputerSelection();

  let resultDisplayText;
  let outcome = 0;

  // Tie up i.e. both have same object selected
  if (userSelection === computerSelection) {
    resultDisplayText = result.tie;

    playAgainBtn.style.display = 'none';
    replayBtn.style.display = 'block';
    resultText2.style.display = 'none';

    selectionHeading.forEach((element) => element.style.top = '280px');
    resultParentDiv.style.marginTop = '8%';

    outcome = 1;
    setFocus(outcome);
  }

  // Player 1 (User) Wins & Player 2 (Computer) Loses
  else if (
    (userSelection === 'rock' && computerSelection === 'scissor') ||
    (userSelection === 'paper' && computerSelection === 'rock') ||
    (userSelection === 'scissor' && computerSelection === 'paper')
  ) {
    resultDisplayText = result.win;

    playAgainBtn.style.display = 'block';
    resultText2.style.display = 'block';
    nextBtn.style.display = 'block';

    outcome = 2;
    setFocus(outcome);
    score.user++;
  }

  // Player 1 (User) Loses & Player 2 (Computer) Wins
  else {
    resultDisplayText = result.lose;

    playAgainBtn.style.display = 'block';
    resultText2.style.display = 'block';

    outcome = 3;
    setFocus(outcome);
    score.computer++;
  }

  // Preparing to show Result State
  playBoard.style.display = 'none';
  resultParentDiv.style.display = 'flex';

  userResult.classList.add(`${userSelection}-div`);
  computerResult.classList.add(`${computerSelection}-div`);
  userResult.innerHTML = createImage(userSelection);
  computerResult.innerHTML = createImage(computerSelection);
  resultText.innerHTML = resultDisplayText;

  // Check if the outcome is 1 i.e. tie
  if (outcome != 1) {
    // Update score counters
    userScore.innerHTML = score.user;
    computerScore.innerHTML = score.computer;

    // Save score in browser local storage
    localStorage.setItem('rpsScore', JSON.stringify(score));
  }
};


/**
 * @summary Sets/Removes focus borders on the Player selected object depending on the outcome
 * @param {Number} outcome 1 OR 2 OR 3 
 */
const setFocus = (outcome) => {
  switch (outcome) {
    // Tie
    case 1: {
      for (let i = 0, counter = 1; i < userFocusBorders.length; i++, counter++) {

        userFocusBorders[i].classList.remove(`win-focus-border-${counter}`);
        userFocusBorders[i].classList.remove(`lose-focus-border-${counter}`);

        computerFocusBorders[i].classList.remove(`win-focus-border-${counter}`);
        computerFocusBorders[i].classList.remove(`lose-focus-border-${counter}`);
      }
      break;
    }
    // Player 1 (User) Wins & Player 2 (Computer) Loses
    case 2: {
      for (let i = 0, counter = 1; i < userFocusBorders.length; i++, counter++) {

        userFocusBorders[i].classList.remove(`lose-focus-border-${counter}`);
        userFocusBorders[i].classList.add(`win-focus-border-${counter}`);

        computerFocusBorders[i].classList.remove(`win-focus-border-${counter}`);
        computerFocusBorders[i].classList.add(`lose-focus-border-${counter}`);
      }
      break;
    }
    // Player 1 (User) Loses & Player 2 (Computer) Wins
    case 3: {
      for (let i = 0, counter = 1; i < userFocusBorders.length; i++, counter++) {

        userFocusBorders[i].classList.remove(`win-focus-border-${counter}`);
        userFocusBorders[i].classList.add(`lose-focus-border-${counter}`);

        computerFocusBorders[i].classList.remove(`lose-focus-border-${counter}`);
        computerFocusBorders[i].classList.add(`win-focus-border-${counter}`);
      }
      break;
    }
    // This will never be the case
    default:
      break;
  }
}

/**
 * Registering Event Listeners
 */

rulesBtn.forEach((element) => {
  element.addEventListener('click', () => {

    /** 
     * When RULES button is clicked
     * Close Rules when it's Open & Open it when it's Closed 
     */
    if (rulesDiv.style.display == 'none' || rulesDiv.style.display == '')
      rulesDiv.style.display = 'block';
    else
      rulesDiv.style.display = 'none';
  });
});

/** Close icon for closing Rules */
closeRulesDiv.addEventListener('click', () => {
  rulesDiv.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
  /**
   * When NEXT button is clicked
   * Hide Play Game Div and show Game Won Div
   */
  playBoard.style.display = 'none';
  resultParentDiv.style.display = 'none';
  wonGameDiv.style.display = 'flex';
});

playAgainBtn.addEventListener('click', playAgain);

replayBtn.addEventListener('click', playAgain);
