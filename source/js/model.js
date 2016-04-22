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
  var COLOR = color.toUpperCase()
  var gameState
  var Game

  // set listener
  gameServer.on('value', getGame)
  // unset listener
  // gameServer.off('value', getGame)

  function getGame (state) {
    gameState = state.val()
    gameState.me = color
    console.log(`state change: `, gameState)
    Game = hydrate(gameState)
    bus.emit('game:render', gameState)
    console.log(gameState.pass)
    if (gameState.pass.black && !gameState.pass.white && gameState.turn == 'black') {
      gameState.pass.black = false
      bus.emit('game:pass:unflag', 'black')
    } else if (gameState.pass.black) {
      bus.emit('game:pass:flag', 'black')
    }
    if (gameState.pass.white && !gameState.pass.black && gameState.turn == 'white') {
      gameState.pass.white = false
      bus.emit('game:pass:unflag', 'white')
    } else if (gameState.pass.white) {
      bus.emit('game:pass:flag', 'white')
    }
    if (gameState.pass.white && gameState.pass.black) {
      destroyGame()
      bus.emit('game:end', gameState)
    }
  }

  function updateGame (state) {
    gameServer.update(state)
  }

  function destroyGame () {
    console.log('plz destroy')
    // gameServer.off('value', getGame)
  }

  function play (x, y) {
    Game = Game.play(Weiqi[COLOR], [y,x])
    setLastMove([y,x])
    setGoban()
    setHistory({
      y: y, x:x, color: COLOR
    })
    updateGame(gameState)
  }

  function pass (color) {
    console.log(`pass function sees ${color} pass`)
    Game = Game.pass(Weiqi[COLOR])
    setLastMove('pass')
    setGoban()
    setHistory({
      pass: true, color: COLOR
    })
    markPass(color)
    updateGame(gameState)
  }

  function markPass(color) {
    console.log(`mark a pass for ${color}`)
    gameState.pass[color] = true
  }

  function resign (color) {
    console.log(`${color} resigned because they're a whiny baby`)
  }

  function setLastMove (move) {
    if (color == 'black') {
      gameState.turn = 'white'
    } else {
      gameState.turn = 'black'
    }
    gameState.last = move
  }

  function setGoban () {
    gameState.goban = Game.getBoard().toArray()
  }

  function setHistory (move) {
    gameState.history[gameState.history.length] = move
    gameState.history.length = gameState.history.length + 1
  }

  function playerJoin (color) {
    if (color == 'black') {
      gameServer.child('joined').update({black: true})
    } else if (color == 'white') {
      gameServer.child('joined').update({white: true})
    }
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
