const guessField = document.querySelector(".guessField");
const submitBtn = document.querySelector(".submit-btn");
const guesses = document.querySelector(".guesses");
const guessResult = document.querySelector(".guessResult");
const lowOrHi = document.querySelector(".lowOrHi");
const wrapper = document.querySelector('.content-wrapper');

let guessCount = 1
guessField.focus();
let resetButton;

let randomNumber = Math.floor(Math.random() * 100) + 1

const toggleSubmitButton = () => {
    if(guessField.value.trim() === '' || guessField.value < 1 || guessField.value > 100) {
        submitBtn.disabled = true;
    } else {
        submitBtn.disabled = false;
    }
}

guessField.addEventListener('input', toggleSubmitButton);

toggleSubmitButton();

const checkGuess = () => {
    let userGuess = Number (guessField.value);

    if(guessCount === 1) {
        guesses.textContent = 'Previous guesses:';
    };
    guesses.textContent = `${guesses.textContent} ${userGuess}`;

    if (userGuess === randomNumber) {
        guessResult.textContent = "Correct! You won";
        guessResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        resetGame();
    } else if (guessCount === 10) {
        guessResult.textContent = "GAME OVER!!!";
        lowOrHi.textContent = "";
        resetGame();
    } else if (userGuess !== randomNumber) {
        guessResult.textContent = "Wrong! Try again";
        guessResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "User guess is low"; 
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "User guess is high";
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
    toggleSubmitButton();
};

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkGuess();
});

const resetGame = () => {
    guessField.disabled = true;
    submitBtn.disabled = true;

    resetButton = document.createElement('button');
    resetButton.classList.add('reset-button');

    resetButton.textContent = 'Reset Game';

    wrapper.appendChild(resetButton);

    resetButton.addEventListener('click', restartGame);
};

const restartGame = () => {
    const paragraph = document.querySelectorAll('.result-wrapper p');

    for (const para of paragraph ) {
        para.textContent = "";
    };

    guessField.disabled = false;
    submitBtn.disabled = false;

    wrapper.removeChild(resetButton);

    guessCount = 1;

    guessField.focus();

    toggleSubmitButton();

    guessResult.style.backgroundColor = 'transparent';

    randomNumber = Math.floor(Math.random() * 100) + 1;
};