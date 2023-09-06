import GameGraphics from "./GameGraphics.js";

console.log("handleClick", handleClick);
const graphics = new GameGraphics(handleClick);

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

let shuffledColors = shuffle(COLORS);



function handleClick(event) {
  validateClick(event.target.parentElement);
}

// when the DOM loads
// createDivsForColors(shuffledColors);
graphics.drawCards(shuffledColors);


const WAIT_TIME = 1000;
const ANIM_TIME = 100;
let guessed = [];


function validateClick(card) {
  if(guessed.length < 2) {
    if(card.classList.contains("flip")) {
      return;
    }
    guessed.push(card);

    graphics.flipCards(card);

    if(guessed.length == 2) {
      let [cardId1, cardId2] = guessed.map(c => c.getAttribute("data-groupId"));
      if(cardId1 != cardId2) {
        setTimeout(() => {
          graphics.flipCards(...guessed);
          setTimeout(() => {
            guessed = []
          }, ANIM_TIME)
        }, WAIT_TIME)
      } else {
        guessed = [];
      }
    }
  }
}