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
                createElt("div", {class: "game content fly", 'data-groupId': groupId}, 
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

        this.dealCards();
    }

    dealCards() {
        let flyingCards = []
        for(let flyingCard of document.querySelectorAll(".fly")) {
            flyingCards.push(flyingCard);
        }

        let counter = flyingCards.length;

        let id = setInterval(() => {
            let randomIndex = Math.floor(Math.random() * counter);
            flyingCards[randomIndex].classList.remove("fly");
            counter--
            if(counter == 0) {
                clearInterval(id);
            }
            flyingCards = flyingCards.slice(0, randomIndex).concat(flyingCards.slice(randomIndex + 1));
        }, 33);
    }
  
    drawUI(headerText, subText, caption) {
        let h1 = createElt("h1", {class: "ui"});
        h1.textContent = headerText;
        let p1 = createElt("p", {class: "ui"});
        p1.textContent = subText;
        let c1 = createElt("p", {class: "ui"});
        c1.textContent = caption;

        let gameOverDiv = createElt("div", {id: "ui", class: "ui"},
            createElt("div", {class: "flex-container ui"},
                createElt("div", {id: "ui-box", class: "ui"},
                    h1, p1
                ),
                c1
            )
        );

        this.gameContainer.appendChild(gameOverDiv);
        gameOverDiv.addEventListener("click", this.clickHandler);
    }
  
    flipCards(...elt) {
        elt.forEach(e => e.classList.toggle("flip"));
    }
}