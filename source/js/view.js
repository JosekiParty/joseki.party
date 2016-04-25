import bus from './lib/bus'
import render from './lib/render'
import example from './lib/example'

bus.on('view:set', view)
bus.on('game:resign', resign)
bus.on('game:resign:cancel', unresign)
bus.on('game:pass:flag', pass)
bus.on('game:pass:unflag', unpass)
bus.on('game:end', endGame)

function hideViews () {
  var views = document.querySelectorAll('.js-view')
  for (let i = 0; i < views.length; i++) {
    let view = views[i]
    view.setAttribute('hidden', 'hidden')
  }
}

function view (options) {
  hideViews()
  if (options.section == 'game') {
    render(example)
  }
  document.querySelector(`[data-view=${options.section}]`).removeAttribute('hidden')
}

function pass (color) {
  document.querySelector(`.js-${color}-pass-indicator`).removeAttribute('hidden')
}
function unpass (color) {
  document.querySelector(`.js-${color}-pass-indicator`).setAttribute('hidden', 'hidden')
}

function hideActions (color) {
  document.querySelector(`.js-${color}-pass-resign`).setAttribute('hidden', 'hidden')
}

function resign (color) {
  hideActions(color)
  document.querySelector(`.js-${color}-resign-confirm`).removeAttribute('hidden')
}
function unresign (color) {
  document.querySelector(`.js-${color}-pass-resign`).removeAttribute('hidden')
  document.querySelector(`.js-${color}-resign-confirm`).setAttribute('hidden', 'hidden')
}
function endGame (game) {
  window.setInterval(endScreen, 1000);
}
function endScreen () {
  unpass('black')
  hideActions('black')
  unpass('white')
  hideActions('white')
  document.querySelector('.js-tidy-flag').removeAttribute('hidden')
}
