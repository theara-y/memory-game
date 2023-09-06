const gameContainer = document.querySelector("#game .flex-container");

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

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const cardDiv = createElt("div", {class: "card"},
      createElt("div", {class: "content", 'data-groupId': color}, 
        createElt("div", {class: `front ${color}`}),
        createElt("div", {class: "back"})
      )
    );

    cardDiv.addEventListener("click", handleCardClick);

    gameContainer.appendChild(cardDiv);
  }
}

function handleCardClick(event) {
  validateClick(event);
  // event.target.parentElement.classList.toggle("show");

}

// when the DOM loads
createDivsForColors(shuffledColors);


let guessed = [];

function validateClick(event) {
  console.dir(event);
  if(guessed.length < 2) {
    if(event.target.parentElement.classList.contains("show")) {
      return;
    }
    guessed.push(event.target.parentElement);

    event.target.parentElement.classList.toggle("show");

    if(guessed.length == 2) {
      let groupId1 = guessed[0].getAttribute("data-groupId");
      let groupId2 = guessed[1].getAttribute("data-groupId");
      if(groupId1 != groupId2) {
        setTimeout(() => {
          guessed[0].classList.toggle("show");
          guessed[1].classList.toggle("show");
          setTimeout(() => {
            guessed = []
          }, 5000)
        }, 2000)
      } else {
        guessed = [];
      }
    }
  }
}