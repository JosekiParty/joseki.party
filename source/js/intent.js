import bus from './lib/bus'
import serialize from 'form-serialize'

// Create Game form submissions
document.querySelector('.js-new-game-form').addEventListener('submit', (e) => {
  e.preventDefault()
  let game = serialize(e.target, {hash: true})
  game.komi = parseInt(game.komi)
  game.size = parseInt(game.size)
  game.name = window.location.pathname.replace('/', '')
  game.name = game.name.replace('/', '')
  bus.emit('game:new', game)
})
