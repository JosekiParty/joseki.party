import bus from '../lib/bus'
import matches from 'dom-matches'
import * as api from './api'
import invite from '../templates/invite-opponent'

var state = {}

export default function () {
  // Translate User Clicks out to app
  document.querySelector('.js-board').addEventListener('click', e => {
    e.preventDefault()
    if (matches(e.target, '.js-node')) {
      let x = parseInt(e.target.getAttribute('data-x'))
      let y = parseInt(e.target.getAttribute('data-y'))
      bus.emit('game:play', x, y, state)
    }
  })
  // Translate App Events in to component
  bus.on('view:set', handleBoard)
  bus.on('game:change', render)
  bus.on('game:change', updateGameState)
  bus.on('game:play', api.play)
}

function updateGameState (game) {
  state.game = game
  bus.emit('game:write', state.game)
}

function updateStatePlayer (color) {
  state.player = color.toUpperCase()
}

function handleBoard (options) {
  var board = document.querySelector('.js-board')
  if (options.watching) {
    board.classList.remove(`player-white`)
    board.classList.remove(`player-black`)
    board.classList.add('watching')
  } else if (options.playing) {
    updateStatePlayer(options.playing.color)
    board.classList.remove(`player-white`)
    board.classList.remove(`player-black`)
    board.classList.add(`player-${options.playing.color}`)
  }
}

function render (game) {
  if (!game) return
  var rows = game.goban.map((r, y) => {
    var row = r.map((n, x) => {
      var isLast = game.last[0] === y && game.last[1] === x ? 'node-last' : ''
      var nodeClass = `js-node node ${isLast} `
      if (n === 'o') {
        nodeClass += 'node-white'
      } else if (n === 'x') {
        nodeClass += 'node-black'
      } else {
        nodeClass += 'node-empty'
      }
      return `<a href="" class="${nodeClass}" data-x="${x}" data-y="${y}"></a>`
    })
    return `<div class="board-row">${row.join('')}</div>`
  })

  let full = game.joined && game.joined.black && game.joined.white ? 'board-full' : ''
  let them = game.joined.white ? 'black' : 'white'
  console.log(them)
  document.querySelector('.js-board').innerHTML = `
    <section class="board board-purple
                    ${full}
                    board-turn-${game.turn}
                    board-${game.size}x${game.size}">
      ${rows.join('')}
      ${invite(game, them)}
    </section>
  `
}