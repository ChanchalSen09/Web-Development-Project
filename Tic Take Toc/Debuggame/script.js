document.addEventListener("DOMContentLoaded", function () {
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
  const restartButton = document.getElementById("restartButton");
  const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
  );
  const playerDialog1 = document.getElementById("playerDialog1");
  const playerDialog2 = document.getElementById("playerDialog2");
  const overlay = document.getElementById("overlay");
  const player1NameInput = document.getElementById("player1Name");
  const player2NameInput = document.getElementById("player2Name");
  const startGameButton = document.getElementById("startGameButton");

  let circleTurn;
  let player1Choice;
  let player2Choice;
  let player1Name = "";
  let player2Name = "";

  playerDialog1.style.display = "block";
  overlay.style.display = "block";

  startGameButton.addEventListener("click", () => {
    player1Name = player1NameInput.value;
    player2Name = player2NameInput.value;
    player1Choice = document.querySelector(
      'input[name="player1Choice"]:checked'
    ).value;
    player2Choice = document.querySelector(
      'input[name="player2Choice"]:checked'
    ).value;

    console.log("Player 1 Name: " + player1Name);
    console.log("Player 2 Name: " + player2Name);
    console.log("Player 1 Choice: " + player1Choice);
    console.log("Player 2 Choice: " + player2Choice);

    if (player1Name && player2Name && player1Choice && player2Choice) {
      console.log("Starting the game!");
      playerDialog1.style.display = "none";
      playerDialog2.style.display = "none";
      overlay.style.display = "none";
      startGame();
    } else {
      alert(
        "Please fill in both player names and make a choice for each player."
      );
    }
  });

  restartButton.addEventListener("click", () => {
    playerDialog1.style.display = "block";
    overlay.style.display = "block";
    startGame();
  });

  function startGame() {
    if (player1Choice === "x") {
      X_CLASS = "x";
      CIRCLE_CLASS = "circle";
    } else {
      X_CLASS = "circle";
      CIRCLE_CLASS = "x";
    }

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
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
    }
  }

  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = "It's a draw!";
    } else {
      winningMessageTextElement.innerText = `${
        circleTurn ? player2Name : player1Name
      } is the winner!`;
    }
    winningMessageElement.classList.add("show");
  }

  function isDraw() {
    return [...cellElements].every((cell) => {
      return (
        cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
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
});
