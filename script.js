"use strict"
//Score elements
const score0Element = document.querySelector("#score--0")
const score1Element = document.querySelector("#score--1")
//Current Score elements
const current0Element = document.querySelector("#current--0")
const current1Element = document.querySelector("#current--1")
//Player elements
const currentPlayer0 = document.querySelector(".player--0")
const currentPlayer1 = document.querySelector(".player--1")
//Button elements
const diceElement = document.querySelector(".dice")
const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")

// Starting conditions
score0Element.textContent = 0
score1Element.textContent = 0
diceElement.classList.add("hidden")

//Variables
let currentScore0 = 0
let currentScore1 = 0
let score0 = 0
let score1 = 0
let playing = true

//Switch User function
function SwitchUser() {
  if (currentPlayer0.classList.contains("player--active")) {
    currentPlayer0.classList.remove("player--active")
    currentPlayer1.classList.add("player--active")
    currentScore0 = 0
    current0Element.textContent = 0
  } else {
    currentPlayer1.classList.remove("player--active")
    currentPlayer0.classList.add("player--active")
    currentScore1 = 0
    current1Element.textContent = 0
  }
}

//ButtonRoll Responce
btnRoll.addEventListener("click", function () {
  //Buttons only react if the Playing=true.
  if (playing) {
    //Generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1

    //Display Dice
    diceElement.classList.remove("hidden")
    diceElement.src = `dice-${dice}.png`

    if (dice !== 1) {
      //Adding dice in current score
      if (currentPlayer0.classList.contains("player--active")) {
        currentScore0 += dice
        current0Element.textContent = currentScore0
      } else {
        currentScore1 += dice
        current1Element.textContent = currentScore1
      }
    } else {
      SwitchUser()
    }
  }
})

// Button Hold responce
btnHold.addEventListener("click", function () {
  if (playing) {
    if (currentPlayer0.classList.contains("player--active")) {
      score0 += currentScore0
      score0Element.textContent = score0
      if (score0 >= 100) {
        currentPlayer0.classList.add("player--winner")
        diceElement.classList.add("hidden")
        playing = false
        //Return zero don't need to switch the user here
        return 0
      }
      SwitchUser()
    } else {
      score1 += currentScore1
      score1Element.textContent = score1
      if (score1 >= 100) {
        currentPlayer1.classList.add("player--winner")
        diceElement.classList.add("hidden")
        playing = false
        //Return zero don't need to switch the user here
        return 0
      }
      SwitchUser()
    }
  }
})

// Resetting the game
btnNew.addEventListener("click", function () {
  currentScore0 = 0
  currentScore1 = 0
  score0 = 0
  score1 = 0
  current0Element.textContent = 0
  current1Element.textContent = 0
  score0Element.textContent = 0
  score1Element.textContent = 0

  currentPlayer0.classList.add("player--active")
  currentPlayer1.classList.remove("player--active")

  currentPlayer0.classList.remove("player--winner")
  currentPlayer1.classList.remove("player--winner")

  diceElement.classList.add("hidden")
  playing = true
})
