const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Handle Player Move
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.innerText = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.innerText = gameActive ? `Player ${currentPlayer}'s Turn` : statusText.innerText;
        }
    });
});

// Check for Winner
function checkWinner() {
    let roundWon = false;
    
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (!board.includes("")) {
        statusText.innerText = "😲 It's a Draw!";
        gameActive = false;
    }
}

// Restart Game
resetButton.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.innerText = "Player X's Turn";
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("win");
    });
});
