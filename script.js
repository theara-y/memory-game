import GameGraphics from "./GameGraphics.js";
import GameState from "./GameState.js";

const graphics = new GameGraphics(handleClick);
const state = new GameState();

function handleClick(event) {
    validateClick(event.target.parentElement);
}

//Drawing the cards
graphics.drawCards(state);


const WAIT_TIME = 1000;
const ANIM_TIME = 100;
let guessed = [];


function validateClick(card) {
    //addCard(card);
    //state.getGuesses()
    
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