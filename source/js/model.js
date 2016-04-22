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
  bus.on('game:resign:confirm', resign)
  bus.on('game:copy-url', copy)

  var gameServer = new Firebase(`https://joseki-party.firebaseio.com/${game}`)
  var gameState
  var Game

  gameServer.on('value', getState)

  function getState (state) {
    gameState = state.val()
    gameState.me = color
    Game = hydrate(gameState)
    bus.emit('game:render', gameState)
    console.log(gameState.pass)
    if (gameState.pass.black) {
      bus.emit('game:pass', 'black')
    } else if (gameState.pass.white) {
      bus.emit('game:pass', 'white')
    }
  }

  function play (x, y) {
    let COLOR = color.toUpperCase()
    Game = Game.play(Weiqi[COLOR], [y,x])
    if (color == 'black') {
      gameState.turn = 'white'
    } else {
      gameState.turn = 'black'
    }
    gameState.last = [y,x]
    gameState.goban = Game.getBoard().toArray()
    gameState.history[gameState.history.length] = {y: y, x:x, color: COLOR}
    gameState.history.length = gameState.history.length + 1
    gameServer.update(gameState)
  }

  function playerJoin (color) {
    if (color == 'black') {
      gameServer.child('joined').update({black: true})
    } else if (color == 'white') {
      gameServer.child('joined').update({white: true})
    }
  }

  function pass (color) {
    console.log(`the model sees that ${color} passed`)
    let COLOR = color.toUpperCase()
    Game = Game.pass(Weiqi[COLOR])
    console.log(`set ${color} pass to true`)
    gameState.pass[color] = true
    gameState.history[gameState.history.length] = {pass:true, color: COLOR}
    gameState.history.length = gameState.history.length + 1
    gameState.last = 'pass'
    // if (gameState.pass.black == true && gameState.pass.black == true) {
    //   bus.emit('game:end', Game)
    // }
    gameServer.update(gameState)
  }

  function resign (color) {
    if (color == 'black') {
      Game = Game.pass(Weiqi.BLACK)
      Game = Game.pass(Weiqi.WHITE)
      gameState.history[gameState.history.length] = {pass:true, color: 'BLACK'}
      gameState.history.length = gameState.history.length + 1
      gameState.history[gameState.history.length] = {pass:true, color: 'WHITE'}
      gameState.history.length = gameState.history.length + 1
      gameState.resign.black = true
    } else {
      Game = Game.pass(Weiqi.WHITE)
      Game = Game.pass(Weiqi.BLACK)
      gameState.history[gameState.history.length] = {pass:true, color: 'WHITE'}
      gameState.history.length = gameState.history.length + 1
      gameState.history[gameState.history.length] = {pass:true, color: 'BLACK'}
      gameState.history.length = gameState.history.length + 1
      gameState.resign.white = true
    }
    console.log(`${color} resigned for real`)
    gameState.last = 'resign'
    gameServer.update(gameState)
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
