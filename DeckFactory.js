function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`
}

function createCard(groupId, color) {
    return {groupId: groupId, color: color};
}

export default class DeckFactory {
    constructor() {
        this.nUniqueCards = 1;
    }

    static newDeck(n) {
        let cards = [];
        for(let i = 0; i < n; i++) {
            cards.push(createCard(i, randomColor()));
        }
        cards = cards.concat(cards);
        return cards;
    }
}

// const COLORS = [
//     "red",
//     "blue",
//     "green",
//     "orange",
//     "purple",
//     "red",
//     "blue",
//     "green",
//     "orange",
//     "purple"
// ];