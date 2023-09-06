import GameGraphics from "./GameGraphics.js";
import GameState from "./GameState.js";
import DeckFactory from "./DeckFactory.js";

let N_PAIRS = 1;
const graphics = new GameGraphics(handleClick);
let state = GameState.newGame(DeckFactory.newDeck(N_PAIRS));

function handleClick(event) {
    if(event.target.classList.contains("game")) {
      validateClick(event.target.parentElement.parentElement);
    }
    else if(event.target.classList.contains("ui")) {
      graphics.clear()
      state = GameState.newGame(DeckFactory.newDeck(N_PAIRS++));
      graphics.drawCards(state);
    }
}

graphics.drawUI("Flipping Cards", "S T A R T", "By Theara Ya");

const WAIT_TIME = 1000;

function validateClick(card) {
    if(state.addGuess(card)) {
        graphics.flipCards(card);
        
        let guesses = state.getGuesses();
        if(guesses.length == 2) {
            let isMatch = state.checkMatch();
            if(!isMatch) {
                setTimeout(() => {
                    graphics.flipCards(...guesses);
                    setTimeout(() => {
                      state.newGuesses();
                    }, 50)
                }, WAIT_TIME);
            } else {
                state.newGuesses();
                if(state.checkWinCondition()) {
                  console.log("You win the game!")

                  setTimeout(() => {
                    graphics.clear();
                    graphics.drawUI("You win!", "Try Again?", "Click anywhere to restart...");
                  }, WAIT_TIME/2)
                }
            }
        }
    }
}