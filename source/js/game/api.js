import Weiqi from 'weiqi'
import bus from '../lib/bus'
import hydrate from '../lib/hydrate-game'

// THIS IS WEIQI API GOODNESS
export function play (x, y, state) {
  Game = hydrate(state.game)
  Game = Game.play(Weiqi[state.player], [y,x])
  state.game.turn = state.player
  state.game.last = [y,x]
  state.game.history[state.game.history.length] = {
    y: y, x:x, color: state.player
  }
  state.game.history.length = state.game.history.length + 1
  state.game.goban = Game.getBoard().toArray()
  bus.emit('game:write', state.game)
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

function playerJoin () {
  console.log('hey a player joined')
}
