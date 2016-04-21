import bus from './lib/bus'
import generateName from './lib/generate-name'
import serialize from 'form-serialize'
import matches from 'dom-matches'

// Create Game form submissions
document.querySelector('.js-new-game-form').addEventListener('submit', e => {
  e.preventDefault()
  let game = serialize(e.target, {hash: true})
  game.komi = parseInt(game.komi)
  game.size = parseInt(game.size)
  game.name = window.location.pathname.replace('/', '')
  game.name = game.name.replace('/', '')
  bus.emit('game:new', game)
})

document.querySelector('.js-new-game').addEventListener('click', e => {
  e.preventDefault
  let name = generateName()
  console.log(`/${name}/`)
  history.pushState({}, name, `/${name}/`);
})

document.querySelector('.js-board').addEventListener('click', e => {
  e.preventDefault()
  if (matches(e.target, '.js-node')) {
    let x = parseInt(e.target.getAttribute('data-x'))
    let y = parseInt(e.target.getAttribute('data-y'))
    bus.emit('game:play', x, y)
  }
  if (matches(e.target, '.js-invite-btn')) {
    let input = document.querySelector('.js-invite-input')
    bus.emit('game:copy-url', input)
  }
  if (matches (e.target, '.js-pass-black')) {
    bus.emit('game:pass', 'black')
    console.log('black passed')
  }
  if (matches (e.target, '.js-resign-black')) {
    bus.emit('game:resign', 'black')
    console.log('black resigned')
  }
  if (matches(e.target, '.js-black-cancel-resign')){
    bus.emit('game:resign:cancel', 'black')
    console.log('black canceled resign')
  }
  if (matches (e.target, '.js-confirm-resign-black')) {
    bus.emit('game:resign:confirm', 'black')
    console.log('black confirmed resign')
  }
  if (matches (e.target, '.js-pass-white')) {
    bus.emit('game:pass', 'white')
    console.log('white passed')
  }
  if (matches (e.target, '.js-resign-white')) {
    bus.emit('game:resign', 'white')
    console.log('white resigned')
  }
  if (matches(e.target, '.js-white-cancel-resign')){
    bus.emit('game:resign:cancel', 'white')
    console.log('white canceled resign')
  }
  if (matches (e.target, '.js-confirm-resign-white')) {
    bus.emit('game:resign:confirm', 'white')
    console.log('white confirmed resign')
  }
})