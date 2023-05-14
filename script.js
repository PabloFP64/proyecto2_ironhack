const words = ["dog", "jazz","apple","ironhack","cat"];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = new Set();
let guessesLeft = 6;

const wordDisplay = document.getElementById("word-display");
const guessesLeftDisplay = document.getElementById("guesses-left");
const resultDisplay = document.getElementById("result");
const retryButton = document.getElementById("retry");
updateWordDisplay();

function updateWordDisplay() {
  let word = "";
  for (let i = 0; i < chosenWord.length; i++) {
    if (guessedLetters.has(chosenWord[i])) {
      word += chosenWord[i];
    } else {
      word += "_";
    }
    word += " ";
  }
  wordDisplay.textContent = word;
}

function updateGuessesLeftDisplay() {
  guessesLeftDisplay.textContent = guessesLeft;
}

function updateResultDisplay(result) {
  resultDisplay.textContent = result;
}

function checkWin() {
  for (let i = 0; i < chosenWord.length; i++) {
    if (!guessedLetters.has(chosenWord[i])) {
      return false;
    }
  }
  return true;
}

function checkLose() {
  return guessesLeft === 0;
}

function endGame() {
  for (let i = 0; i < letters.length; i++) {
    letters[i].setAttribute("disabled", "");
  }
  retryButton.style.display = "block";
}

function resetGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters.clear();
  guessesLeft = 6;
  updateWordDisplay();
  updateGuessesLeftDisplay();
  updateResultDisplay("");
  for (let i = 0; i < letters.length; i++) {
    letters[i].removeAttribute("disabled");
  }
  retryButton.style.display = "none";
}

function guessLetter(letter) {
  if (guessedLetters.has(letter)) {
    return;
  }
  guessedLetters.add(letter);
  if (chosenWord.includes(letter)) {
    updateWordDisplay();
    if (checkWin()) {
      updateResultDisplay("You win!");
      endGame();
    }
  } else {
    guessesLeft--;
    updateGuessesLeftDisplay();
    if (checkLose()) {
      updateResultDisplay("You lose!");
      endGame();
    }
  }
}

const letters = document.querySelectorAll(".letter");
for (let i = 0; i < letters.length; i++) {
  letters[i].addEventListener("click", function () {
    guessLetter(this.textContent.toLowerCase());
    this.setAttribute("disabled", "");
  });
}

  

