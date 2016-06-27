import bus from './lib/bus'
import classy from './lib/classy'

// App Level Routing
import route from './routing'

// The data model for handling Firebase
import model from './model'

// Routing Controls View Panels
import view from './view'
bus.on('view:set', model)

// Create a new Game
import newGame from './game/new'
newGame()

// Start a new Game
import start from './game/start'
start()

// The board component itself
import Goban from './game/goban'
Goban()

function log (whatever) {
  console.log(whatever)
}

route()
window.addEventListener('popstate', route)
