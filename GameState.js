const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

/**
 * Shuffles the array in place.
 * @param {Array} array The array to shuffle.
 * @returns {Array} The shuffled array.
 */
function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

export default class GameState {
    constructor() {
        this.cards = shuffle(COLORS);
        this.guesses = [];
        this.foundMatches = 0;
    }

    newGuesses() {
        this.guesses = [];
    }

    addGuess(card) {
        if(this.guesses.length < 2) {
            if(!card.classList.contains("flip")) {
                this.guesses.push(card);
                return true;
            }
        }
        return false;
    }

    getGuesses() {
        return Array.from(this.guesses);
    }

    checkMatch() {
        let [id1, id2] = this.guesses.map(card => card.getAttribute("data-groupId"));
        if(id1 == id2) {
            this.foundMatches += 2;
            return true;
        }
        return id1 == id2;
    }

    checkWinCondition() {
        return this.foundMatches == this.cards.length;
    }
}