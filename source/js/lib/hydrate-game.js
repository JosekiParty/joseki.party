import Weiqi from 'weiqi'

export default function hydrate (game) {
  var Game = Weiqi.createGame(game.size)
  for (let i = 0; i < game.history.length; i++) {
    var color = game.history[i].color
    if (game.history[i].pass) {
      console.log(`pass ${color}`)
      Game = Game.pass(Weiqi[color])
    } else {
      console.log(`play ${color}`)
      var coords = [game.history[i].y, game.history[i].x]
      Game = Game.play(Weiqi[color], coords)
    }
  }
  window.Game = Game
  return Game
}