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


document.addEventListener("keydown", (event) => {
    // TODO: Add your code here
    // Hint: Check if game is over first
    // Hint: Convert event.key to uppercase
    // Hint: Handle three cases: BACKSPACE, ENTER, and letters A-Z
    // Hint: Call the appropriate function for each case
    if (gameOver) return;


    if (/^[a-z]$/i.test(event.key)) {
        addLetter(event.key.toUpperCase())
        return;
    }

    if (event.key === "Backspace") {
        deleteLetter();
        return;
    }
    if (event.key === "Enter") {
        submitGuess();
        return;
    }
});


// TODO: Implement addLetter function
function addLetter(letter) {
    if (gameOver || currentTile >= 5) return;
    

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
    const tiles = rows[currentRow].querySelectorAll('.tile');
    const result = checkGuess(guess, tiles);

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
}

function checkGuess(guess, tiles) {
    logDebug(`🔍 Starting analysis for "${guess}"`, 'info');
    
    // TODO: Split TARGET_WORD and guess into arrays
    const target = TARGET_WORD.split('');
    const guessArray = guess.split('');
    const result = ['absent', 'absent', 'absent', 'absent', 'absent'];
    
    // STEP 1: Find exact matches
    for (let i = 0; i < 5; i++) {
        if (target[i] === guessArray[i]) {
            result[i] = 'correct';
            // TODO: mark both target[i] and guessArray[i] as used (null)
            target[i]     = null
            guessArray[i] = null
        }
    }
    
    // STEP 2: Find wrong position matches  
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] !== null) { // only check unused letters
            for (let j = 0; j < 5; j++) {
                if (target[j] === guessArray[i]) {
                    result[i] = 'present';
                    target[j] = null;      // mark target letter as used
                    guessArray[i] = null;  // mark guess letter as used
                    break;                 // stop after first match
                }
            }
        }
    }   
    
    for (let i = 0; i < 5; i++) {
        tiles[i].classList.add(result[i]);
    }
    return result;
}