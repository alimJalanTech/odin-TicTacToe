const gameBoard = (() => {
  //Fill the board 3x3 values
  const board = fillBoard();

  const render = () => {
    let boardHTML = "";
    board.forEach((square, position) => {
      boardHTML += `<div class="squares" id="${position}"> ${square} </div>`;
    });

    document.querySelector(".gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".squares");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (position, value) => {
    board[position] = value;
    render();
  };

  const getGameboard = () => board;
  return {
    render,
    update,
    getGameboard,
  };
})();

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector(".player1").value, "X"),
      createPlayer(document.querySelector(".player2").value, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    gameBoard.render();

    const squares = document.querySelectorAll(".squares");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const handleClick = (event) => {
    if (gameOver) {
      return;
    }
    let index = Number(event.target.id);

    if (gameBoard.getGameboard()[index] !== "") {
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
      return;
    }

    const currentPlayer = players[currentPlayerIndex].name;
    const currentMark = players[currentPlayerIndex].mark;
    gameBoard.update(index, currentMark);
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    if (checkForWin(gameBoard.getGameboard(), currentMark)) {
      gameOver = true;
      alert(`${currentPlayer} with ${currentMark} won!`);
      restart();
    } else if (checkForTie(gameBoard.getGameboard())) {
      gameOver = true;
      alert("Match Tied");
      restart();
    }
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      gameBoard.update(i, "");
    }
    gameBoard.render();
    gameOver = false;
  };

  return {
    start,
    restart,
    handleClick,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

function fillBoard() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push("");
  }
  return board;
}

function checkForWin(board, currentMark) {
  const winningWay = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < 8; i++) {
    const [a, b, c] = winningWay[i];
    if (board[a] == currentMark && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForTie(board) {
  let isTie = true;
  board.forEach((cell) => {
    if (cell === "") {
      isTie = false;
    }
  });
  return isTie;
}

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
  Game.start();
});

const restartButton = document.querySelector(".restart-button");
restartButton.addEventListener("click", () => {
  Game.restart();
});
