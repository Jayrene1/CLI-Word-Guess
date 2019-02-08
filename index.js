var Word = require("./word");
var inquirer = require("inquirer");
var colors = require("colors");

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
    console.log("\n|| GUITARIST WORD GUESS ||\n".underline.green + "\nInstructions: A famous electric guitarist has been chosen.\nGuess their name by entering a letter on our keyboard and pressing enter.".cyan);
    logGuessesRemaining();
    gamePrompt();
}

function logGuessesRemaining() {
    console.log('\nYou have ' + guessesRemaining.toString().bold.yellow + ' guesses remaining.');
}

function gamePrompt() {
    if (guessesRemaining !== 0) {
        console.log(chosenWord.wordString());

        inquirer.prompt([
            {
            type: "input",
            name: "char",
            message: "\n Enter a letter:",
            validate: function validateChar(name) {
                if (name.length > 1) {
                    return "Error, please enter 1 letter at a time";
                } else {
                    var reg = /^[a-zA-Z]+$/;
                    return reg.test(name) || "Error, please enter a valid letter";
                    }
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
        gameRestart();
    }
}

function gameCheckGuess(answers) {
    var char = answers.char.toUpperCase();
    if (guessedLetters.indexOf(char) === -1) {
        guessedLetters.push(char);
        chosenWord.wordGuess(char);
        if (chosenWord.wordString() !== wordInstance) { // check if any letters have been revealed since the last guess
            wordInstance = chosenWord.wordString();
            console.log("Correct guess!".blue);
        } else {
            console.log("Incorrect letter. Try again.".red);
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
        console.log("YOU WON THE GAME! The winning word was:".rainbow + "\n\n" + chosenWord.wordString().rainbow + "\n");
        gameRestart();
    }
}

function gameRestart() {
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

function reset() { // reset global variables
    chosenWord = null;
    wordInstance = null; 
    guessesRemaining = 9;
    guessedLetters = [];
}

gameStart();