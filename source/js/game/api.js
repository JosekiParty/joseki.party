import Firebase from 'firebase'
import Weiqi from 'weiqi'
import bus from '../lib/bus'

// THIS IS WEIQI API GOODNESS

export function play (x, y) {
  console.log('make a move suckah', x, y)
}

export function pass () {
  console.log('I pass')
}

export function resign () {
  console.log('you win')
}

// THESE ARE INTERNAL HELPER FUNCTIONS

function markPass () {
  console.log('mark a pass plz')
}
function setLastMove () {
  console.log('set the last move plz')
}
function setGoban () {
  console.log('set the goban plz')
}
function setHistory () {
  console.log('set history plz')
}
function playerJoin () {
  console.log('hey a player joined')
}
