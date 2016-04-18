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
  size: 13,      // board size, defined on start
  komi: 0.5,     // komi, used for scoring
  turn: 'black', // Which player is next?
  last: false,   // Keep this seperate for easy fetching?
  history: [],   // Keep track of all the moves to rehydrate Weiqi.js
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
}
