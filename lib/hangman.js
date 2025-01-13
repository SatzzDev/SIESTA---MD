class Hangman {
  constructor(word) {
    this.word = word;
    this.guesses = [];
    this.remaining = 6;
  }

  guess(letter) {
    if (this.guesses.includes(letter)) return false;
    this.guesses.push(letter);
    if (!this.word.includes(letter)) this.remaining--;
    return true;
  }

  render() {
    let display = this.word.split('').map(letter => (this.guesses.includes(letter) ? letter : '_')).join(' ');
    let guessed = this.guesses.join(', ');
    return `Word: ${display}\nGuessed: ${guessed}\nRemaining: ${this.remaining}`;
  }

  isGameOver() {
    return this.remaining <= 0 || this.word.split('').every(letter => this.guesses.includes(letter));
  }

  isWin() {
    return this.word.split('').every(letter => this.guesses.includes(letter));
  }
}

module.exports = Hangman;
