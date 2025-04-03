const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const moveCounterText = document.getElementById("moveCounter");
const resetButton = document.getElementById("reset");
const undoButton = document.getElementById("undo");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let moveHistory = [];
let playerXName = "Player X";
let playerOName = "Player O";
let moveCounter = 0;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];

function startGame() {
    playerXName = document.getElementById("playerX").value || "Player X";
    playerOName = document.getElementById("playerO").value || "Player O";
    statusText.textContent = `${playerXName}'s Turn (X)`;
    gameActive = true;
}

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!gameActive || board[cell.id] !== "") return;

        clickSound.play();

        board[cell.id] = currentPlayer;
        moveHistory.push({ index: cell.id, player: currentPlayer });
        moveCounter++;
        moveCounterText.textContent = `Moves: ${moveCounter}`;
        
        cell.textContent = currentPlayer;
        checkWinner();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `${currentPlayer === "X" ? playerXName : playerOName}'s Turn (${currentPlayer})`;
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `${board[a] === "X" ? playerXName : playerOName} Wins! 🎉`;
            document.getElementById(a).classList.add("win");
            document.getElementById(b).classList.add("win");
            document.getElementById(c).classList.add("win");
            winSound.play();
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Tie! 🤝";
        gameActive = false;
    }
}

resetButton.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    moveHistory = [];
    gameActive = true;
    moveCounter = 0;
    moveCounterText.textContent = "Moves: 0";
    currentPlayer = "X";
    statusText.textContent = `${playerXName}'s Turn (X)`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
});

undoButton.addEventListener("click", () => {
    if (moveHistory.length === 0) return;
    
    let lastMove = moveHistory.pop();
    board[lastMove.index] = "";
    document.getElementById(lastMove.index).textContent = "";
    
    currentPlayer = lastMove.player;
    statusText.textContent = `${currentPlayer === "X" ? playerXName : playerOName}'s Turn (${currentPlayer})`;
    
    moveCounter--;
    moveCounterText.textContent = `Moves: ${moveCounter}`;
});

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
