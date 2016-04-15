import generateName from 'sillyname'
import Firebase from 'firebase'
import Weiqi from 'weiqi'
import bus from './bus'

function model () {
  // Set up firebase as a game server
  var gameServer = new Firebase('https://joseki-party.firebaseio.com/');

  bus.on('game:new', createGame)
  function createGame (options) {
    var roomName = newName()
    var game = {
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
      goban: Weiqi(options.size)
    }

    gameServer.set(roomName, game)
  }

  function newRoomName () {
    return generateName()
  }
}

export default model