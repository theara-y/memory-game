/**
     * Element factory to build elements. 
     * @param {String} name Tag name of the element to be created.
     * @param {Map} attrs Attributes to add to the element.
     * @param {Element} children Child elements to append to the element.
     * @returns elt Returns the element.
     */
function createElt(name, attrs, ...children) {
    const elt = document.createElement(name);
    for(let key in attrs) {
        elt.setAttribute(key, attrs[key]);
    }
    for(let child of children) {
        elt.appendChild(child);
    }
    return elt;
}

export default class GameGraphics {
    constructor(clickHandler) {
        this.clickHandler = clickHandler;

        this.gameContainer = document.querySelector("#game .flex-container");
    }

    clear() {
        this.gameContainer.innerHTML = "";
    }

    drawCards(state) {
        for (let card of state.cards) {
            let groupId = card.groupId;
            let color = card.color;
            const cardDiv = createElt("div", {class: "game card"},
                createElt("div", {class: "game content", 'data-groupId': groupId}, 
                    createElt("div", {class: `game front`}),
                    createElt("div", {class: "game back"},
                        createElt("img", {class: "game", src: "./imgs/test.jpg"})
                    )
                )
            );

            cardDiv.firstElementChild.firstElementChild.style.background = color;
        
            cardDiv.addEventListener("click", this.clickHandler);
        
            this.gameContainer.appendChild(cardDiv);
        }
    }
  
    drawGameOverScreen(text) {
        let h1 = createElt("h1", {class: "ui"});
        h1.textContent = "You win!";
        let pScore = createElt("p", {class: "ui"});
        pScore.textContent = "Score: 32";
        let pRestart = createElt("p", {class: "ui"});
        pRestart.textContent = "Click to restart...";

        let gameOverDiv = createElt("div", {id: "ui", class: "ui"},
            createElt("div", {class: "flex-container ui"},
                createElt("div", {id: "ui-box", class: "ui"},
                    h1, pScore
                ),
                pRestart
            )
        );

        this.gameContainer.appendChild(gameOverDiv);
        gameOverDiv.addEventListener("click", this.clickHandler);
    }
  
    flipCards(...elt) {
        elt.forEach(e => e.classList.toggle("flip"));
    }
}