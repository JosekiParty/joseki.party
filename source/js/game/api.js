import Weiqi from 'weiqi'
import bus from '../lib/bus'
import hydrate from '../lib/hydrate-game'

// THIS IS WEIQI API GOODNESS
export function play (x, y, state) {
  var Game = hydrate(state.game)
  Game = Game.play(Weiqi[state.player], [y, x])
  state.game.turn = getTurn(state.player)
  state.game.last = [y, x]
  state.game.history[state.game.history.length] = {
    y: y, x: x, color: state.player
  }
  state.game.history.length = state.game.history.length + 1
  state.game.goban = Game.getBoard().toArray()
  bus.emit('game:write', state.game)
}

export function pass (color, state) {
  var Game = hydrate(state.game)
  Game = Game.pass(Weiqi[state.player])
  state.game.turn = getTurn(state.player)
  state.game.last = 'pass'
  state.game.history[state.game.history.length] = {
    pass: true, color: state.player
  }
  state.game.history.length = state.game.history.length + 1
  state.game.pass[color] = true
  bus.emit('game:write', state.game)
}

export function resign (color, game) {
  console.log('resign', game, color)
}

export function score (game) {
  let Game = hydrate(game)
  if (game.deadStones) {
    for (let i = 0; i < game.deadStones.length; i++) {
      Game = Game.removeStone([game.deadStones[i][1], game.deadStones[i][0]])
    }
  }
  bus.emit('game:final:score', Game.areaScore(game.komi))
}

function getTurn (player) {
  if (player === 'BLACK') {
    return 'white'
  } else {
    return 'black'
  }
}
