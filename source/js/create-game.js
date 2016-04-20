import Firebase from 'firebase'
import bus from './lib/bus'

bus.on('game:new', create)

function create (game) {
  var isBlack
  var isWhite
  if (game.color == 'black') {
    isBlack = true
    isWhite = false
  } else {
    isBlack = false
    isWhite = true
  }
  var gameServer = new Firebase('https://joseki-party.firebaseio.com/');
  gameServer.child(game.name).update({
      name: game.name,
      joined: {
        black: isBlack,
        white: isWhite
      },
      pass: {
        black: false,
        white: false
      },
      resign: {
        black: false,
        white: false
      },
      size: game.size,
      komi: game.komi,
      turn: 'black',
      last: false,
      history: {
        length: 0
      },
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
    window.location.assign(`/${game.name}/${game.color}`)

}
