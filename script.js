document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const playerXScore = document.getElementById('playerXScore');
    const playerOScore = document.getElementById('playerOScore');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Initialize the board
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    // Handle cell click event
    function handleCellClick(event) {
        const index = event.target.getAttribute('data-index');

        if (boardState[index] === '' && gameActive) {
            boardState[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            if (checkWin()) {
                declareWinner();
            } else if (checkDraw()) {
                declareDraw();
            } else {
                togglePlayer();
            }
        }
    }

    // Check for a winning pattern
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return true;
            }
        }
        return false;
    }

    // Check for a draw
    function checkDraw() {
        if (!boardState.includes('')) {
            endGame();
            return true;
        }
        return false;
    }

    // Declare the winner
    function declareWinner() {
        endGame(Player ${currentPlayer} wins!);
        updateScore();
    }

    // Declare a draw
    function declareDraw() {
        endGame('It\'s a draw!');
    }

    // Switch players
    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = Player ${currentPlayer}'s turn;
    }

    // End the game
    function endGame(message) {
        gameActive = false;
        status.textContent = message;
    }

    // Update the score
    function updateScore() {
        if (currentPlayer === 'X') {
            playerXScore.textContent = parseInt(playerXScore.textContent) + 1;
        } else {
            playerOScore.textContent = parseInt(playerOScore.textContent) + 1;
        }
    }

    // Reset the game
    function resetGame() {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;

        // Clear the board
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
        });

        status.textContent = Player X's turn;
    }

    // Initialize the board when the DOM is ready
    initializeBoard();
});