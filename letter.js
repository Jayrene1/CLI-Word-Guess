var Letter = function(char) {
    this.char = char;
    this.guessed = false;
    this.reveal = function() {
        if (this.char === " ") { // handles whitespace characters when there are multiple words
            return " ";
        } else if (this.guessed) { // returns character when letter is guessed
            return this.char;
        } else if (!this.guessed) { // returns underscore when letter is not guessed
            return '_';
        }
    };
    this.compare = function(guess) {
        if (guess === this.char) {
            this.guessed = true;
        }
    };
}

module.exports = Letter;