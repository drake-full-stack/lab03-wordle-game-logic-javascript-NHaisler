// ===== GAME STATE VARIABLES =====
const TARGET_WORD = "WORDS";  // Our secret word for testing
let currentRow = 0;           // Which row we're filling (0-5)
let currentTile = 0;          // Which tile in the row (0-4)
let gameOver = false;         // Is the game finished?

// DOM element references (set up on page load)
let gameBoard, rows, debugOutput;

// ===== HELPER FUNCTIONS (PROVIDED) =====

// Debug/Testing Functions
function logDebug(message, type = 'info') {
    // Log to browser console
    console.log(message);
    
    // Also log to visual testing area
    if (!debugOutput) {
        debugOutput = document.getElementById('debug-output');
    }
    
    if (debugOutput) {
        const entry = document.createElement('div');
        entry.className = `debug-entry ${type}`;
        entry.innerHTML = `
            <span style="color: #666; font-size: 12px;">${new Date().toLocaleTimeString()}</span> - 
            ${message}
        `;
        
        // Add to top of debug output
        debugOutput.insertBefore(entry, debugOutput.firstChild);
        
        // Keep only last 20 entries for performance
        const entries = debugOutput.querySelectorAll('.debug-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
}

function clearDebug() {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Debug output cleared - ready for new messages...</p>';
    }
}

// Helper function to get current word being typed
function getCurrentWord() {
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let word = '';
    tiles.forEach(tile => word += tile.textContent);
    return word;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameBoard = document.querySelector('.game-board');
    rows = document.querySelectorAll('.row');
    debugOutput = document.getElementById('debug-output');
    
    logDebug("🎮 Game initialized successfully!", 'success');
    logDebug(`🎯 Target word: ${TARGET_WORD}`, 'info');
    logDebug("💡 Try typing letters, pressing Backspace, or Enter", 'info');
});

// ===== YOUR CHALLENGE: IMPLEMENT THESE FUNCTIONS =====

// TODO: Add keyboard event listener
document.addEventListener("keydown", (event) => {
    
   console.log("A key was pressed:", event.key);

});

// TODO: Implement addLetter function
function addLetter(letter) {
    if (gameOver || currentTile >= 5) return;
    letter = letter.toUpperCase();

    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');

    tiles[currentTile].textContent = letter; // was "+="
    tiles[currentTile].classList.add('filled');
    currentTile++;
    logDebug(getCurrentWord());


}

// TODO: Implement deleteLetter function  
function deleteLetter() {
    if (gameOver) return;

    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    if (currentTile > 0) {
        currentTile--; // move cursor back first
        const tile = tiles[currentTile];
        const letterToDelete = tile.textContent;
        tile.textContent = '';
        tile.classList.remove('filled'); // was classList.add('')
        logDebug(`Removed ${letterToDelete}`);
    } else {
        alert("No letters, ERROR");
    }
}


// TODO: Implement submitGuess function
function submitGuess() {
    if (gameOver) return;

    if (currentTile !== 5) {
        alert("Please enter 5 letters!");
        return;
    }

    const guess = getCurrentWord();

    if (guess === TARGET_WORD) {
        gameOver = true;
        setTimeout(() => alert("Congratulations! You won!"), 500);
    } else if (currentRow === rows.length - 1) {
        gameOver = true;
    } else {
        logDebug(currentRow);
        currentRow++;
        logDebug(currentRow);
        currentTile = 0;
    }

    logDebug(guess);
    return;
    return;
}





document.addEventListener("keydown", (event) => {
    // TODO: Add your code here
    // Hint: Check if game is over first
    // Hint: Convert event.key to uppercase
    // Hint: Handle three cases: BACKSPACE, ENTER, and letters A-Z
    // Hint: Call the appropriate function for each case

    if (/^[a-z]$/i.test(event.key)) {
        addLetter(event.key)
    }

    if (event.key === "Backspace") {
        deleteLetter();
    }
    if (event.key === "Enter") {
        submitGuess();
    }
});


// TODO: Implement checkGuess function (the hardest part!)
// function checkGuess(guess, tiles) {
//     // Your code here!
//     // Remember: handle duplicate letters correctly
//     // Return the result array
// }