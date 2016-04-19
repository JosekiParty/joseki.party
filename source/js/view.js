import bus from './lib/bus'
import render from './lib/render'
import example from './lib/example'

bus.on('view:set', view)

function hideViews () {
  var views = document.querySelectorAll('.js-view')
  for (let i = 0; i < views.length; i++) {
    let view = views[i]
    view.setAttribute('hidden', 'hidden')
  }
}

function view (options) {
  console.log('get view')
  hideViews()
  if (options.section == 'game') {
    render(example)
  }
  document.querySelector(`[data-view=${options.section}]`).removeAttribute('hidden')
}
