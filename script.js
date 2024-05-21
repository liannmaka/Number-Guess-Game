const guessField = document.querySelector(".guessField");
const submitBtn = document.querySelector(".submit-btn");
const guesses = document.querySelector(".guesses");
const guessResult = document.querySelector(".guessResult");
const lowOrHi = document.querySelector(".lowOrHi");
const wrapper = document.querySelector(".content-wrapper");
const errorMessage = document.querySelector(".message");


let guessCount = localStorage.getItem("guessCount") ? parseInt(localStorage.getItem("guessCount")) : 0;
let previousGuesses = localStorage.getItem("previousGuesses") ? JSON.parse(localStorage.getItem("previousGuesses")) : [];
let resetButton;
let randomNumber = Math.floor(Math.random() * 100) + 1;

guessField.focus();

if(previousGuesses.length > 0) {
    guesses.textContent = `Previous guesses: ${previousGuesses.join(" ")}`
};

const showErrorMessage = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.add("error");
};

const clearErrorMessage = () => {
    errorMessage.textContent = "";
    errorMessage.classList.remove("error");
};


const toggleSubmitButton = () => {
    if(guessField.value.trim() === "" || isNaN(guessField.value)) {
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-disabled", true);  
    } else if(guessField.value < 1 || guessField.value > 100) {
        showErrorMessage("Please enter a number between 1 and 100.");
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-disabled", true); 
    } else {
        clearErrorMessage();
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-disabled", false); 
    }
};

guessField.addEventListener("input", toggleSubmitButton);

toggleSubmitButton();

const checkGuess = () => {
    let userGuess = Number (guessField.value);

    if (guessCount === 0) {
        guesses.textContent = "Previous guesses:";
    }
    guesses.textContent = `${guesses.textContent} ${userGuess}`;

    previousGuesses.push(userGuess)
    localStorage.setItem("previousGuesses", JSON.stringify(previousGuesses))

    if (userGuess === randomNumber) {
        guessResult.textContent = "Correct! You won";
        guessResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        resetGame();
    } else if (guessCount === 9) {
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

    toggleSubmitButton();
    guessCount++; 
    localStorage.setItem("guessCount", guessCount);

    guessField.value = "";
    guessField.focus();
};

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(guessCount <= 10) {
        checkGuess();
    } else {
        guessField.disabled = true;
        guessField.setAttribute("aria-disabled", true);
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-disabled", true);
    }  
});

window.addEventListener('load', () => {
    if (guessCount === 10) {
        guessField.disabled = true;
        guessField.setAttribute("aria-disabled", true);
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-disabled", true);
        resetGame();
    }
});

const resetGame = () => {
    guessField.disabled = true;
    guessField.setAttribute("aria-disabled", true);
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-disabled", true);

    resetButton = document.createElement("button");
    resetButton.classList.add("reset-button");

    resetButton.textContent = "Reset Game";

    wrapper.appendChild(resetButton);

    resetButton.addEventListener("click", restartGame);
};

const restartGame = () => {
    const paragraph = document.querySelectorAll(".result-wrapper p");

    for (const para of paragraph ) {
        para.textContent = "";
    };

    guessField.disabled = false;
    guessField.setAttribute("aria-disabled", false);
    submitBtn.disabled = false;
    submitBtn.setAttribute("aria-disabled", false);

    wrapper.removeChild(resetButton);

    guessCount = 0;
    previousGuesses = [];

    localStorage.removeItem("guessCount");
    localStorage.removeItem("previousGuesses");

    guessField.focus();
    toggleSubmitButton();
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessResult.style.backgroundColor = "transparent";   
};