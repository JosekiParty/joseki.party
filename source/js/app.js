import bus from './lib/bus'
import render from './lib/render'
import createGame from './create-game'
import model from './model'
import view from './view'
import intent from './intent'
import route from './routing'

bus.on('view:set', handleGame)
bus.on('game:render', render)

var board = document.querySelector('.js-board')

function handleGame (options) {

  if (options.watching) {
    watchGame(options.watching)
    model(options.watching.game)
  } else if (options.playing) {
    playGame(options.playing)
    model(options.playing.game, options.playing.color)
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


route()