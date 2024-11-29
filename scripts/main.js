let startButton = document.getElementById("strButton");
let diffChosen = document.getElementById("set-diff")
let fieldsetDiff = document.getElementById("choose-diff-fieldset")
let radioButtons = document.querySelectorAll('input[name="difficulty"]');
let divWordShown = document.getElementById("wordChosen");
let userInputElement = document.getElementById("user-input");
let submitWordButton = document.getElementById("submit-word");
let scoreSection = document.getElementById("score-section")
let gameActive = false;
let timerInterval = null;



// Start the game logic when page loads
console.log('Starting main game function');
main();
