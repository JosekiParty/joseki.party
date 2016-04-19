import generateName from './lib/generate-name'
import Firebase from 'firebase'
import Weiqi from 'weiqi'
import bus from './lib/bus'
export default function model(roomName) {
  // Set up firebase as a game server
  var gameServer = new Firebase('https://joseki-party.firebaseio.com/');
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

  var gameState
  gameServer.child(`agate-hand`).on('value', updateState)
  function updateState(model) {
    console.log(model)
  }

  bus.on('game:new', createGame)
  bus.on('move:new', playMove)

  var gameState
  gameServer.child(`agate-hand`).on('value', updateState)
  function updateState(model) {
    console.log(model)
  }

  function createGame (options) {
    // Create new game model with all our data for the UI
    // generate random game name
    var roomName = generateName()
    // stash the game under the room name key in the game server
  }

  function playMove (node) {
    let x = node.getAttribute('data-x')
    let y = node.getAttribute('data-y')
    console.log(x, y)
  }

  function isBlackTurn () {
    let board = document.querySelector('.js-board .board-turn-black')
    if (board) {
      return true
    } else {
      return false
    }
  }
  function isWhiteTurn () {
    let board = document.querySelector('.js-board .board-turn-white')
    if (board) {
      return true
    } else {
      return false
    }
  }
}