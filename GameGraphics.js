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

    drawCards(state) {
        for (let card of state.cards) {
            let groupId = card.groupId;
            let color = card.color;
            const cardDiv = createElt("div", {class: "card"},
                createElt("div", {class: "content", 'data-groupId': groupId}, 
                    createElt("div", {class: `front`}),
                    createElt("div", {class: "back"},
                        createElt("img", {src: "./imgs/test.jpg"})
                    )
                )
            );

            cardDiv.firstElementChild.firstElementChild.style.background = color;
        
            cardDiv.addEventListener("click", this.clickHandler);
        
            this.gameContainer.appendChild(cardDiv);
        }
    }
  
    toggleHide(elt) {
        elt.classList.toggle("hide")
    }
  
    flipCards(...elt) {
        elt.forEach(e => e.classList.toggle("flip"));
    }
}