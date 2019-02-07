var Word = require("./word");
var inquirer = require("inquirer");

var guitarists = ["EDDIE VAN HALEN", "JIMMY PAGE", "JIMI HENDRIX", "SLASH", "STEVIE RAY VAUGHAN", "GEORGE HARRISON", "BRIAN MAY", "CHET ATKINS", "JOHN MAYER", "KIRK HAMMETT"];
var chosenWord;
var wordInstance; // tracking updates to chosenWord, and used to check if a guess is successful
var guessesRemaining = 9;
var guessedLetters = [];

function gameStart() {
    var randomizer = Math.floor(Math.random() * guitarists.length);
    chosenWord = new Word(guitarists[randomizer]);
    chosenWord.createLetters(); // initialize Letters constructor inside Word constructor
    wordInstance = chosenWord.wordString();
    console.log("\nNEW GAME STARTED! Please enter a letter and press enter to make a guess.");
    logGuessesRemaining();
    gamePrompt();
}

function logGuessesRemaining() {
    console.log(`You have ${guessesRemaining} guesses remaining.`);
}

function gamePrompt() {
    if (guessesRemaining !== 0) {
        console.log(chosenWord.wordString());

        inquirer.prompt([
            {
            type: "input",
            name: "char",
            message: "\n Enter a letter to guess...",
            validate: function validateChar(name) {
                var reg = /^[a-zA-Z]+$/;
                return reg.test(name) || "Error, please enter a valid letter";
                }
            }
        ]).then(answers => {
            gameCheckGuess(answers);
        });
    } else {
        console.log("GAME OVER... Sorry! The word was:");
        for (var i = 0; i < chosenWord.arrOfLetters.length; i++) {
            chosenWord.arrOfLetters[i].guessed = true;
        }
        console.log(chosenWord.wordString());
    }
}

function gameCheckGuess(answers) {
    var char = answers.char.toUpperCase();
    if (guessedLetters.indexOf(char) === -1) {
        guessedLetters.push(char);
        chosenWord.wordGuess(char);
        if (chosenWord.wordString() !== wordInstance) { // check if any letters have been revealed since the last guess
            wordInstance = chosenWord.wordString();
            console.log("Correct guess!");
        } else {
            console.log("That letter was not found. Try again.");
            guessesRemaining--;
            logGuessesRemaining();
        }
    } else {
        console.log("LETTER ALREADY GUESSED. TRY AGAIN.")
    }
    gameEnd();
}

function gameEnd() {
    if (wordInstance.indexOf("_") !== -1) { // if there are still letters left to guess, run gamePrompt again...
        gamePrompt();
    } else {
        console.log(`YOU WON THE GAME! \n\n ${wordInstance}\n`);
        inquirer.prompt([
            {
                type: "confirm",
                name: "restart",
                message: "Would you like to play again?",
                default: "false"
            }
        ]).then(answers => {
            if (answers.restart) { // if user chooses to restart game...
                reset();
                gameStart();
            } else {
                console.log("Thanks for playing!");
            }
        });
    }
}

function reset() { // reset global variables
    chosenWord = null;
    wordInstance = null; 
    guessesRemaining = 9;
    guessedLetters = [];
}

gameStart();