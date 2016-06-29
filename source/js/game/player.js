import bus from '../lib/bus'
import matches from 'dom-matches'

export default function () {
  bus.on('game:resign', confirmResignation)
}

function confirmResignation (color, state) {
  console.log('are you sure you want to resign?')
  // bus.emit('game:quit', color, state)
}
