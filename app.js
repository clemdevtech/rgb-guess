// ========================================================================
// ======================== SECTION  UI CONTROLLER ========================
const UIController = (function () {
  const DOMstrings = {
    squares: document.querySelectorAll(".color-game__square-container__square"),
    colorDisplay: document.getElementById("colorDisplay"),
    messageDisplay: document.getElementById("message"),
    h1: document.querySelector(".color-game__square-container__title"),
    gameIntro: document.querySelector(".color-game__intro"),
    resetButton: document.querySelector("#reset"),
    modeButtons: document.querySelectorAll(".color-game__stripe__btn-mode"),
  };

  return {
    getDOMstrings: () => {
      return DOMstrings;
    },
  };
})();

// ================================================================================
// ======================== SECTION  GLOBAL APP CONTROLLER ========================
const controller = (function (UICtrl) {
  // ************ NOTE Variables declaration ************
  const DOM = UICtrl.getDOMstrings();
  let numSquares = 6;
  let colors = [];
  let pickedColor;

  // ************ NOTE RBG GAME : function Difficulty buttons ************
  function setupModeButtons() {
    for (let i = 0; i < DOM.modeButtons.length; i++) {
      DOM.modeButtons[i].addEventListener("click", () => {
        DOM.modeButtons[0].classList.toggle("selected");
        DOM.modeButtons[1].classList.toggle("selected");
        DOM.modeButtons[i].textContent === "Easy"
          ? (numSquares = 3)
          : (numSquares = 6);
        reset();
      });
    }
  }

  // ************ NOTE RBG GAME : function Setup squares ************
  function setupSquares() {
    for (let i = 0; i < DOM.squares.length; i++) {
      // add click listeners to squares
      DOM.squares[i].addEventListener("click", function () {
        // grab color of picked squares
        let clickedColor = this.style.backgroundColor;
        // compare color to pickedColor
        if (clickedColor === pickedColor) {
          DOM.messageDisplay.textContent = "Congratulations, you win! ";
          DOM.resetButton.textContent = "Play Again?";
          changeColor(clickedColor);
          DOM.gameIntro.style.backgroundColor = clickedColor;
        } else {
          this.style.backgroundColor = "#1e272e";
          DOM.messageDisplay.textContent = "Too bad ! Try again !";
        }
      });
    }
  }

  // ************ NOTE RBG GAME : function Reset ************
  function reset() {
    // generate all new colors
    colors = generateRandomColors(numSquares);
    // pick a new random color from array
    pickedColor = pickColor();
    // change colorDisplay to match picked color
    DOM.colorDisplay.textContent = pickedColor;
    DOM.resetButton.textContent = "New Game";
    // message display empty
    DOM.messageDisplay.textContent = "";
    //change colors of squares
    for (let i = 0; i < DOM.squares.length; i++) {
      if (colors[i]) {
        DOM.squares[i].style.display = "block";
        DOM.squares[i].style.backgroundColor = colors[i];
      } else {
        DOM.squares[i].style.display = "none";
      }
    }
    DOM.h1.style.backgroundColor = "#steelblue";
  }

  // ************ NOTE RBG GAME : Listener Reset Btn ************
  DOM.resetButton.addEventListener("click", () => {
    reset();
  });

  // ************ NOTE RBG GAME : function to change color ************
  function changeColor(color) {
    // loop through all squares
    for (let i = 0; i < DOM.squares.length; i++) {
      // change each color to match given color
      DOM.squares[i].style.backgroundColor = color;
    }
  }

  // ************ NOTE RBG GAME : function to pick color ************
  function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
  }

  // ************ NOTE RBG GAME : function to generate random colors ************
  function generateRandomColors(num) {
    // make an array
    const arr = [];
    // repeat num times
    for (let i = 0; i < num; i++) {
      // get random color and push into arr
      arr.push(randomColor());
    }
    // return that array
    return arr;
  }

  // ************ NOTE RBG GAME : function to create a random color ************
  function randomColor() {
    // pick a "red" from 0 to 255
    let r = Math.floor(Math.random() * 256);
    // pick a "green" from 0 to 255
    let g = Math.floor(Math.random() * 256);
    // pick a "blue" from 0 to 255
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  // ================================================================================
  // ======================== ANCHOR INIT ========================
  return {
    init: function () {
      console.log("app init");
      setupModeButtons();
      setupSquares();
      reset();
    },
  };
})(UIController);

// lauching the app
controller.init();
