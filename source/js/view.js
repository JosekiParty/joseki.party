import bus from './lib/bus'
import render from './lib/render'
import example from './lib/example'

bus.on('view:set', view)
bus.on('game:resign', resign)
bus.on('game:resign:cancel', unresign)

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

function resign (color) {
  document.querySelector(`.js-${color}-pass-resign`).setAttribute('hidden', 'hidden')
  document.querySelector(`.js-${color}-resign-confirm`).removeAttribute('hidden')
}
function unresign (color) {
  document.querySelector(`.js-${color}-pass-resign`).removeAttribute('hidden')
  document.querySelector(`.js-${color}-resign-confirm`).setAttribute('hidden', 'hidden')
}
