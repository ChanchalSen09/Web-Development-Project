const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.getElementById("restartButton");
const choiceModal = document.getElementById("choiceModal");
let circleTurn;
let player1Name;
let player2Name;

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  modal.style.display = "block";
});

document.getElementById("startButton").addEventListener("click", function () {
  player1Name = document.getElementById("player1Name").value;
  player2Name = document.getElementById("player2Name").value;

  if (player1Name && player2Name) {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    choiceModal.style.display = "block";
    document.getElementById("choiceText").textContent = "Player 1";
  } else {
    alert("Please enter names for both players.");
  }
});

document.getElementById("zeroButton").addEventListener("click", function () {
  choiceModal.style.display = "none";
  startGame(player1Name, player2Name, true);
  document.getElementById("choiceText").textContent = player1Name;
});

document.getElementById("crossButton").addEventListener("click", function () {
  choiceModal.style.display = "none";
  startGame(player1Name, player2Name, false);
  document.getElementById("choiceText").textContent = player1Name;
});

restartButton.addEventListener("click", startGame);

function startGame(player1Name, player2Name, player1Choice, player2Choice) {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (isDraw()) {
    endGame(true, currentClass);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw, winnerClass) {
  let winnerName;
  if (draw) {
    winnerName = "It's a Draw!";
  } else {
    winnerName = winnerClass === X_CLASS ? player1Name : player2Name;
    winnerName += " is the winner!";
  }
  winningMessageTextElement.innerText = winnerName;
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
