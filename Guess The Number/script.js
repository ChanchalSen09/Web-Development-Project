let random = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector(`#subt`);
const userInput = document.querySelector(`#guessF`);
const guessSlot = document.querySelector(`.guessprevios`);
const remaining = document.querySelector(`.guessremain`);
const lOH = document.querySelector(`.LoworHigh`);
const start = document.querySelector(`.result`);
const p = document.createElement("p");

let prevGuess = [];
let numGuess = 1;
let playgames = true;
if (playgames === true) {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
    // console.log(guess);
  });
}
function validateGuess(guess) {
  //
  if (isNaN(guess)) {
    alert(`Please Enter the valid Number`);
  } else if (guess <= 0) {
    alert(`Please Enter the above 1 number`);
  } else if (guess > 100) {
    alert(`Please Enter the below 100 number`);
  } else {
    prevGuess.push(guess);
    if (numGuess >= 10) {
      displayguess(guess);
      displaymsg(`GAME OVER The random number was ${random}`);
      endGame();
    } else {
      displayguess(guess);
      checkGuess(guess);
    }
  }
}
function checkGuess(guess) {
  //
  if (guess === random) {
    displaymsg("You Guessed is right");
    endGame();
  } else if (guess < random) {
    displaymsg("The number is TOOOOO Low");
  } else {
    displaymsg("The Number is TOOOOO HIGH");
  }
}
function displaymsg(msg) {
  lOH.innerHTML = `<h2>${msg}</h2>`;
}
function displayguess(guess) {
  userInput.value = ``;
  guessSlot.innerHTML += `${guess} , `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}

function endGame(guess) {
  userInput.value = "";
  userInput.setAttribute("disabled", ""); // Fix the typo here
  p.classList.add("button");
  p.innerHTML = '<h1 id="newGame">Start the New game</h2>'; // Fix the id attribute here
  start.appendChild(p);
  playgames = false;
  newGame(guess);
}

function newGame(guess) {
  //  lOH.innerHTML = `<h2>${}</h2>`;
  const newGAMEBUTTON = document.querySelector("#newGame");
  newGAMEBUTTON.addEventListener(`click`, (e) => {
    random = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute(`disabled`);
    start.removeChild(p);
    playgames = true;
  });
}
