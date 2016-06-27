import Firebase from 'firebase'
import bus from './lib/bus'

export default function (options) {
  var gameServer = new Firebase(`https://joseki-party.firebaseio.com/${options.name}`)
  gameServer.on('value', broadcast)
  bus.on('game:write', write)
  bus.on('game:destroy', destroy)
}

function write (gameState) {
  console.log('create new game plz')
  var gameServer = new Firebase('https://joseki-party.firebaseio.com/');
  gameServer.child(gameState.name).update(gameState)
}

function destroy () {
  console.log('delete the game plz')
}

function broadcast (state) {
  bus.emit('game:change', state.val())
}