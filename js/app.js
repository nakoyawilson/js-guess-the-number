// Variables
const userInput = document.querySelector(".num-input"),
    button = document.querySelector(".guess-btn"),
    feedback = document.querySelector(".feedback"),
    errorMessage = document.querySelector(".error"),
    numGuessesDisplay = document.querySelector(".num-guesses"),
    guesses = document.querySelector(".guesses"),
    numList = document.querySelector(".numbers-list"),
    guessedNumsDisplay = document.querySelector(".guessed-nums"),
    answerDisplay = document.querySelector(".the-number"),
    results = document.querySelector(".results"),
    playAgain = document.querySelector(".play-again"),
    yesButton = document.querySelector(".yes"),
    thanks = document.querySelector(".thanks");

let answer = randomNumber(),
    numGuesses = 0,
    guessedNums = [];

guesses.style.display = "block";
numList.style.display = "block";
thanks.style.display = "none";
playAgain.style.display = "none";
errorMessage.style.display = "none";

// Functions   
function randomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function updateResults(userGuess) {
    numGuesses++;
    guessedNums.push(userGuess);
    numGuessesDisplay.innerHTML = numGuesses;
    guessedNumsDisplay.innerHTML = guessedNums;
    userInput.value = "";
}

function displayError(message) {
    errorMessage.innerHTML = message;
    errorMessage.style.display = "block";
    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 3000);
    userInput.value = "";
}

// Events
button.addEventListener("click", () => {
    const guess = Number(userInput.value);
    if (isNaN(guess) || guess === 0) {
        displayError("Please enter a number");
    } else if (guessedNums.includes(guess)) {
        displayError("You already guessed that number");
    } else if (guess < answer) {
        feedback.innerHTML = "Your Guess it Too Low";
        updateResults(guess);
    } else if (guess > answer) {
        feedback.innerHTML = "Your Guess it Too High";
        updateResults(guess);
    } else {
        guesses.style.display = "none";
        numList.style.display = "none";
        updateResults(guess);
        feedback.innerHTML = "You guessed the number!";
        answerDisplay.innerHTML = `The Number was ${answer}`;
        results.innerHTML = `You guessed it in ${numGuesses} guesses`;
        button.disabled = "true";
        playAgain.style.display = "block";
    }
})

playAgain.addEventListener("click", (e) => {
    if (e.target.classList.contains("yes")) {
        location.reload();
    }
    if (e.target.classList.contains("no")) {
        thanks.style.display = "block";
        yesButton.disabled = "true";
    }
})
