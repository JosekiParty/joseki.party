import bus from './lib/bus'
import render from './lib/render'
import model from './model'
import view from './view'
import intent from './intent'
import route from './routing'

bus.on('view:set', handleGame)

var board = document.querySelector('.js-board')

function handleGame (options) {
  if (options.watching) {
    watchGame(options.watching)
  } else if (options.playing) {
    playGame(options.playing)
  }
}

function playGame (playing) {
  board.classList.remove(`player-white`)
  board.classList.remove(`player-black`)
  board.classList.add(`player-${playing.color}`)
}

function watchGame (watching) {
  board.classList.add('watching')
}

model()
route()