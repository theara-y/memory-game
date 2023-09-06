import GameGraphics from "./GameGraphics.js";
import GameState from "./GameState.js";

const graphics = new GameGraphics(handleClick);
const state = new GameState();

function handleClick(event) {
    validateClick(event.target.parentElement);
}

graphics.drawCards(state);

const WAIT_TIME = 1000;

function validateClick(card) {
    if(state.addGuess(card)) {
        graphics.flipCards(card);
        
        let guesses = state.getGuesses();
        if(guesses.length == 2) {
            let isMatch = state.checkMatch();
            state.newGuesses();
            if(!isMatch) {
              setTimeout(() => {
                  graphics.flipCards(...guesses);
              }, WAIT_TIME);
            }
        }
    }
}