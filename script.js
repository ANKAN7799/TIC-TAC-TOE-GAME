const board = document.getElementById('board');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
const cells = Array.from({ length: 9 });

// Initialize the game board
cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    board.appendChild(cell);
});

// Handle cell click event
board.addEventListener('click', (e) => {
    const cell = e.target;
    if (cell.classList.contains('cell') && !cell.textContent) {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    checkWinner();
});

// Reset the game
resetButton.addEventListener('click', () => {
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
});

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            setTimeout(() => {
                alert(`${cells[a].textContent} wins!`);
                resetButton.click();
            }, 100);
            return;
        }
    }
}
