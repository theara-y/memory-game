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
        this.guessedCards = [];
    }

    resetGuesses() {
        let resetCards = this.guessedCards;
        console.log(resetCards);
        this.guessedCards = [];
        return resetCards;
    }

    checkCard(card) {
        if(this.guessedCards.length < 2) {
            if(!card.classList.contains("flip")) {
                this.guessedCards.push(card);
                return true;
            }
        }
        return false;
    }

    checkMatch() {
        if(this.guessedCards.length == 2) {
            let [groupId1, groupId2] = this.guessedCards.map(card => card.getAttribute("data-groupId"));
            if(groupId1 == groupId2) {
                return true;
            }
            return false;
        }
        return true;
    }
}