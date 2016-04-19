import bus from './lib/bus'

bus.on('game:new', create)

function create (game) {
  console.log(game)
}
