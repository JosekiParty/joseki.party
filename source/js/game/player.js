import bus from '../lib/bus'
import * as classy from '../lib/classy'

export default function () {
  bus.on('game:resign', confirmResignation)
  bus.on('game:resign:cancel', cancelResignation)
  bus.on('player:resigned', playerQuit)
}

function confirmResignation (color, state) {
  console.log(state)
  var modal = document.querySelector('.js-resign-confirm')
  var cancel = modal.querySelector('.js-cancel-resignation')
  var confirm = modal.querySelector('.js-confirm-resignation')
  confirm.setAttribute('data-player', color)
  confirm.setAttribute('data-game', state.game.name)
  cancel.addEventListener('click', broadcastCancel)
  confirm.addEventListener('click', broadcastConfirm)
  classy.add(modal, 'is-active')
}

function broadcastCancel () {
  bus.emit('game:resign:cancel')
}

function broadcastConfirm (e) {
  var color = e.target.getAttribute('data-player')
  var game = e.target.getAttribute('data-game')
  console.log(color)
  bus.emit('game:quit', color, game)
  bus.emit('game:resign:cancel')
}

function cancelResignation () {
  var modal = document.querySelector('.js-resign-confirm')
  var cancel = modal.querySelector('.js-cancel-resignation')
  cancel.removeEventListener('click', broadcastCancel)
  classy.remove(modal, 'is-active')
}

function playerQuit (color) {
  var modal = document.querySelector('.js-player-resigned')
  var header = modal.querySelector('.js-who-quit')
  header.innerHTML = `${color} resigned`
  classy.add(modal, 'is-active')
}
