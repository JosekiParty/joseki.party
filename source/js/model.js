import generateName from './generate-name'
import Firebase from 'firebase'
import Weiqi from 'weiqi'
import bus from './bus'

import example from './example'

// Set up firebase as a game server
var gameServer = new Firebase('https://joseki-party.firebaseio.com/');

bus.on('game:new', createGame)

function createGame (options) {
  // Create new game model with all our data for the UI
  // generate random game name
  var roomName = generateName()
  // stash the game under the room name key in the game server
  gameServer.child(roomName).update({
    pass: {
      black: false,
      white: false
    },
    resign: {
      black: false,
      white: false
    },
    size: options.size,
    komi: options.komi,
    turn: 'black',
    last: false,
    history: [],
    goban: [
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
      [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
    ]
  })
  // forward player to their game room as their picked color
  window.location.assign(`/${roomName}/${options.color}`)
}
