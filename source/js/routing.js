import Firebase from 'firebase'
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
  } else if (watching) {
    var gameServer = new Firebase(`https://joseki-party.firebaseio.com/`)
    gameServer.child(watching.game).once('value', function (state) {
      if (state.val()) {
        bus.emit('view:set', {
          section: 'game',
          watching: watching,
          name: watching.game
        })
      } else {
        bus.emit('view:set', {
          section: 'new',
          name: watching.game
        })
      }
    })
  } else if (playing) {
    bus.emit('view:set', {
      section: 'game',
      playing: playing,
      name: playing.game
    })
  } else {
    bus.emit('view:set', {
      section: 404
    })
  }
}
