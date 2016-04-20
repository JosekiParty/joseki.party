import Weiqi from 'weiqi'
import Firebase from 'firebase'
import hydrate from './lib/hydrate-game'
import bus from './lib/bus'

// options = {
//   roomName = 'foo-bar'
//   color    = 'hue'
// }

export default function model(game, color) {

  bus.on('game:joined', playerJoin)
  bus.on('game:play', play)
  bus.on('game:pass', pass)
  bus.on('game:resign', resign)
  bus.on('game:copy-url', copy)

  var gameServer = new Firebase(`https://joseki-party.firebaseio.com/${game}`)
  var gameState
  var Game

  gameServer.on('value', getState)

  function getState (state) {
    gameState = state.val()
    Game = hydrate(gameState)
    bus.emit('game:render', gameState)
  }

  function play (x, y) {
    let COLOR = color.toUpperCase()
    Game = Game.play(Weiqi[COLOR], [y,x])
    gameState.goban = Game.getBoard().toArray()
    gameState.history[gameState.history.length] = {y: y, x:x, color: COLOR}
    gameState.history.length = gameState.history.length + 1
    gameServer.update(gameState)
  }

  function playerJoin (color) {
    console.log(color)
    if (color == 'black') {
      gameServer.child('joined').update({black: true})
    } else if (color == 'white') {
      gameServer.child('joined').update({white: true})
    }
  }

  function pass (data) {
    console.log(gameState)
  }

  function resign (data) {
    console.log(gameState)
  }

  function copy (input) {
    try {
      input.select()
      document.execCommand('copy')
    } catch (e) {
      console.log('copy to clipboard not supported');
    }
  }
}
