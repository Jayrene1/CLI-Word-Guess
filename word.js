var Letter = require("./letter");

var Word = function(word) {
    this.arrOfLetters = [];

    this.createLetters = function() { // must run createLetters(word) to initialize Letters constructor
        for (var i = 0; i < word.length; i++) {
            this.arrOfLetters.push(new Letter(word[i]));
        };
    };

    this.wordString = function() {
        let string = "";
        for (var i = 0; i < this.arrOfLetters.length; i++) {
            string += this.arrOfLetters[i].reveal() + " ";
        }
        return string;
    };

    this.wordGuess = function(guess) {
        for (var i = 0; i < this.arrOfLetters.length; i++) {
            this.arrOfLetters[i].compare(guess);
        }
    };
};

module.exports = Word;