import Firebase from 'firebase'
import Weiqi from 'weiqi'
import bus from './lib/bus'

// options = {
//   roomName = 'foo-bar'
//   color    = 'hue'
// }

export default function model(options) {
  bus.on('game:play', play)
  bus.on('game:pass', pass)
  bus.on('game:resign', resign)

  var gameServer = new Firebase(`https://joseki-party.firebaseio.com/${options.roomName}`)
  var gameState
  gameServer.on('value', getState)

  function getState (state) {
    gameState = state
    bus.emit('game:render', state)
  }

  function play (data) {
    console.log(gameState)
  }

  function pass (data) {
    console.log(gameState)
  }

  function resign (data) {
    console.log(gameState)
  }
}