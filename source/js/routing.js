import routeMatcher from 'route-matcher'
let match = routeMatcher.routeMatcher
import bus from './lib/bus'
/**
* Parse URL and navigate to correct pane/state
*/
export default function route () {
  let url = document.location.pathname + '/'
  url = url.replace('//', '/')

  let home = match('/').parse(url)
  let watching = match('/:game/').parse(url)
  let playing = match('/:game/:color/').parse(url)

  if (home) {
    bus.emit('view:set', {
      section: 'home'
    })
  } else if (watching && watching.game == 'new') {
    console.log('new game plz')
    bus.emit('view:set', {
      section: 'new'
    })
  } else if (watching) {
    console.log('watching game')
    bus.emit('view:set', {
      section: 'game',
      watching: watching
    })
  } else if (playing) {
    console.log('playing game')
    bus.emit('view:set', {
      section: 'game',
      playing: playing
    })
  } else {
    bus.emit('view:set', {
      section: 404
    })
  }
}
