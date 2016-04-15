export default {
  // Gets set when one player passes their turn. Reflects in the UI.
  // Two passes end the game
  pass: {
    black: false,
    white: false
  },
  // If a player resigns, this gets marked
  resign: {
    black: false,
    white: false
  },
  black: 'foo',  // unique player id stored on localstored
  white: 'bar',  // unique player id stored on localstored
  size: 13,      // board size, defined on start
  komi: 0.5,     // komi, used for scoring
  turn: 'black', // Which player is next?
  last: [6,5],   // Which stone was most reently played?
  goban: [
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', 'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', '.', '.', '.', 'o', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ],
    [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ]
  ]
}
