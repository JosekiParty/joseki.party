import generateName from 'sillyname'
import Firebase from 'firebase'
import Emitter from 'tiny-emitter'

// Set up event bus for tracking intention, callbacks
var bus = new Emitter();
bus.on('black-move', postBlack)
bus.on('white-move', postWhite)
bus.on('update', render)

// Set up firebase as a game server
var gameServer = new Firebase('https://joseki-party.firebaseio.com/');
gameServer.set('hello world')

// Simple button intention interpreters
var blackButton = document.querySelector('.js-black')
blackButton.addEventListener('click', blackMove)

var whiteButton = document.querySelector('.js-white')
whiteButton.addEventListener('click', whiteMove)

function blackMove (e) {
  console.log(e)
  bus.emit('black-move')
}

function whiteMove (e) {
  console.log(e)
  bus.emit('white-move')
}

// Super simple game state model sent to the gameserver
function postBlack () {
  gameServer.set(true)
}
function postWhite () {
  gameServer.set(false)
}

// Is a listerner. When game serverstate changes, emit update event with state
gameServer.on('value', function (serverState) {
  console.log(serverState)
  bus.emit('update', serverState.val())
})

// Draw the game board from the current state
function render (state) {
  if (state) {
    blackButton.setAttribute('disabled', true)
    whiteButton.removeAttribute('disabled')
  } else {
    blackButton.removeAttribute('disabled')
    whiteButton.setAttribute('disabled', true)
  }
}
