import generateName from '../lib/generate-name'
import bus from '../lib/bus'

export default function () {
  document.querySelector('.js-new-game').addEventListener('click', e => {
    e.preventDefault
    bus.emit('game:new')
  })
  bus.on('game:new', newGame)
}

function newGame () {
  let name = generateName()
  console.log(name)
  window.history.pushState({}, name, `/${name}/`)
}
