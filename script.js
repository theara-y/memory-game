import GameGraphics from "./GameGraphics.js";
import GameState from "./GameState.js";
import DeckFactory from "./DeckFactory.js";

let N_PAIRS = 1;
const graphics = new GameGraphics(handleClick);
let state = GameState.newGame(DeckFactory.newDeck(N_PAIRS), "paused");

function handleClick(event) {
    if(state.getStatus() == "playing") {
      validateClick(event.target.parentElement.parentElement);
    }
    else {
      graphics.clear()
      state = GameState.newGame(DeckFactory.newDeck(N_PAIRS), "playing");
      graphics.drawGame(state);
    }
}

if(state.getStatus() != "playing") {
  graphics.drawUI("Memory Game", "S T A R T", "By Theara Ya");
} else {
  graphics.drawGame(state);
}

const WAIT_TIME = 1000;

function validateClick(card) {
    if(state.addGuess(card)) {
        graphics.flipCards(card);
        
        let guesses = state.getGuesses();
        if(guesses.length == 2) {
            let isMatch = state.checkMatch();
            if(!isMatch) {
                graphics.drawHealth(state);
                setTimeout(() => {
                    if(state.getHealth() == 0) {
                      graphics.clear();
                      graphics.drawUI(`=< Level ${--N_PAIRS} >=`, `Best: ${state.getBest()}`, "Click anywhere to continue.");
                      state.setStatus("paused");
                      return;
                    }
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
                    graphics.drawUI(`=> Level ${++N_PAIRS} <=`, `Best: ${state.setBest(N_PAIRS)}`, "Click anywhere to begin.");
                  }, WAIT_TIME/2)
                }
            }
        }
    }
}