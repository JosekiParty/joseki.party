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

// The player control panel component
import Player from './game/player'
Player()


import Cleaner from './game/cleaner'
Cleaner()

function log (whatever) {
  console.log(whatever)
}

function change (e) {
  e.preventDefault()
  var theme = e.target.getAttribute('data-theme')
  var body = document.querySelector('body')
  body.className = 'theme-' + theme
}

var themeButtons = document.querySelectorAll('.js-switch-theme')
console.log(themeButtons)
themeButtons.forEach(function (button) {
  console.log(button)
  button.addEventListener('click', change)
})


route()
window.addEventListener('popstate', route)
