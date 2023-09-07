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
    constructor(cards, status) {
        this.status = status;
        this.cards = shuffle(cards);
        this.guesses = [];
        this.foundMatches = 0;
        this.level = this.cards.length/2;
        this.health = this.level;
    }

    getBest() {
        return localStorage.getItem("best") || 0;
    }

    setBest(level) {
        level--;
        console.log("completed level", level);
        let best = localStorage.getItem("best") || 0;
        console.log("best level", best);
        if(level > best) {
            localStorage.setItem("best", level)
            best = level;
        }
        return best;
    }

    static newGame(cards, status) {
        return new GameState(cards, status);
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }

    getHealth() {
        return this.health;
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
        this.health -= 1;
        return false;
    }

    checkWinCondition() {
        if(this.foundMatches == this.cards.length) {
            this.status = "paused";
            return true;
        }
        return false;
    }
}