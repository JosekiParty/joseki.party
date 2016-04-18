import bus from './bus'
import render from './render'
import example from './example'

bus.on('view:set', view)

console.log(bus)

function hideViews () {
  var views = document.querySelectorAll('.js-view')
  for (let i = 0; i < views.length; i++) {
    let view = views[i]
    view.setAttribute('hidden', 'hidden')
  }
}

function view (options) {
  console.log(`please turn on section ${options.section}`)
  hideViews()
  if (options.section == 'game') {
    render(example)
  }
  document.querySelector(`[data-view=${options.section}]`).removeAttribute('hidden')
}
