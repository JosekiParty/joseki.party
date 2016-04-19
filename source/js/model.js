import Weiqi from 'weiqi'
import Firebase from 'firebase'
import hydrate from './lib/hydrate-game'
import bus from './lib/bus'

// options = {
//   roomName = 'foo-bar'
//   color    = 'hue'
// }

export default function model(game, color) {

  bus.on('game:play', play)
  bus.on('game:pass', pass)
  bus.on('game:resign', resign)

  var gameServer = new Firebase(`https://joseki-party.firebaseio.com/${game}`)
  var gameState
  var Game

  gameServer.on('value', getState)

  function getState (state) {
    gameState = state.val()
    Game = Weiqi.createGame(gameState.size)
    bus.emit('game:render', gameState)
  }

  function play (node) {
    let COLOR = color.toUpperCase()
    let x = parseInt(node.getAttribute('data-x'))
    let y = parseInt(node.getAttribute('data-y'))
    console.log(COLOR)
    Game = Game.play(Weiqi[COLOR], [y,x])
    gameState.goban = Game.getBoard().toArray()
    gameState.history[length] = {y: y, x:x}
    gameState.history.length = gameState.history.length + 1
    gameServer.update(gameState)
  }

  function pass (data) {
    console.log(gameState)
  }

  function resign (data) {
    console.log(gameState)
  }
}