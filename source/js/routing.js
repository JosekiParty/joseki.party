import routeMatcher from 'route-matcher'
let match = routeMatcher.routeMatcher

import bus from './bus'
/**
* Parse URL and navigate to correct pane/state
*/
function parseRoute () {
  let url = document.location.pathname + '/'
  url = url.replace('//', '/')

  let home = match('/').parse(url)
  let watching = match('/:game/').parse(url)
  let playing = match('/:game/:color/').parse(url)

  if (home) {
    bus.emit('view:home')
  } else if (watching) {
    bus.emit('view:watching', watching)
  } else if (playing) {
    bus.emit('view:playing', playing)
  } else {
    bus.emit('view:404')
  }
}

export default parseRoute