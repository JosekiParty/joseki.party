import routeMatcher from 'route-matcher'
let match = routeMatcher.routeMatcher

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
    console.log("home")
  } else if (watching) {
    console.log(`you are watching game ${watching.game}`)
  } else if (playing) {
    console.log(`you are playing game ${playing.game} as ${playing.color}`)
  } else {
    console.log(`I don't know where you are, 404 dawg`)
  }
}

export default parseRoute