import serialize from 'form-serialize'
import bus from '../lib/bus'
import blanks from '../lib/blanks'

export default function () {
  document.querySelector('.js-new-game-form').addEventListener('submit', e => {
    e.preventDefault()
    let game = serialize(e.target, {hash: true})
    game.komi = parseInt(game.komi)
    game.size = parseInt(game.size)
    game.name = window.location.pathname.replace('/', '')
    game.name = game.name.replace('/', '')
    bus.emit('game:start', game)
  })

  bus.on('game:start', create)
}

function create (game) {
  var blankGoban = blanks(game.size)
  var isBlack
  var isWhite

  if (game.color == 'black') {
    isBlack = true
    isWhite = false
  } else {
    isBlack = false
    isWhite = true
  }

  var gameState = {
    joined: {
      black: isBlack,
      white: isWhite
    },
    pass: {
      black: false,
      white: false
    },
    resign: {
      black: false,
      white: false
    },
    size: game.size,
    komi: game.komi,
    turn: 'black',
    last: false,
    history: {
      length: 0
    },
    goban: blankGoban
  }
  bus.emit('game:write', gameState)
  window.location.assign(`/${game.name}/${game.color}`)
}