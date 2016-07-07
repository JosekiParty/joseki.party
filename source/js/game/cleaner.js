import bus from '../lib/bus'

var deadStones

export default function () {
  // Translate User Clicks out to app
  bus.on('stone:remove', clickStone)
  bus.on('stone:mark', markStone)
  bus.on('stone:unmark', unmarkStone)

  function clickStone(x, y, state) {
    state.game.deadStones ? deadStones = state.game.deadStones : deadStones = []
    toggleDead([x, y], state)
  }

  function toggleDead (coords, state) {
    var isDead = deadStones.filter(function (stone) {
      if (stone[0] == coords[0] && stone[1] == coords[1]) {
        return true
      } else {
        return false
      }
    }).length > 0

    if (isDead) {
      deadStones = deadStones.filter(function (stone) {
        if (stone[0] == coords[0] && stone[1] == coords[1]) {
          return false
        } else {
          return true
        }
      })
      bus.emit('stone:unmark', coords)
    } else {
      deadStones.push(coords)
      bus.emit('stone:mark', coords)
    }
    state.game.deadStones = deadStones
    bus.emit('game:write', state.game)
  }

  function markStone (coords) {
    let target = document.querySelector(`[data-x="${coords[0]}"][data-y="${coords[1]}"]`)
    target.classList.add('is-dead')
  }
  function unmarkStone (coords) {
    let target = document.querySelector(`[data-x="${coords[0]}"][data-y="${coords[1]}"]`)
    target.classList.remove('is-dead')
  }

}


