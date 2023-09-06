class GameGraphics {
    /**
     * Element factory to build elements. 
     * @param {String} name Tag name of the element to be created.
     * @param {Map} attrs Attributes to add to the element.
     * @param {Element} children Child elements to append to the element.
     * @returns elt Returns the element.
     */
    createElt(name, attrs, ...children) {
        const elt = document.createElement(name);
        for(let key in attrs) {
            elt.setAttribute(key, attrs[key]);
        }
        for(let child of children) {
            elt.appendChild(child);
        }
        return elt;
    }

    drawCards(cards) {
        for (let card of cards) {
            const cardDiv = createElt("div", {class: "card"},
                createElt("div", {class: "content", 'data-groupId': card}, 
                    createElt("div", {class: `front ${color}`}),
                    createElt("div", {class: "back"})
                )
            );
        
            cardDiv.addEventListener("click", handleCardClick);
        
            gameContainer.appendChild(cardDiv);
        }
    }
  
    toggleHide(elt) {
        elt.classList.toggle("hide")
    }
  
    toggleFlip(elt) {
        elt.classList.toggle("flip")
    }
}