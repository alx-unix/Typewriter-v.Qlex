function timer(secs) {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    const timerDisplay = document.getElementById('timer');
    const timerBar = document.getElementById("timer-bar")
    timerInterval = setInterval(() => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        secs--;
        
        if (secs < 0) {
            clearInterval(timerInterval);
            timerDisplay.innerText = "Time's up!";
            endGame();
        }

    }, 1000);
}

function endGame() {
    gameActive = false;
    
    userInputElement.disabled = true;
    submitWordButton.disabled = true;
    
    const finalScore = showResult(score, words);
    scoreSection.textContent = `Final Score: ${finalScore.toFixed(1)}%`;
}

function startGame(difficulty) {
    gameActive = true;
    score = 0;
    words = 0;
    
    userInputElement.disabled = false;
    submitWordButton.disabled = false;
    
    scoreSection.textContent = "Score: 0%";
    
    let timeLimit;
    switch(difficulty) {
        case 'easy': timeLimit = 60; break;
        case 'medium': timeLimit = 45; break;
        case 'hard': timeLimit = 30; break;
        default: timeLimit = 10;
    }
    
    timer(timeLimit);
}

function generateRandomWord(){
    let word = wordList[Math.floor(Math.random() * wordList.length)];
    return word;
    }


function showResult(score,words){
    return (score / words)* 100
} 

function main() {
    console.log('Initializing game...');
    let score = 0;
    let words = 0;
    let currentWord = '';
    
    // Get DOM elements
    const startButton = document.getElementById("strButton");
    const divWordShown = document.getElementById("wordChosen");
    const userInputElement = document.getElementById("word-tapped");
    const scoreSection = document.getElementById("score-section");
    
    // Initially disable input
    userInputElement.disabled = true;
    console.log('Input field disabled initially');
    
    // Start button handler
    startButton.addEventListener('click', () => {
        console.log('Start button clicked');
        if (!gameActive) {
            console.log('Starting new game...');
            // Reset game state
            score = 0;
            words = 0;
            userInputElement.disabled = false;
            userInputElement.value = '';
            userInputElement.focus();
            
            // Show first word
            currentWord = generateRandomWord();
            console.log('First word generated:', currentWord);
            divWordShown.textContent = currentWord;
            scoreSection.textContent = "Score: 0%";
            
            // Start game with default difficulty if none selected
            let difficulty = 'easy';
            for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    difficulty = radioButton.value;
                    break;
                }
            }
            console.log('Selected difficulty:', difficulty);
            startGame(difficulty);
        } else {
            console.log('Game already in progress');
        }
    });
    
    // Handle user input with Enter key
    userInputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && gameActive) {
            event.preventDefault(); // Prevent default Enter behavior
            console.log('Enter key pressed');
            
            const userInput = userInputElement.value;
            const currentWordLower = currentWord.toLowerCase();
            
            console.log('Comparing words:', {
                userInput,
                currentWord: currentWordLower,
                match: userInput === currentWordLower
            });
            
            // Compare input with current word
            if (userInput === currentWordLower) {
                score++;
                console.log('Correct word! Score increased to:', score);
            } else {
                console.log('Incorrect word');
            }
            words++;
            
            // Update score display
            const currentScore = (score / words) * 100;
            scoreSection.textContent = `Score: ${currentScore.toFixed(1)}%`;
            console.log('Updated score:', {
                correct: score,
                attempts: words,
                percentage: currentScore.toFixed(1) + '%'
            });
            
            // Generate new word and reset input
            currentWord = generateRandomWord();
            console.log('New word generated:', currentWord);
            divWordShown.textContent = currentWord;
            userInputElement.value = ''; // Clear input field
            
            // Game state summary
            console.log('Current game state:', {
                gameActive,
                score,
                words,
                currentWord,
                currentScore: currentScore.toFixed(1) + '%'
            });
        }
    });
    
    // Modify endGame function to show popup
    window.endGame = function() {
        console.log('Game ending...');
        gameActive = false;
        userInputElement.disabled = true;
        userInputElement.value = '';
        const finalScore = (score / words) * 100;
        console.log('Final game results:', {
            totalWords: words,
            correctWords: score,
            finalScore: finalScore.toFixed(1) + '%'
        });
        
        // Create and show popup
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(#673AB7,#512DA8);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 10 0 10px rgba(0,0,0,0.5);
            z-index: 1000;
            text-align: center;
            min-width: 300px;
            font-family:"Galindo",sans-serif;
        `;
        
        popup.innerHTML = `
            <h2>Game Over!</h2>
            <p>Final Score: ${finalScore.toFixed(1)}%</p>
            <p>Words Attempted: ${words}</p>
            <p>Correct Words: ${score}</p>
            <button onclick="this.parentElement.remove()">Close</button>
        `;
        
        document.body.appendChild(popup);
        console.log('Game over popup displayed');
    };
    
    console.log('Game initialization complete');
}

function timerBar(){

}